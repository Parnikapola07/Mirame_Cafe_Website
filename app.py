import os
import json
from flask import Flask, request
from datetime import datetime

# Initialize Flask App (configured to serve React's built static files from 'dist')
app = Flask(__name__, static_folder='dist', static_url_path='/')
app.config['SECRET_KEY'] = 'mirame_cafe_secret_key_2026'

# --- JSON Data Files Storage Path ---
# If running on Render with persistent disk mounted at /data, use that.
# Otherwise, fall back to the current directory for local development.
DATA_DIR = '/data' if os.path.exists('/data') else os.getcwd()
RESERVATIONS_FILE = os.path.join(DATA_DIR, 'reservations.json')
ORDERS_FILE = os.path.join(DATA_DIR, 'orders.json')

def load_data(filepath):
    if not os.path.exists(filepath):
        return []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return []

def save_data(filepath, data):
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
    except Exception as e:
        print(f"Error saving data to {filepath}: {e}")

# --- API Routes ---

@app.route('/api/reservation/availability', methods=['GET'])
def api_reservation_availability():
    date = request.args.get('date')
    if not date:
        return {'status': 'error', 'message': 'Date parameter is required'}, 400
    
    # Predefined slots
    slots = ["12:00 PM", "01:30 PM", "03:00 PM", "06:00 PM", "07:30 PM", "09:00 PM"]
    
    # Initialize all slots with 10 tables available
    availability = {slot: 10 for slot in slots}
    
    # Query reservations for this date
    all_res = load_data(RESERVATIONS_FILE)
    reservations = [res for res in all_res if res.get('date') == date]
    
    for res in reservations:
        res_time = res.get('time')
        if res_time in availability:
            availability[res_time] = max(0, availability[res_time] - 1)
            
    return availability, 200

@app.route('/api/reservation/booked-tables', methods=['GET'])
def api_reservation_booked_tables():
    date = request.args.get('date')
    time = request.args.get('time')
    if not date or not time:
        return {'status': 'error', 'message': 'Date and time parameters are required'}, 400
    
    all_res = load_data(RESERVATIONS_FILE)
    reservations = [res for res in all_res if res.get('date') == date and res.get('time') == time]
    booked = [res.get('table_number') for res in reservations if res.get('table_number') is not None]
    return {'booked_tables': booked}, 200

@app.route('/api/reservation', methods=['POST'])
def api_reservation():
    name = request.form.get('name')
    phone = request.form.get('phone')
    guests = request.form.get('guests')
    date = request.form.get('date')
    time = request.form.get('time')
    special_request = request.form.get('special_request')
    table_number = request.form.get('table_number')
    
    # Check availability
    slots = ["12:00 PM", "01:30 PM", "03:00 PM", "06:00 PM", "07:30 PM", "09:00 PM"]
    if time not in slots:
        return {'status': 'error', 'message': 'Invalid time slot'}, 400
        
    all_res = load_data(RESERVATIONS_FILE)
    existing_count = sum(1 for r in all_res if r.get('date') == date and r.get('time') == time)
    if existing_count >= 10:
        return {'status': 'error', 'message': 'No tables available for this time slot'}, 400
        
    # Process table number
    table_number_int = None
    if table_number:
        try:
            table_number_int = int(table_number)
            # Check if this table is already booked for this slot
            existing_table = next((r for r in all_res if r.get('date') == date and r.get('time') == time and r.get('table_number') == table_number_int), None)
            if existing_table:
                return {'status': 'error', 'message': f'Table {table_number} is already booked for this time slot.'}, 400
        except ValueError:
            return {'status': 'error', 'message': 'Invalid table number format'}, 400
    else:
        # Fallback: Auto-assign first available table number
        booked_tables = [r.get('table_number') for r in all_res if r.get('date') == date and r.get('time') == time and r.get('table_number') is not None]
        available_tables = [t for t in range(1, 11) if t not in booked_tables]
        if not available_tables:
            return {'status': 'error', 'message': 'No tables available for this time slot'}, 400
        table_number_int = available_tables[0]
    
    # Generate new unique ID
    next_id = max([r.get('id', 0) for r in all_res] or [0]) + 1
    
    new_reservation = {
        'id': next_id,
        'name': name,
        'phone': phone,
        'guests': int(guests) if guests else 0,
        'date': date,
        'time': time,
        'special_request': special_request,
        'table_number': table_number_int,
        'created_at': datetime.utcnow().isoformat()
    }
    
    all_res.append(new_reservation)
    save_data(RESERVATIONS_FILE, all_res)
    return {'status': 'success'}, 200

@app.route('/api/order', methods=['POST'])
def api_order():
    item = request.form.get('item')
    quantity = request.form.get('quantity')
    name = request.form.get('name')
    phone = request.form.get('phone')
    address = request.form.get('address')
    
    all_orders = load_data(ORDERS_FILE)
    next_id = max([o.get('id', 0) for o in all_orders] or [0]) + 1
    
    new_order = {
        'id': next_id,
        'item': item,
        'quantity': int(quantity) if quantity else 0,
        'name': name,
        'phone': phone,
        'address': address,
        'created_at': datetime.utcnow().isoformat()
    }
    
    all_orders.append(new_order)
    save_data(ORDERS_FILE, all_orders)
    return {'status': 'success'}, 200

@app.route('/api/contact', methods=['POST'])
def api_contact():
    # Currently just mock contact submission
    return {'status': 'success'}, 200

# --- Catch-All Route for Frontend SPA Routing ---

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    # If the path matches any API endpoint but is not a registered route, return 404
    if path.startswith('api/'):
        return {'status': 'error', 'message': 'API endpoint not found'}, 404
    # Otherwise, serve the React app's index.html file
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)

import os
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize Flask App
app = Flask(__name__)
app.config['SECRET_KEY'] = 'mirame_cafe_secret_key_2026'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cafe.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Database Models ---

class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    special_request = db.Column(db.Text, nullable=True)
    table_number = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, name, phone, guests, date, time, special_request=None, table_number=None):
        self.name = name
        self.phone = phone
        self.guests = guests
        self.date = date
        self.time = time
        self.special_request = special_request
        self.table_number = table_number

    def __repr__(self):
        return f'<Reservation {self.name} on {self.date} at {self.time} (Table {self.table_number})>'


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.Text, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, item, quantity, name, phone, address):
        self.item = item
        self.quantity = quantity
        self.name = name
        self.phone = phone
        self.address = address

    def __repr__(self):
        return f'<Order {self.quantity}x {self.item} for {self.name}>'


# Create the database tables
with app.app_context():
    db.create_all()
    # Migration: Add table_number column to reservation table if it doesn't exist
    try:
        db.session.execute(db.text("ALTER TABLE reservation ADD COLUMN table_number INTEGER"))
        db.session.commit()
    except Exception:
        db.session.rollback()


# --- Routes ---

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
    reservations = Reservation.query.filter_by(date=date).all()
    for res in reservations:
        if res.time in availability:
            availability[res.time] = max(0, availability[res.time] - 1)
            
    return availability, 200

@app.route('/api/reservation/booked-tables', methods=['GET'])
def api_reservation_booked_tables():
    date = request.args.get('date')
    time = request.args.get('time')
    if not date or not time:
        return {'status': 'error', 'message': 'Date and time parameters are required'}, 400
    
    reservations = Reservation.query.filter_by(date=date, time=time).all()
    booked = [res.table_number for res in reservations if res.table_number is not None]
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
        
    existing_count = Reservation.query.filter_by(date=date, time=time).count()
    if existing_count >= 10:
        return {'status': 'error', 'message': 'No tables available for this time slot'}, 400
        
    # Process table number
    table_number_int = None
    if table_number:
        try:
            table_number_int = int(table_number)
            # Check if this table is already booked for this slot
            existing_table = Reservation.query.filter_by(date=date, time=time, table_number=table_number_int).first()
            if existing_table:
                return {'status': 'error', 'message': f'Table {table_number} is already booked for this time slot.'}, 400
        except ValueError:
            return {'status': 'error', 'message': 'Invalid table number format'}, 400
    else:
        # Fallback: Auto-assign first available table number
        booked_tables = [r.table_number for r in Reservation.query.filter_by(date=date, time=time).all() if r.table_number is not None]
        available_tables = [t for t in range(1, 11) if t not in booked_tables]
        if not available_tables:
            return {'status': 'error', 'message': 'No tables available for this time slot'}, 400
        table_number_int = available_tables[0]
    
    new_reservation = Reservation(
        name=name, phone=phone, guests=int(guests), 
        date=date, time=time, special_request=special_request,
        table_number=table_number_int
    )
    db.session.add(new_reservation)
    db.session.commit()
    return {'status': 'success'}, 200

@app.route('/api/order', methods=['POST'])
def api_order():
    item = request.form.get('item')
    quantity = request.form.get('quantity')
    name = request.form.get('name')
    phone = request.form.get('phone')
    address = request.form.get('address')
    
    new_order = Order(
        item=item, quantity=quantity, name=name, 
        phone=phone, address=address
    )
    db.session.add(new_order)
    db.session.commit()
    return {'status': 'success'}, 200

@app.route('/api/contact', methods=['POST'])
def api_contact():
    # Currently just mock contact submission
    return {'status': 'success'}, 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

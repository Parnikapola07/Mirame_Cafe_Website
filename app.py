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
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Reservation {self.name} on {self.date} at {self.time}>'


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    address = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Order {self.quantity}x {self.item} for {self.name}>'


# Create the database tables
with app.app_context():
    db.create_all()


# --- Routes ---

@app.route('/api/reservation', methods=['POST'])
def api_reservation():
    name = request.form.get('name')
    phone = request.form.get('phone')
    guests = request.form.get('guests')
    date = request.form.get('date')
    time = request.form.get('time')
    special_request = request.form.get('special_request')
    
    new_reservation = Reservation(
        name=name, phone=phone, guests=guests, 
        date=date, time=time, special_request=special_request
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

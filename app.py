import os
from flask import Flask, render_template, request, redirect, url_for, flash
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

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/reservation', methods=['GET', 'POST'])
def reservation():
    if request.method == 'POST':
        name = request.form.get('name')
        phone = request.form.get('phone')
        guests = request.form.get('guests')
        date = request.form.get('date')
        time = request.form.get('time')
        special_request = request.form.get('special_request')
        
        # Save to database
        new_reservation = Reservation(
            name=name, phone=phone, guests=guests, 
            date=date, time=time, special_request=special_request
        )
        db.session.add(new_reservation)
        db.session.commit()
        
        flash('Your table has been successfully reserved! We look forward to seeing you.', 'success')
        return redirect(url_for('reservation'))
        
    return render_template('reservation.html')

@app.route('/order', methods=['GET', 'POST'])
def order():
    if request.method == 'POST':
        item = request.form.get('item')
        quantity = request.form.get('quantity')
        name = request.form.get('name')
        phone = request.form.get('phone')
        address = request.form.get('address')
        
        # Save to database
        new_order = Order(
            item=item, quantity=quantity, name=name, 
            phone=phone, address=address
        )
        db.session.add(new_order)
        db.session.commit()
        
        flash('Your order has been placed successfully!', 'success')
        return redirect(url_for('order'))
        
    return render_template('order.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Currently just mock contact submission
        flash('Thank you for contacting us! We will get back to you shortly.', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
import os
from functools import wraps
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app) # Allow cross-origin requests from Next.js (localhost:3000)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bookings.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'lumiere-frontend', 'public', 'images')

db = SQLAlchemy(app)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120))
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20))
    guests = db.Column(db.Integer)
    location = db.Column(db.String(200))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'service': self.service,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'date': self.date,
            'time': self.time,
            'guests': self.guests,
            'location': self.location,
            'notes': self.notes,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

class MarketingMaterial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

class GalleryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    src = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'src': self.src,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

with app.app_context():
    db.create_all()

@app.route('/api/health')
def health_check():
    return jsonify({'status': 'online', 'service': 'Food & Beverage Technologies API'})

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization')
        if not auth or auth != "Bearer fbt_secure_token_2026":
            return jsonify({'message': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if data and data.get('username', '').lower() == 'admin' and data.get('password') == 'fbt2026':
        return jsonify({'token': 'fbt_secure_token_2026', 'status': 'success'}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/booking', methods=['POST'])
def create_booking():
    data = request.json
    try:
        new_booking = Booking(
            service=data.get('service'),
            name=data.get('name'),
            email=data.get('email'),
            phone=data.get('phone', 'Not provided'),
            date=data.get('date'),
            time=data.get('time'),
            guests=data.get('guests', 0),
            location=data.get('location'),
            notes=data.get('notes')
        )
        db.session.add(new_booking)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Booking created successfully', 'id': new_booking.id}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/admin/bookings')
@admin_required
def view_bookings():
    bookings = Booking.query.order_by(Booking.created_at.desc()).limit(200).all()
    return jsonify([b.to_dict() for b in bookings])

@app.route('/admin/marketing', methods=['GET', 'POST'])
@admin_required
def handle_marketing():
    if request.method == 'POST':
        data = request.json
        new_material = MarketingMaterial(
            title=data.get('title'),
            description=data.get('description'),
            image_url=data.get('image_url')
        )
        db.session.add(new_material)
        db.session.commit()
        return jsonify({'status': 'success', 'material': new_material.to_dict()}), 201
    materials = MarketingMaterial.query.order_by(MarketingMaterial.created_at.desc()).all()
    return jsonify([m.to_dict() for m in materials])

@app.route('/api/booked-dates')
def get_booked_dates():
    bookings = Booking.query.all()
    result = {}
    for b in bookings:
        result[b.date] = {
            'service': b.service,
            'time': b.time or 'Full Day',
            'status': 'Confirmed'
        }
    return jsonify(result)

@app.route('/api/gallery', methods=['GET'])
def get_gallery():
    items = GalleryItem.query.order_by(GalleryItem.created_at.desc()).all()
    return jsonify([i.to_dict() for i in items])

@app.route('/admin/gallery', methods=['POST'])
@admin_required
def upload_gallery_image():
    if 'image' not in request.files:
        return jsonify({'status': 'error', 'message': 'No image part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Save to DB
        title = request.form.get('title', 'Untitled')
        category = request.form.get('category', 'Uncategorized')
        src = f'/images/{filename}'
        
        new_item = GalleryItem(title=title, category=category, src=src)
        db.session.add(new_item)
        db.session.commit()
        
        return jsonify({'status': 'success', 'item': new_item.to_dict()}), 201

@app.route('/admin/gallery/<int:item_id>', methods=['DELETE'])
@admin_required
def delete_gallery_image(item_id):
    item = GalleryItem.query.get(item_id)
    if not item:
        return jsonify({'status': 'error', 'message': 'Item not found'}), 404
    
    try:
        if item.src.startswith('/images/'):
            filename = item.src.split('/images/')[-1]
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            if os.path.exists(file_path):
                os.remove(file_path)
    except Exception as e:
        print(f"Error deleting file: {e}")
        
    db.session.delete(item)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Item deleted'})

if __name__ == '__main__':
    app.run(debug=True, port=9000)

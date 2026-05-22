from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from functools import wraps
from datetime import datetime
from sqlalchemy import text
import os
import uuid

STATIC_FOLDER = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'static_frontend')

app = Flask(__name__, static_folder=STATIC_FOLDER, static_url_path='')
CORS(app)

# =========================
# CONFIGURATION
# =========================

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

database_url = os.environ.get(
    'DATABASE_URL',
    'sqlite:///' + os.path.join(BASE_DIR, 'bookings.db')
)

if database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['UPLOAD_FOLDER'] = os.path.join(BASE_DIR, 'uploads')

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# =========================
# DATABASE
# =========================

db = SQLAlchemy(app)

# =========================
# ENVIRONMENT VARIABLES
# =========================

ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "fbt2026")
API_TOKEN = os.environ.get("API_TOKEN", "fbt_secure_token_2026")
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}


def allowed_image_file(filename):
    return (
        '.' in filename and
        filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS
    )


def required_string(data, field):
    value = data.get(field) if data else None
    if value is None:
        return None
    value = str(value).strip()
    return value or None

# =========================
# MODELS
# =========================

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
    package = db.Column(db.String(120))
    budget = db.Column(db.String(80))
    status = db.Column(db.String(30), default='New', nullable=False)

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
            'package': self.package,
            'budget': self.budget,
            'status': self.status,
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

# =========================
# CREATE DATABASE & SEED
# =========================

DEFAULT_GALLERY = [
    {'title': 'Royal Wedding', 'category': 'Bridal Artistry', 'src': '/images/bridal_makeup.png'},
    {'title': 'Gala Dinner', 'category': 'Luxury Catering', 'src': '/images/catering.png'},
    {'title': 'Corporate Bento', 'category': 'Corporate Catering', 'src': '/images/corporate_event.png'},
    {'title': 'Garden Engagement', 'category': 'Intimate Gatherings', 'src': '/images/engagement.png'},
    {'title': 'Grand Reception', 'category': 'Event Design', 'src': '/images/gallery1.png'},
    {'title': 'Culinary Excellence', 'category': 'Fine Dining', 'src': '/images/gallery2.png'},
    {'title': 'Artisan Canapés', 'category': 'Luxury Catering', 'src': '/images/hero1.png'},
    {'title': 'Elegant Setup', 'category': 'Event Design', 'src': '/images/hero2.png'},
]

with app.app_context():
    db.create_all()
    if database_url.startswith('sqlite'):
        existing_columns = {
            row[1] for row in db.session.execute(text("PRAGMA table_info(booking)")).fetchall()
        }
        booking_migrations = {
            'package': "ALTER TABLE booking ADD COLUMN package VARCHAR(120)",
            'budget': "ALTER TABLE booking ADD COLUMN budget VARCHAR(80)",
            'status': "ALTER TABLE booking ADD COLUMN status VARCHAR(30) DEFAULT 'New' NOT NULL",
        }
        for column, statement in booking_migrations.items():
            if column not in existing_columns:
                db.session.execute(text(statement))
        db.session.commit()
    if GalleryItem.query.count() == 0:
        for item in DEFAULT_GALLERY:
            title = item['title'].encode('latin1', errors='ignore').decode('utf-8', errors='ignore')
            db.session.add(GalleryItem(title=title, category=item['category'], src=item['src']))
        db.session.commit()
        print("Gallery seeded with default items")

# =========================
# AUTH DECORATOR
# =========================

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        auth = request.headers.get('Authorization')

        if not auth or auth != f"Bearer {API_TOKEN}":
            return jsonify({
                'status': 'error',
                'message': 'Unauthorized'
            }), 401

        return f(*args, **kwargs)

    return decorated

# =========================
# SERVE FRONTEND
# =========================

@app.route('/')
def serve_index():
    return send_from_directory(STATIC_FOLDER, 'index.html')

@app.route('/about')
def serve_about():
    return send_from_directory(STATIC_FOLDER, 'about.html')

@app.route('/gallery')
def serve_gallery():
    return send_from_directory(STATIC_FOLDER, 'gallery.html')

@app.route('/cateringmenu')
def serve_catering_menu():
    return send_from_directory(STATIC_FOLDER, 'cateringmenu.html')

@app.route('/admin')
def serve_admin():
    return send_from_directory(STATIC_FOLDER, 'admin.html')

@app.route('/uploads/<path:filename>')
def serve_uploads(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# =========================
# HEALTH CHECK
# =========================

@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'online',
        'service': 'Nam-Nams Catering & Event API'
    })

# =========================
# LOGIN
# =========================

@app.route('/api/login', methods=['POST'])
def login():

    data = request.get_json(silent=True) or {}

    if (
        data and
        data.get('username', '').lower() == ADMIN_USERNAME.lower() and
        data.get('password') == ADMIN_PASSWORD
    ):

        return jsonify({
            'token': API_TOKEN,
            'status': 'success'
        }), 200

    return jsonify({
        'status': 'error',
        'message': 'Invalid credentials'
    }), 401

# =========================
# CREATE BOOKING
# =========================

@app.route('/api/booking', methods=['POST'])
def create_booking():

    data = request.get_json(silent=True) or {}

    try:
        service = required_string(data, 'service')
        name = required_string(data, 'name')
        date = required_string(data, 'date')

        if not service or not name or not date:
            return jsonify({
                'status': 'error',
                'message': 'service, name, and date are required'
            }), 400

        try:
            guests = int(data.get('guests') or 0)
        except (TypeError, ValueError):
            guests = 0

        new_booking = Booking(
            service=service,
            name=name,
            email=required_string(data, 'email'),
            phone=required_string(data, 'phone') or 'Not provided',
            date=date,
            time=required_string(data, 'time'),
            guests=guests,
            location=required_string(data, 'location'),
            notes=required_string(data, 'notes'),
            package=required_string(data, 'package') or required_string(data, 'bentoType') or required_string(data, 'cuisineType'),
            budget=required_string(data, 'budget'),
            status='New'
        )

        db.session.add(new_booking)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'message': 'Booking created successfully',
            'id': new_booking.id
        }), 201

    except Exception as e:

        db.session.rollback()

        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

# =========================
# VIEW BOOKINGS
# =========================

@app.route('/admin/bookings')
@admin_required
def view_bookings():

    bookings = Booking.query.order_by(
        Booking.created_at.desc()
    ).limit(200).all()

    return jsonify([b.to_dict() for b in bookings])


@app.route('/admin/bookings/<int:booking_id>/status', methods=['PATCH'])
@admin_required
def update_booking_status(booking_id):
    data = request.get_json(silent=True) or {}
    status = required_string(data, 'status')
    allowed_statuses = {'New', 'Contacted', 'Quoted', 'Confirmed', 'Cancelled'}

    if status not in allowed_statuses:
        return jsonify({
            'status': 'error',
            'message': 'Invalid booking status'
        }), 400

    booking = db.session.get(Booking, booking_id)
    if not booking:
        return jsonify({
            'status': 'error',
            'message': 'Booking not found'
        }), 404

    booking.status = status
    db.session.commit()

    return jsonify({
        'status': 'success',
        'booking': booking.to_dict()
    })

# =========================
# MARKETING MATERIALS
# =========================

@app.route('/admin/marketing', methods=['GET', 'POST'])
@admin_required
def handle_marketing():

    if request.method == 'POST':

        data = request.get_json(silent=True) or {}
        title = required_string(data, 'title')

        if not title:
            return jsonify({
                'status': 'error',
                'message': 'title is required'
            }), 400

        new_material = MarketingMaterial(
            title=title,
            description=required_string(data, 'description'),
            image_url=required_string(data, 'image_url')
        )

        db.session.add(new_material)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'material': new_material.to_dict()
        }), 201

    materials = MarketingMaterial.query.order_by(
        MarketingMaterial.created_at.desc()
    ).all()

    return jsonify([m.to_dict() for m in materials])

# =========================
# BOOKED DATES
# =========================

@app.route('/api/booked-dates')
def get_booked_dates():

    bookings = Booking.query.order_by(Booking.created_at.asc()).all()

    result = {}

    for b in bookings:

        if b.date not in result:
            result[b.date] = []

        result[b.date].append({
            'service': b.service,
            'time': b.time or 'Full Day',
            'status': b.status or 'New'
        })

    return jsonify(result)

# =========================
# GET GALLERY
# =========================

@app.route('/api/gallery', methods=['GET'])
def get_gallery():

    items = GalleryItem.query.order_by(
        GalleryItem.created_at.desc()
    ).all()

    return jsonify([i.to_dict() for i in items])

# =========================
# UPLOAD GALLERY IMAGE
# =========================

@app.route('/admin/gallery', methods=['POST'])
@admin_required
def upload_gallery_image():

    if 'image' not in request.files:

        return jsonify({
            'status': 'error',
            'message': 'No image part'
        }), 400

    file = request.files['image']

    if file.filename == '':

        return jsonify({
            'status': 'error',
            'message': 'No selected file'
        }), 400

    if not allowed_image_file(file.filename):
        return jsonify({
            'status': 'error',
            'message': 'Unsupported image type'
        }), 400

    try:

        filename = secure_filename(file.filename)
        name, ext = os.path.splitext(filename)
        filename = f"{name[:80]}-{uuid.uuid4().hex[:12]}{ext.lower()}"

        file_path = os.path.join(
            app.config['UPLOAD_FOLDER'],
            filename
        )

        file.save(file_path)

        title = request.form.get('title', 'Untitled').strip() or 'Untitled'
        category = request.form.get('category', 'Uncategorized').strip() or 'Uncategorized'

        src = f'/uploads/{filename}'

        new_item = GalleryItem(
            title=title,
            category=category,
            src=src
        )

        db.session.add(new_item)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'item': new_item.to_dict()
        }), 201

    except Exception as e:

        db.session.rollback()

        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

# =========================
# DELETE GALLERY IMAGE
# =========================

@app.route('/admin/gallery/<int:item_id>', methods=['DELETE'])
@admin_required
def delete_gallery_image(item_id):

    item = db.session.get(GalleryItem, item_id)

    if not item:

        return jsonify({
            'status': 'error',
            'message': 'Item not found'
        }), 404

    try:

        if item.src.startswith('/uploads/'):

            filename = item.src.split('/uploads/')[-1]

            file_path = os.path.abspath(os.path.join(
                app.config['UPLOAD_FOLDER'],
                filename
            ))

            upload_root = os.path.abspath(app.config['UPLOAD_FOLDER'])
            if file_path.startswith(upload_root + os.sep) and os.path.exists(file_path):
                os.remove(file_path)

        db.session.delete(item)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'message': 'Item deleted'
        })

    except Exception as e:

        db.session.rollback()

        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 400

# =========================
# START APP
# =========================

@app.after_request
def add_header(response):
    if response.mimetype == 'text/html':
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '-1'
    return response

if __name__ == '__main__':

    port = int(os.environ.get("PORT", 9000))

    app.run(
        host='0.0.0.0',
        port=port
    )

from flask import Blueprint, request, jsonify
from app.models import Client
from app import db
from datetime import datetime

bp = Blueprint('clients', __name__)

@bp.route('/', methods=['POST'])
def create_client():
    data = request.get_json()
    
    # Validate pricing analyst name
    if not data.get('analyst_name', '').lower().startswith('pricing'):
        return jsonify({'error': 'Analyst name must start with "pricing"'}), 400
    
    client = Client(
        analyst_name=data['analyst_name'],
        name=data['name'],
        client_type=data['client_type'],
        country=data.get('country'),
        city=data.get('city'),
        currency=data.get('currency'),
        industry_sector=data.get('industry_sector'),
        company_size=data.get('company_size'),
        annual_revenue=data.get('annual_revenue'),
        contact_name=data.get('contact_name'),
        email=data['email'],
        phone=data.get('phone'),
        has_bi_team=data.get('has_bi_team', False),
        wants_bi_tool=data.get('wants_bi_tool', False),
        will_provide_bi_projects=data.get('will_provide_bi_projects', False)
    )
    
    db.session.add(client)
    db.session.commit()
    
    return jsonify(client.to_dict()), 201

@bp.route('/<int:id>', methods=['GET'])
def get_client(id):
    client = Client.query.get_or_404(id)
    return jsonify(client.to_dict())

@bp.route('/<int:id>', methods=['PUT'])
def update_client(id):
    client = Client.query.get_or_404(id)
    data = request.get_json()
    
    for field in ['name', 'client_type', 'country', 'city', 'currency',
                 'industry_sector', 'company_size', 'annual_revenue',
                 'contact_name', 'email', 'phone', 'has_bi_team',
                 'wants_bi_tool', 'will_provide_bi_projects']:
        if field in data:
            setattr(client, field, data[field])
    
    db.session.commit()
    return jsonify(client.to_dict())

# Add to_dict method to Client model
def client_to_dict(self):
    return {
        'id': self.id,
        'analyst_name': self.analyst_name,
        'name': self.name,
        'client_type': self.client_type,
        'country': self.country,
        'city': self.city,
        'currency': self.currency,
        'industry_sector': self.industry_sector,
        'company_size': self.company_size,
        'annual_revenue': self.annual_revenue,
        'contact_name': self.contact_name,
        'email': self.email,
        'phone': self.phone,
        'has_bi_team': self.has_bi_team,
        'wants_bi_tool': self.wants_bi_tool,
        'will_provide_bi_projects': self.will_provide_bi_projects,
        'created_at': self.created_at.isoformat() if self.created_at else None
    }

Client.to_dict = client_to_dict
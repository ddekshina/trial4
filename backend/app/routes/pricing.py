from flask import Blueprint, request, jsonify
from app.models import Project, Quote
from app.utils.pricing_logic import generate_quote
from app import db
from datetime import datetime

bp = Blueprint('pricing', __name__)

@bp.route('/generate/<int:project_id>', methods=['POST'])
def generate_project_quote(project_id):
    project = Project.query.get_or_404(project_id)
    data = request.get_json()
    
    # Merge project data with additional pricing details
    quote_data = {
        'num_dashboards': data.get('num_dashboards', 1),
        'num_widgets': data.get('num_widgets', 0),
        'file_counts': data.get('file_counts', {}),
        'database_sources': data.get('database_sources', []),
        'integrations': data.get('integrations', {}),
        'features': data.get('features', {}),
        'branding': data.get('branding', {}),
        'support_plan': project.support_plan or 'Basic',
        'support_hours': data.get('support_hours', 0),
        'hosting_details': data.get('hosting_details', {}),
        'currency': project.client.currency if project.client else 'USD'
    }
    
    # Calculate quote
    quote_result = generate_quote(quote_data)
    
    # Create or update quote
    if project.quote:
        quote = project.quote
        for key, value in quote_result.items():
            setattr(quote, key, value)
        quote.updated_at = datetime.utcnow()
    else:
        quote = Quote(
            project_id=project.id,
            **quote_result
        )
        db.session.add(quote)
    
    db.session.commit()
    
    return jsonify(quote.to_dict()), 201

@bp.route('/quote/<int:quote_id>', methods=['GET'])
def get_quote(quote_id):
    quote = Quote.query.get_or_404(quote_id)
    return jsonify(quote.to_dict())

# Add to_dict method to Quote model
def quote_to_dict(self):
    return {
        'id': self.id,
        'project_id': self.project_id,
        'base_price': self.base_price,
        'widgets_price': self.widgets_price,
        'data_sources_price': self.data_sources_price,
        'integrations_price': self.integrations_price,
        'features_price': self.features_price,
        'branding_price': self.branding_price,
        'support_price': self.support_price,
        'hosting_price': self.hosting_price,
        'total_price': self.total_price,
        'currency': self.currency,
        'created_at': self.created_at.isoformat() if self.created_at else None,
        'updated_at': self.updated_at.isoformat() if self.updated_at else None
    }

Quote.to_dict = quote_to_dict
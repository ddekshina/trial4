from datetime import datetime
from app import db

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    analyst_name = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    client_type = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(100))
    city = db.Column(db.String(100))
    currency = db.Column(db.String(10))
    industry_sector = db.Column(db.String(100))
    company_size = db.Column(db.Integer)
    annual_revenue = db.Column(db.Float)
    contact_name = db.Column(db.String(120))
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(50))
    has_bi_team = db.Column(db.Boolean)
    wants_bi_tool = db.Column(db.Boolean)
    will_provide_bi_projects = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    projects = db.relationship('Project', backref='client', lazy=True)

    def to_dict(self):
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

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    business_objective = db.Column(db.Text)
    expected_deliverables = db.Column(db.JSON)
    subscription_plan = db.Column(db.String(100))
    target_audience = db.Column(db.JSON)
    data_sources = db.Column(db.JSON)
    data_volume = db.Column(db.String(50))
    api_details = db.Column(db.JSON)
    google_spreadsheet = db.Column(db.String(255))
    required_integrations = db.Column(db.JSON)
    interactivity = db.Column(db.JSON)
    user_access = db.Column(db.JSON)
    customization = db.Column(db.JSON)
    engagement_type = db.Column(db.String(50))
    support_plan = db.Column(db.String(50))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    delivery_model = db.Column(db.JSON)
    budget_range = db.Column(db.String(100))
    competitor_comparison = db.Column(db.Text)
    roi_expectations = db.Column(db.Text)
    tiered_pricing = db.Column(db.JSON)
    analyst_notes = db.Column(db.Text)
    suggested_pricing_model = db.Column(db.Text)
    risk_factors = db.Column(db.Text)
    next_steps = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    quote = db.relationship('Quote', backref='project', uselist=False)
    kanban_ticket = db.relationship('KanbanTicket', backref='project', uselist=False)
    demo_analysis = db.relationship('DemoBusinessAnalysis', backref='project', uselist=False)
    documents = db.relationship('Document', backref='project', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'client_id': self.client_id,
            'title': self.title,
            'description': self.description,
            'business_objective': self.business_objective,
            'expected_deliverables': self.expected_deliverables,
            'subscription_plan': self.subscription_plan,
            'target_audience': self.target_audience,
            'data_sources': self.data_sources,
            'data_volume': self.data_volume,
            'api_details': self.api_details,
            'google_spreadsheet': self.google_spreadsheet,
            'required_integrations': self.required_integrations,
            'interactivity': self.interactivity,
            'user_access': self.user_access,
            'customization': self.customization,
            'engagement_type': self.engagement_type,
            'support_plan': self.support_plan,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'delivery_model': self.delivery_model,
            'budget_range': self.budget_range,
            'competitor_comparison': self.competitor_comparison,
            'roi_expectations': self.roi_expectations,
            'tiered_pricing': self.tiered_pricing,
            'analyst_notes': self.analyst_notes,
            'suggested_pricing_model': self.suggested_pricing_model,
            'risk_factors': self.risk_factors,
            'next_steps': self.next_steps,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    base_price = db.Column(db.Float)
    widgets_price = db.Column(db.Float)
    data_sources_price = db.Column(db.Float)
    integrations_price = db.Column(db.Float)
    features_price = db.Column(db.Float)
    branding_price = db.Column(db.Float)
    support_price = db.Column(db.Float)
    hosting_price = db.Column(db.Float)
    total_price = db.Column(db.Float)
    currency = db.Column(db.String(10))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
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

class KanbanTicket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    status = db.Column(db.String(50), default='Pricing Submissions')
    tags = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        # Avoid circular reference by not including full project data
        return {
            'id': self.id,
            'project_id': self.project_id,
            'status': self.status,
            'tags': self.tags,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'project_title': self.project.title if self.project else None
        }

class DemoBusinessAnalysis(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    analysis_type = db.Column(db.String(50))
    company_website = db.Column(db.String(255))
    use_case_description = db.Column(db.Text)
    reference_links = db.Column(db.JSON)
    attachments = db.Column(db.JSON)
    verticals = db.Column(db.JSON)
    custom_vertical = db.Column(db.String(100))
    demo_details = db.Column(db.JSON)
    client_suggestions = db.Column(db.Text)
    problem_statement = db.Column(db.Text)
    case_description = db.Column(db.Text)
    stakeholders = db.Column(db.Text)
    visualization_goal = db.Column(db.Text)
    resources_provided = db.Column(db.Text)
    documentation_status = db.Column(db.Text)
    support_team_available = db.Column(db.Boolean)
    mathematical_modeling = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'analysis_type': self.analysis_type,
            'company_website': self.company_website,
            'use_case_description': self.use_case_description,
            'reference_links': self.reference_links,
            'attachments': self.attachments,
            'verticals': self.verticals,
            'custom_vertical': self.custom_vertical,
            'demo_details': self.demo_details,
            'client_suggestions': self.client_suggestions,
            'problem_statement': self.problem_statement,
            'case_description': self.case_description,
            'stakeholders': self.stakeholders,
            'visualization_goal': self.visualization_goal,
            'resources_provided': self.resources_provided,
            'documentation_status': self.documentation_status,
            'support_team_available': self.support_team_available,
            'mathematical_modeling': self.mathematical_modeling,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    filepath = db.Column(db.String(512), nullable=False)
    filetype = db.Column(db.String(50))
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'filename': self.filename,
            'filepath': self.filepath,
            'filetype': self.filetype,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None
        }

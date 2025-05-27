from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.config['UPLOAD_FOLDER'] = 'uploads'

    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    from app.routes.clients import bp as clients_bp
    from app.routes.projects import bp as projects_bp
    from app.routes.pricing import bp as pricing_bp
    from app.routes.kanban import bp as kanban_bp
    from app.routes.demo_analysis import bp as demo_analysis_bp
    from app.routes.documents import bp as documents_bp

    app.register_blueprint(clients_bp, url_prefix='/api/clients')
    app.register_blueprint(projects_bp, url_prefix='/api/projects')
    app.register_blueprint(pricing_bp, url_prefix='/api/pricing')
    app.register_blueprint(kanban_bp, url_prefix='/api/kanban')
    app.register_blueprint(demo_analysis_bp, url_prefix='/api/demo-analysis')
    app.register_blueprint(documents_bp, url_prefix='/api/documents')

    return app

from app import models
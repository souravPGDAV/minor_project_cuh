from flask import Flask
from application.database import db
from application.config import LocalDevelopmentConfig
from application.models import *
from application.controllers.main_view import main_bp
from application.api.api_c import api_bp


def create_app():
    app = Flask(__name__,instance_path="/tmp/flask_instance")
    app.config.from_object(LocalDevelopmentConfig)

    db.init_app(app)   
    
    with app.app_context():
        db.create_all()
    app.register_blueprint(main_bp)
    app.register_blueprint(api_bp)

    return app

app=create_app()

if __name__=="__main__":
    app.run(debug=True)
    
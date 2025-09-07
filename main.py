from flask import Flask
from application.database import db
from application.config import LocalDevelopmentConfig
from application.models import *

app = Flask(__name__)
app.config.from_object(LocalDevelopmentConfig)
app.app_context().push()
db.init_app(app)
db.create_all()
from application.controllers.main_view import *
from application.api.api_c import * 
if __name__=="__main__":
    app.run(debug=True)
    
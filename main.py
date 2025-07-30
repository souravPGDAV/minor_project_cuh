from flask import Flask



def create_app():
    app = Flask(__name__)

    app.app_context().push()
    return app


    
app=None

app=create_app()
from application.controllers.main_view import *

if __name__=="__main__":
    app.run(debug=True)
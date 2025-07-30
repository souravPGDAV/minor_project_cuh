from flask import Flask
# from application.controllers.main_view import *


def create_app():
    app = Flask(__name__)

    app.app_context().push()
    return app

app=None

app=create_app()

if __name__=="__main__":
    app.run(debug=True)
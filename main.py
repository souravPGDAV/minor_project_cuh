from flask import Flask

app = Flask(__name__)

app.app_context().push()
from application.controllers.main_view import *

if __name__=="__main__":
    app.run(debug=True)
    
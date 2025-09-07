from flask import render_template, request, redirect,make_response, send_file
from flask import Flask, session, Blueprint
from datetime import datetime
# from flask import current_app as app
from datetime import datetime

main_bp = Blueprint("main", __name__)

@main_bp.route('/')
def home_page():
    if request.method=="GET":
        current_datetime = datetime.now()
        return render_template("home.html",date=current_datetime)
    
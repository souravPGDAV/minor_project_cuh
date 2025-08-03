from flask import render_template, request, redirect,make_response, send_file
from flask import Flask, session
from datetime import datetime
from flask import current_app as app
from datetime import datetime

@app.route('/')
def home_page():
    if request.method=="GET":
        current_datetime = datetime.now()
        return render_template("home.html",date=current_datetime)
    

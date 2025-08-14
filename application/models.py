import os
from application.database import db
from flask_security import UserMixin, RoleMixin

class Locations(db.Model):
    loc_id=db.Column(db.Integer, autoincrement=True, unique=True)
    user_id=db.Column(db.String(20), nullable=False, primary_key=True)
    timestamp=db.Column(db.Integer, nullable=False, primary_key=True)
    latitude=db.Column(db.String(20))
    longitude=db.Column(db.String(20))
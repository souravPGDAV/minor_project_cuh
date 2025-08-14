import os
from application.database import db
from flask_security import UserMixin, RoleMixin

class Locations(db.Model):
    loc_id=db.Column(db.Integer, primary_key=True, nullable=False)
    timestamp=db.Column(db.Integer, primary_key=True, nullable=False)
    latitude=db.Column(db.String(20))
    longitude=db.Column(db.String(20))
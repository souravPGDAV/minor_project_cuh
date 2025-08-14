from application.database import db
import pandas as pd
from flask import Flask,request,session,json,send_file,jsonify,make_response
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from application.models import *
from flask_restful import fields, marshal
from flask import current_app as app
import requests

api=Api(app)

class ApiLocations(Resource):
    def get(self):
        locations=Locations.query.filter.all()

        return locations,200
    
    
    def post(self):
        request_body=request.get_json()
        try:
            time_stamp=request_body['timestamp']
        except:
            return marshal({'error':'timestamp is required'},{'error':fields.String}), 400
        try:
            latitude=request_body['latitude']
        except:
            return marshal({'error':'latitude is required'},{'error':fields.String}), 400
        
        try:
            longitude=request_body['longitude']
        except:
            return marshal({'error':'longitude is required'},{'error':fields.String}), 400

        instance=Locations(timestamp=time_stamp, latitude=latitude, longitude=longitude)
        db.session.add(instance)
        db.session.commit()
        lower_limit=str(int(time_stamp)-10)
        upper_limit=str(int(time_stamp)+10)
        all_locations=Locations.query.filter(Locations.timestamp<=upper_limit).filter(Locations.timestamp>=lower_limit).all()
        
        locations_detail={['loc_id']:fields.Integer, ['timestamp']:fields.Integer, ['latitude']:fields.String, ['longitude']: fields.String}
        #decide to send the location id with results
        resource_fields={}
        for index, location in enumerate(all_locations):
            resource_fields[location.loc_id]=fields.Nested(locations_detail)
       
        return marshal(all_locations,resource_fields),200

api.add_resource(ApiLocations,'/api/locations')

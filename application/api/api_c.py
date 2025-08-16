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
import uuid

api=Api(app)

class ApiLocations(Resource):
    def get(self):
        locations=Locations.query.filter.all()

        return locations,200
    
    
    def post(self):
        request_body=request.get_json()
        try:
            user_id=request_body['user_id']
        except:
            return marshal({'error':'user_id is required'},{'error':fields.String}), 400
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

        user_detail=Locations.query.filter(Locations.user_id==user_id).first()
        if(user_detail):
            user_detail.timestamp=time_stamp
            user_detail.longitude=longitude
            user_detail.latitude=latitude
        else:

            instance=Locations(user_id=user_id, timestamp=time_stamp, latitude=latitude, longitude=longitude)
            db.session.add(instance)
        db.session.commit()
        
        all_locations=Locations.query.filter(time_stamp-Locations.timestamp<=3000).all()
        

        locations_detail={'user_id':fields.String, 'timestamp':fields.Integer, 'latitude':fields.String, 'longitude': fields.String}
        #decide to send the location id with results
        resource_fields={}
        result_to_be_sent={}
        for index, location in enumerate(all_locations):
            temp={}
            temp['user_id']=location.user_id
            temp['timestamp']=location.timestamp
            temp['latitude']=location.latitude
            temp['longitude']=location.longitude
            resource_fields[str(location.user_id)]=fields.Nested(locations_detail)
            result_to_be_sent[str(location.user_id)]=temp.copy()
            # resource_fields[str(index)]=fields.Nested(locations_detail)


        return marshal(result_to_be_sent,resource_fields),200

api.add_resource(ApiLocations,'/api/locations')


class ApiUser(Resource):
    def get(self):
        new_user_id=str(uuid.uuid4())[:10]
        return marshal({'user_id':new_user_id},{'user_id':fields.String}), 200

api.add_resource(ApiUser,'/api/user')
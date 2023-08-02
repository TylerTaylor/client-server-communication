#!/usr/bin/env python3

# Review:
    # CORS

# Set Up:
    # Run in terminal:
        # cd server
        # export FLASK_APP=app.py
        # export FLASK_RUN_PORT=5555
        # flask db init
        # flask db revision --autogenerate -m "Create table <table name>"
        # flask db upgrade
        # python seed.py

    # Double check the database to verify the migration worked as expected

    # To run both apps together:
        # In one terminal tab/window, run `flask run --debug`
        # Then in another tab/window, cd into `client`, `npm install` (on first run), then `npm start`
    

# RESTful routing examples

# |  HTTP Verb  |      Path       |      Description      |
# |-------------|-----------------|-----------------------|
# | GET         |  /services      | READ all resources    |
# | GET         |  /services/:id  | READ one resource     |
# | POST        |  /services      | CREATE one resource   |
# | PATCH/PUT   |  /services/:id  | UPDATE one resource   |
# | DELETE      |  /services/:id  | DESTROY one resource  |
# |-------------|-----------------|-----------------------|

# Status code reference: https://httpstatusdogs.com/

from flask import Flask, jsonify, make_response, request, abort
from flask_migrate import Migrate

from flask_restful import Api, Resource

from werkzeug.exceptions import NotFound

from models import db, Service, Show

app = Flask(__name__)

# 1. Import CORS from flask_cors, invoke it with `app` as an argument
from flask_cors import CORS
CORS(app)

# 2. Start up the server and client then navigate to client/src/App.js

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False # configures JSON responses to print on indented lines

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "NotFound: Sorry, the resource you are looking for can not be found!",
        404
    )
    return response

class Services(Resource):
    def get(self):
        service_list = [service.to_dict() for service in Service.query.all()]

        response = make_response(service_list, 200)
        return response

    def post(self):
        # Grab the form data from our request object and create a new Service
        request_json = request.get_json()

        # NOTE Added this try/except block
        try:
            new_service = Service(name=request_json['name'], price=request_json['price'])
        except ValueError as e:
            abort(422, e.args[0])

        # Save to database and commit
        db.session.add(new_service)
        db.session.commit()
        
        # Return our new object as JSON response
        response_dict = new_service.to_dict()
        response = make_response(response_dict, 201)
        return response

api.add_resource(Services, '/services')

class Shows(Resource):
    def get(self):
        show_list = [show.to_dict() for show in Show.query.all()]

        response = make_response(show_list, 200)
        return response

    def post(self):
        # Grab the form data from our request object and create a new Show
        request_json = request.get_json()
        new_show = Show(
            name=request_json['name'],
            seasons=request_json['seasons']
        )

        # Save to database and commit
        db.session.add(new_show)
        db.session.commit()

        # Return our new object as JSON response
        response_dict = new_show.to_dict()
        response = make_response(response_dict, 201)

api.add_resource(Shows, '/shows')

class ServiceById(Resource):
    def get(self, id):
        service = Service.query.filter(Service.id == id).first()

        if not service:
            abort(404, 'The Service you were looking for was not found')

        service_dict = service.to_dict()
        response = make_response(service_dict, 200)
        return response

    def patch(self, id):
        # Find the service we want to update
        service = Service.query.filter_by(id=id).first()

        # if its not found, send an error message
        if not service:
            abort(404, 'The service you were trying to update was not found')

        # Grab the form data and loop over it to update (set) each attribute
        request_json = request.get_json()
        for key in request_json:
            # import ipdb; ipdb.set_trace()
            setattr(service, key, request_json[key])

        db.session.add(service)
        db.session.commit()

        response = make_response(
            service.to_dict(),
            200
        )

        return response

    def delete(self, id):
        service = Service.query.filter_by(id=id).first()

        if not service:
            abort(404, 'The service you were trying to delete can not be found')

        db.session.delete(service)
        db.session.commit()

        response = make_response('', 204)

        return response

api.add_resource(ServiceById, '/services/<int:id>')

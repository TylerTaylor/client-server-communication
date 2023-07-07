# Client Server Communication

In the root directory, run:

- `pipenv install`
- `pipenv shell`

Then some additional setup:

- `cd server`
- `export FLASK_APP=app.py`
- `export FLASK_RUN_PORT=5555`
- `flask db init`
- `flask db revision --autogenerate -m "Create table <table name>"`
- `flask db upgrade`
- `python seed.py`

Finally, to run it:

In one terminal, from the `server` directory, run:

- `flask run --debug`

Then in another terminal, cd into `client` then run:

- `npm install`
- `npm start`
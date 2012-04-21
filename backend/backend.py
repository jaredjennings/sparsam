from flask import Flask, request, g
from contextlib import closing
import json
import sqlite3
app = Flask(__name__)
app.config.from_object(__name__)

DATABASE = "/srv/www/sparsam/db.sqlite3"

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql') as f:
            db.cursor().executescript(f.read())
        db.commit()
    
@app.before_request
@app.route("/")
def hello():
    return json.dumps(request.values)

@app.route("/spend", methods=["POST"])
def spend():
    return json.dumps("Took $%f from envelope %d." % (
        float(request.values['amount']),
        int(request.values['eid'])))

if __name__ == "__main__":
    app.run(host='0.0.0.0')

from flask import Flask, request, g, jsonify
from contextlib import closing
import sqlite3
app = Flask(__name__)
app.config.from_envvar('SB_SETTINGS')

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])

def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql') as f:
            db.cursor().executescript(f.read())
        db.commit()
    
@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.close()

@app.route("/envelopes")
def envelopes():
    c = g.db.cursor()
    q = c.execute('SELECT id, name, limit_cents FROM envelope ORDER BY name')
    result = {}
    for row in q:
        aq = c.execute(
            'SELECT SUM(cents) '
            '    FROM txn WHERE eid = ?', (row[0],))
        amt = aq.fetchall()[0][0]
        if amt is None: amt = 0
        result[row[0]] = {'name': row[1], 'cents': amt, 'limit_cents': row[2]}
    return jsonify(result)

@app.route("/spend", methods=["POST"])
def spend():
    return jsonify(result="Took $%f from envelope %d." % (
        float(request.values['amount']),
        int(request.values['eid'])))

if __name__ == "__main__":
    app.run(host='0.0.0.0')

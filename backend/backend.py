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

def amountIn(cursor, eid):
    aq = cursor.execute(
        'SELECT SUM(cents) '
        '    FROM txn WHERE eid = ?', (eid,))
    amt = aq.fetchall()[0][0]
    if amt is None: amt = 0
    return amt

@app.route("/envelopes")
def envelopes():
    c = g.db.cursor()
    q = c.execute('SELECT id, name, limit_cents FROM envelope ORDER BY name')
    result = {}
    for row in q.fetchall():
        result[row[0]] = {
            'name': row[1],
            'cents': amountIn(c, row[0]),
            'limit_cents': row[2],
        }
    return jsonify(result)

@app.route("/envelope")
def envelope():
    eid = int(request.values['eid'])
    c = g.db.cursor()
    q = c.execute(
        'SELECT id, name, limit_cents FROM envelope ' \
        '    WHERE id = ? ORDER BY name', (eid,))
    result = {}
    # weakness: assume envelope exists
    row = q.fetchall()[0]
    return jsonify({
            'name': row[1],
            'cents': amountIn(c, row[0]),
            'limit_cents': row[2],
        })

@app.route("/spend", methods=["POST"])
def spend():
    eid = int(request.values['eid'])
    cents = int(request.values['cents'])
    c = g.db.cursor()
    nextidq = c.execute('SELECT MAX(id) FROM txn')
    nextid = nextidq.fetchall()[0][0]
    if nextid is None: nextid = 0
    # that was really thisid, so to speak; now we get the nextone
    nextid += 1
    q = c.execute(
        'INSERT INTO txn (id, eid, cents) VALUES (?, ?, ?)',
        (nextid, eid, cents))
    g.db.commit()
    return jsonify()

if __name__ == "__main__":
    app.run(host='0.0.0.0')

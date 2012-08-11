from flask import Flask, request, g, jsonify
from contextlib import closing
import sqlite3
import json
from datetime import datetime
import cPickle
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
    # i think result has to be an object not an array
    result = {'envelopes': []}
    for row in q.fetchall():
        result['envelopes'].append({
            'eid': row[0],
            'name': row[1],
            'cents': amountIn(c, row[0]),
            'limit_cents': row[2],
        })
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
    # sqlite will store the data as unicode
    now = cPickle.dumps(datetime.now()).decode("UTF-8")
    c = g.db.cursor()
    # POSSIBLE RACE CONDITION
    nextidq = c.execute('SELECT MAX(id) FROM txn')
    nextid = nextidq.fetchall()[0][0]
    if nextid is None: nextid = 0
    # that was really thisid, so to speak; now we get the nextone
    nextid += 1
    q = c.execute(
        'INSERT INTO txn (id, datetime, eid, cents) VALUES (?, ?, ?, ?)',
        (nextid, now, eid, cents))
    g.db.commit()
    return jsonify()

@app.route("/history", methods=["POST"])
def history():
    eid = int(request.values['eid'])
    c = g.db.cursor()
    # arcane magic: we rely on the fact that (AFAICT) for two datetimes d1 and
    # d2, pickled as p1 and p2, p1 < p2 iff d1 < d2; in other words the strings
    # obtained from pickling datetimes appear to sort the same as the
    # datetimes.
    q = c.execute(
        'SELECT datetime, cents FROM txn ' \
        '    WHERE eid = ? ORDER BY datetime DESC',
        (eid,))
    result = {'history': []}
    for row in q.fetchall():
        # we stored the pickle ourselves just above. so no security worries.
        # right?
        # data is stored as unicode, but loads needs a string
        dt = cPickle.loads(row[0].encode("UTF-8"))
        dollars = int(row[1]) // 100
        cents = int(row[1]) % 100
        result['history'].append({
            'date': dt.strftime('%d %b'),
            'amount': '%d.%02d' % (dollars, cents),
        })
    return jsonify(result)


@app.route("/clearAndLoad", methods=["POST"])
def clearAndLoad():
    envelope_data = json.loads(request.values['envelope_data'])
    c = g.db.cursor()
    c.execute('DELETE FROM txn')
    c.execute('DELETE FROM envelope')
    id = 1
    for name, value in envelope_data.items():
        c.execute('INSERT INTO envelope VALUES (?, ?, ?)',
                (id, name, value))
        id += 1
    g.db.commit()
    return jsonify()

if __name__ == "__main__":
    app.run(host='0.0.0.0')

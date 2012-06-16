#!/srv/www/sparsam/backend/pythonhome/bin/python
import os
import sys

from flask import Flask, request, g, render_template, flash, redirect, url_for
from contextlib import closing
import sqlite3
import json

sys.path.append("/srv/www/sparsam/semismart")
os.environ['SB_SETTINGS'] = '/srv/www/sparsam/backend/config.py'

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

def cents_to_dollars(cents):
    return "%d.%02d" % (cents // 100, cents % 100)

@app.route("/")
def index():
    c = g.db.cursor()
    q = c.execute('SELECT id, name, limit_cents FROM envelope ORDER BY name')
    envelopes = {}
    for row in q.fetchall():
        id, name, limit_cents = row
        spent_cents = amountIn(c, id)
        envelopes[id] = {
            'name': name,
            'spent': cents_to_dollars(spent_cents),
            'remaining': cents_to_dollars(limit_cents - spent_cents),
            'limit': cents_to_dollars(limit_cents),
        }
    return render_template('index.html', envelopes=envelopes)
    # todo: CSRF token

@app.route("/spend", methods=["POST"])
def spend():
    eid = int(request.values['eid'])
    amount = float(request.values['amount'])
    cents = int(amount * 100)
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
    flash('$%.2f spent from envelope %s' % (amount, eid))
    return redirect(url_for('index'))

app.secret_key = '525e69c5bafd644600cbe02fae99df0995c56bf7b5545443083a1a0318a40797'
if __name__ == "__main__":
    app.run(host='0.0.0.0')


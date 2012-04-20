from flask import Flask, request, g
import json
app = Flask(__name__)

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

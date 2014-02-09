from flask import Flask, request, make_response
import requests
import urllib
app=Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def req():
	email = request.args.get("email", "")
	amount = float(request.args.get("amount", ""))
	note = request.args.get("note", "")
	r = requests.post("https://api.venmo.com/v1/payments?access_token=NucUfWPR4XDzT8x57ECj2F28yJgnCJNA&%s" % urllib.urlencode({'email':email, 'note':note, 'amount':amount}))
	return r.text

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
	app.run(debug=True)

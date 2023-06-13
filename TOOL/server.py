
import flask
from flask import Flask, request, redirect
import logging
import socket
from TOOL.models import IndexModel

from TOOL import CONSTANTS



app = Flask(__name__)
app.logger.disabled = False
log = logging.getLogger('werkzeug')

#log.setLevel(logging.ERROR)

'''
Главная страница
'''
@app.route('/')
@app.route('/index.html')
def index():
	log.disabled = True
	return IndexModel.index(request.args)



@app.route('/keyboardkeys')
def keyboardkeys():
	log.disabled = True
	return IndexModel.keyboardkeys(request.args)

@app.route('/mouse')
def mouse():
	log.disabled = True
	return IndexModel.mousemove(request.args)

@app.route('/mousebuttons')
def mousebuttons():
	log.disabled = True
	return IndexModel.mousebuttons(request.args)

@app.route('/scrollmove')
def scrollmove():
	log.disabled = True
	return IndexModel.scrollmove(request.args)

@app.route('/volume')
def volume():
	log.disabled = True
	return IndexModel.volume(request.args)



def start():
	app.run(debug=False, host='0.0.0.0', port=5000)

if __name__ == '__main__':
	start()
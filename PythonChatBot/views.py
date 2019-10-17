"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from PythonChatBot import app
from flask import request
from flask import jsonify
import PythonChatBot.ChatBot

import json

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Python Chat Bot',
    )

@app.route('/api/say', methods=['POST'])
def say():
    message = PythonChatBot.ChatBot.Message(str(request.json['content']), str(request.json['user']));
    response = PythonChatBot.ChatBot.process(message)
    return json.dumps(response.__dict__)
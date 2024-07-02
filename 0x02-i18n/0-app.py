#!/usr/bin/env python3
"""0-app module"""

from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index():
    """Index page"""
    return render_template('0-index.html')


if __name__ == '__main__':
    """ Main Function """
    app.run(debug=True)

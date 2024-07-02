#!/usr/bin/env python3
"""2-app module"""

from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """Config class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """Determine the best match with supported languages"""
    support_lang = app.config['LANGUAGES']
    best_match = request.accept_languages.best_match(support_lang)
    return best_match or app.config['BABEL_DEFAULT_LOCALE']


@app.route('/')
def index():
    """Index page"""
    return render_template('1-index.html')


if __name__ == '__main__':
    """ Main Function """
    app.run(debug=True)

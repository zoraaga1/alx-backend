import unittest
from flask import Flask
from flask_babel import Babel
from 3-app import app, Config


class FlaskBabelTestCase(unittest.TestCase):
    def setUp(self):
        """Set up the testing environment"""
        self.app = app
        self.app.config.from_object(Config)
        self.client = self.app.test_client()

    def test_translation_english(self):
        """Test English translation"""
        response = self.client.get('/', headers={'Accept-Language': 'en'})
        self.assertIn(b'Welcome to Holberton', response.data)
        self.assertIn(b'Hello world!', response.data)

    def test_translation_french(self):
        """Test French translation"""
        response = self.client.get('/', headers={'Accept-Language': 'fr'})
        self.assertIn(b'Bienvenue chez Holberton', response.data)
        self.assertIn(b'Bonjour monde!', response.data)


if __name__ == '__main__':
    unittest.main()

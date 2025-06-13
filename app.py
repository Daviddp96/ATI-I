from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, 
            static_folder='static',
            template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/perfil/<id>')
def perfil(id):
    return render_template('perfil.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 
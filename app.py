from flask import Flask, send_from_directory
app = Flask(__name__, static_url_path='', static_folder='frontend/dist')

@app.route('/',defaults={"path":""})
def serve(path):
    return send_from_directory(app.static_folder,'newTab.html')
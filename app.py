from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"


@app.route('/accueil/')
def accueil():
    return render_template("accueil.html")


if __name__ == "__main__":
    app.run(debug=True)

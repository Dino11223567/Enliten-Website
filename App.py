from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_bootstrap import Bootstrap
import time, json,urllib3, random, sqlite3
from random import randint
import Enliten_Functions


#Functions
Q = Enliten_Functions.Q_Tasks()


Q.fetch()
string =Q.Answer_str()
print(string)
print(string.split())
x= input("A: ")
if x in string.split():
    print("Correct!")
else:
    print("Try Again")




#Python Flask 


app = Flask(__name__)
Bootstrap(app)
app.secret_key = "howsitgoingbro1234508234129458751239487"



@app.route("/", methods=['GET'])
def index():

    return render_template("home.html")



@app.route("/Question", methods=['GET'])
def Question():
    return render_template("question.html")
  
@app.route("/Login", methods=['GET'])
def Login():    
    return("Currently Under Construction")

@app.route("/Practice", methods=['GET'])
def Practice():
    return("Currently Under Construction")

@app.route("/Profile", methods=['GET'])
def Profile():
    return("Currently Under Construction")


@app.route("/background_process", methods=['GET','POST'])
def background_process():

    response = request.args.get('response')
    type = request.args.get('type')

    if type == "Next":
        Q.fetch()

        return jsonify(result= Q.Question_str())
        
    elif type == "Answer":
        
        if response in Q.Answer_str.split():

            return jsonify(result = "WOW DID YOU CHEAT?")

        else:
            return jsonify(result = Q.Answer_str())
        



if __name__ == "__main__":
    app.run()

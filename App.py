from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
from flask_bootstrap import Bootstrap
import time, json,urllib3, random
from random import randint

#Variables and Lists
database= []

global question_info
global answer
question_info={}
answer=""

#Functions

with open("database/test.json") as json_data:    
    for line in json_data:
        database.append(json.loads(line))
        

#Python Flask 



app = Flask(__name__)
Bootstrap(app)
app.secret_key = "howsitgoingbro1234508234129458751239487"



@app.route("/", methods=['GET'])
def index():

    question = "This is where a question will go "
    words = question.split()
    question_words= []
    i = 0
    string = ""
    while (i< len(words)):
        question_words.append(words[i])
        string = " ".join(question_words)
        i += 1
    return render_template("home.html",TestQuestion=question_words)



@app.route("/Question", methods=['GET'])
def Question():
    index = random.randint(0,len(database)-1)
    question_info = database[index]
    answer=question_info['answer']    
    return render_template("question.html",question=question_info['question'])
   
@app.route("/Login", methods=['GET'])
def Login():
    return("Currently Under Construction")

@app.route("/Practice", methods=['GET'])
def Practice():
    return("Currently Under Construction")

@app.route("/Profile", methods=['GET'])
def Profile():
    return("Currently Under Construction")

@app.route("/background_process", methods=['GET'])
def background_process():
       ans = request.args.get('response')
       print(ans)
       return jsonify(result=ans)

        



if __name__ == "__main__":
    app.run()

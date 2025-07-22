from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = "YOUR_API_KEY"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data['message']

    prompt = f"You are a mental health support bot. Talk to the user empathetically.\nUser: {user_input}\nBot:"
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        temperature=0.8
    )
    
    reply = response['choices'][0]['text'].strip()
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)

import os
import google.generativeai as genai

# ✅ Load your Gemini API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # or put the key directly below

# ✅ Create a Gemini model object
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# ✅ Function to get a response
def get_openai_response(prompt):
    response = model.generate_content(prompt)
    return response.text

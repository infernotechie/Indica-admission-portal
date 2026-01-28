import requests
import json

API_KEY = "AIzaSyDRkZwENxH-ctgfKPkBLFHFtgKww8v1NdY"
MODEL = "models/gemini-1.5-flash"
URL = f"https://generativelanguage.googleapis.com/v1beta/{MODEL}:generateContent?key={API_KEY}"

data = {
    "contents": [
        {"parts": [{"text": "Write me a 2 line motivational quote."}]}
    ]
}

response = requests.post(URL, json=data)
print("Status:", response.status_code)
print("Response:", json.dumps(response.json(), indent=2))

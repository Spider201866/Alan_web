import requests

url = 'http://127.0.0.1:5000/check_password'
password = 'password123'  # Replace with your actual password

response = requests.post(url, json={'password': password})
print(response.json())

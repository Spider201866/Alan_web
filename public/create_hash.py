from werkzeug.security import generate_password_hash

# Replace with your actual password
password = "662023"
hashed_password = generate_password_hash(password)

# Save the hashed password to a file
with open('hashed_password.txt', 'w') as f:
    f.write(hashed_password)

print("Hashed password saved to hashed_password.txt")

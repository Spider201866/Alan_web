const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3000;

let users = []; // Placeholder for user storage

// IP address logging middleware
app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Access from IP: ${ip}`);
  fs.appendFile('access.log', `Access from IP: ${ip}\n`, err => {
    if (err) {
      console.error('Error writing to access.log', err);
    }
  });
  next();
});

// Serve your static site
app.use(express.static('public'));

// Handle user registration
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      healthWorkerType: req.body.healthWorkerType,
      password: hashedPassword
    };
    users.push(user); // Ideally, use a database for storing user info
    res.status(201).send('User Registered');
  } catch {
    res.status(500).send('Server error during registration');
  }
});

// Handle user login
app.post('/login', async (req, res) => {
  const user = users.find(u => u.name === req.body.name);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success');
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send('Server error during login');
  }
});

// Example of another route
app.get('/another-route', (req, res) => {
  res.send('Response from another route');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

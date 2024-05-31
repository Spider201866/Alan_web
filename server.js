
// https://alan.up.railway.app/view-records

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const PASSWORD = process.env.AUTH_PASSWORD || 'your-password'; // Set your desired password here

// Initialize SQLite database
const db = new sqlite3.Database('./user-info.db');

// Create table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS user_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        role TEXT,
        latitude REAL,
        longitude REAL,
        country TEXT,
        area TEXT,
        version TEXT,
        dateTime TEXT
    )`);
});

console.log("Configured password:", PASSWORD); // Log the configured password for debugging

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the view-records page
app.get('/view-records', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view-records.html'));
});

// Endpoint to record user information
app.post('/record-info', (req, res) => {
    const { name, role, latitude, longitude, country, area, version, dateTime } = req.body;

    db.run(`INSERT INTO user_info (name, role, latitude, longitude, country, area, version, dateTime) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, role, latitude, longitude, country, area, version, dateTime],
        function (err) {
            if (err) {
                return res.status(500).end();
            }
        });
});

// Endpoint to fetch records with password protection
app.post('/fetch-records', (req, res) => {
    const { password } = req.body;

    console.log("Received password:", password); // Log the received password for debugging

    if (password !== PASSWORD) {
        return res.status(401).send('Invalid password');
    }

    db.all("SELECT * FROM user_info", [], (err, rows) => {
        if (err) {
            return res.status(500).send('Error reading user info');
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

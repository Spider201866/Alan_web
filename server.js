const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const PASSWORD = process.env.AUTH_PASSWORD || 'your-password'; // Set your desired password here

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
    const { name, role, latitude, longitude, country, area, contactInfo, version, dateTime } = req.body;
    const userInfo = { name, role, latitude, longitude, country, area, contactInfo, version, dateTime };

    const filePath = path.join(__dirname, 'user-info.json');

    fs.readFile(filePath, (err, data) => {
        let json = [];
        if (!err) {
            json = JSON.parse(data);
        }
        json.push(userInfo);

        fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
            if (err) {
                return res.status(500).end();
            }
            res.end(); // End the response without sending any message
        });
    });
});

// Endpoint to fetch records with password protection
app.post('/fetch-records', (req, res) => {
    const { password } = req.body;

    console.log("Received password:", password); // Log the received password for debugging

    if (password !== PASSWORD) {
        return res.status(401).send('Invalid password');
    }

    const filePath = path.join(__dirname, 'user-info.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // If the file doesn't exist, return an empty array
                return res.json([]);
            } else {
                return res.status(500).send('Error reading user info');
            }
        }

        const records = JSON.parse(data);
        res.json(records);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

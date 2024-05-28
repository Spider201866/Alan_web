const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/record-info', (req, res) => {
    const { name, role, latitude, longitude, country, area, version, dateTime } = req.body;
    const userInfo = { name, role, latitude, longitude, country, area, version, dateTime };

    const filePath = path.join(__dirname, 'user-info.json');

    fs.readFile(filePath, (err, data) => {
        let json = [];
        if (!err) {
            json = JSON.parse(data);
        }
        json.push(userInfo);

        fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error recording user info');
            }
            res.send('User info recorded');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

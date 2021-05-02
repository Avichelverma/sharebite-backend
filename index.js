const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Base route
app.get('/', (req, res) => {
	res.send('Basic Setup');
});

// set port, listen for requests
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

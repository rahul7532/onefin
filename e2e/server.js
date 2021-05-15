const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/onefin'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/onefin/'}),
);

app.listen(process.env.PORT || 8080);
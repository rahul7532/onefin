const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/onefin'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/onefin/'}),
);

let port=process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`App is running at the port ${port}}`)
});
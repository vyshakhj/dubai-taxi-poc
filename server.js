const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/dubai-taxi-poc'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/dubai-taxi-poc/index.html'));
});

app.listen(process.env.PORT || 3000);

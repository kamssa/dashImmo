const express = require('express');

const app = express();

app.use(express.static('./dist/dashbord-immo-gstoreplus'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/dashbord-immo-gstoreplus/'}),
);

app.listen(process.env.PORT || 8080);

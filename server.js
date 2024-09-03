const express = require('express');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

app.use('/', routes);

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server listening on port ${port}`);
  } else {
    console.log('Error occured');
  }
});

module.exports = app;

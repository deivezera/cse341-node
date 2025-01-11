const express = require('express');

const mongodb = require('./data/database');
const app = express();

app.use('/', require('./routes'))

const port = 3000;
console.log("Web Server is listening at port " + (process.env.port || port))

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Database is listening and node Running on port ${port}`))
  }
})
const {getReposByUsername} = require('../helpers/github'); //to bring in github helper function

const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());

app.post('/repos', function (req, res) {//once username is posted to server, use that name to make a GET request to Github using the helper function.
  // TODO - your code here!
  // This route should take the github username provided
  console.log('Post to /repos received');
  console.log('Req body.term:', req.body.term);
  getReposByUsername(req.body.term);
  res.status(201);
  res.send('response from server');
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) { //interacts w our db, not githubs /repos
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


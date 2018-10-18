const request = require('request');
const config = require('../config.js');
const {save} = require('../database/index.js'); //bringing in save function for database index


let getReposByUsername = (term, cb) => { 
  console.log('term in getReposbyUsername:', term);
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  
  let options = {
    url: 'https://api.github.com/users/' + term + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      save(info, cb);
    }
  }
   
  request(options, callback);

}
module.exports.getReposByUsername = getReposByUsername;
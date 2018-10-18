const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MONGOOSE SERVER ONLINE')
});


let repoSchema = new mongoose.Schema({
  uniqueId: {type: Number, unique: true},
  ownerName: String,
  ownerLink: String,
  repoName: String,
  repoLink: String,
  forksNumber: Number,
  //starsNumber
});


let Repo = mongoose.model('Repo', repoSchema);
let first = new Repo({
  uniqueId: 1776,
  ownerName: "BigBoss",
  ownerLink: "www.google.com",
  repoName: "Apples",
  repoLink: "repolink.com",
  forksNumber: 9999,
});
first.save();

const save = (repoArray) => {//parameter by MJW
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  for(let i=0; i < repoArray.length; i++){
    console.log('Trying to save', repoArray[i].name);
    let newRow = new Repo({
      uniqueId: repoArray[i].id,
      ownerName: repoArray[i].owner.login,
      ownerLink: repoArray[i].owner.url,
      repoName: repoArray[i].name,
      repoLink: repoArray[i].html_url,
      forksNumber: repoArray[i].forks,
    })
    newRow.save(console.log('BOOYA'));
    ; 
  }
  console.log('DONE. LOOK AT ME IN COMPASS.');
}

module.exports.save = save;
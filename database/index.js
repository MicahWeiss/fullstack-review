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

const save = (repoArray, cb) => {//parameter by MJW
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  const promiseArray = [];
  for(let i=0; i < repoArray.length; i++){
    let dummyPromise =  new Promise((resolve, reject)=>{
      console.log('Starting to save', repoArray[i].name);
      let newRow = new Repo({
        uniqueId: repoArray[i].id,
        ownerName: repoArray[i].owner.login,
        ownerLink: repoArray[i].owner.url,
        repoName: repoArray[i].name,
        repoLink: repoArray[i].html_url,
        forksNumber: repoArray[i].forks,
      })
      newRow.save(()=>{
        console.log('DONE', repoArray[i].name);
        resolve();
      });
    });
    promiseArray.push(dummyPromise); //push into promise array
  }

  Promise.all(promiseArray).then(cb); //promise all line
  

  //cb();

  /*
  var p1 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 1000, 'one'); 
}); 
var p2 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 2000, 'two'); 
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'three');
});
var p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, 'four');
});
var p5 = new Promise((resolve, reject) => {
  reject('reject');
});

Promise.all([p1, p2, p3, p4, p5]).then(values => { 
  console.log(values);
}, reason => {
  console.log(reason)
});

//From console:
//"reject"

//You can also use .catch


//From console: 
//"reject"
  */
}

module.exports.save = save;
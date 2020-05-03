var express = require('express');
var router = express.Router();
var axios = require('axios');

// Get list of all the different languages
router.get('/languages', async function(req, res, next) {
  const repos = await diffLangs();
  res.json(repos);
});

//Get the number and the list of repos of one language
//Name of language should be specified in the body of the request
router.get('/language', async function(req,res,next){
  const repos = await getRepos();
  const l = repos.length;
  var result = [];
  var listOfRepos = [];
  var cnt = 0;
  var found = false;
  var choice = req.body.choice;

  for(var i = 0; i<l; i++){
    var element = {}
    if(repos[i].language != null && choice!=undefined){
      choice = choice.toLowerCase();
      if(repos[i].language.toLowerCase() == choice ){
        cnt++;
        element['name of repo'] = repos[i].nameRepo;
        listOfRepos.push(element);
        found = true;
      }
    }
   }
   if(found){
     var element2 = {};
      element2['number of repos'] = cnt;
      result.push(listOfRepos);
      result.push(element2);
      res.json(result);
   }
   else{
     //language deos not exist in the 100 trending repos
     res.json("Language not found").status(404);
   }

})



//fetch repos along with their language
async function  getRepos(){
  // YYYY-MM-DD
  var date = new Date();
  date.setDate(date.getDate() -1);
  var dateString = date.toISOString().split('T')[0];

  const url = "https://api.github.com/search/repositories?q=created:>"+dateString+"&sort=stars&order=desc";
  const response = await axios.get(url); 
  const l = response.data.items.length;
  var repos =[];
  
  for(var i = 0; i<l; i++){
    var element = {}
    if(!repos.includes(response.data.items[i].language)){
      element['language'] = response.data.items[i].language;
      element['nameRepo'] = response.data.items[i].name;
      repos.push(element);
    }
  }
  return repos;
}

//function to remove duplicate languages
async function diffLangs(){
  const repos = await getRepos();
  const l = repos.length;
  var diffLangs = [];
  var index=0;

  for(var i=0; i<l; i++){
    if(!diffLangs.includes(repos[i].language)){
      diffLangs[index] = repos[i].language;
      index++;
    }
  }
  
  return diffLangs;

}

module.exports = {diffLangs, router};


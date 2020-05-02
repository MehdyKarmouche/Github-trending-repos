var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/languages', async function(req, res, next) {
  const repos = await diffLangs();
  res.json(repos);
});

router.get('/language', async function(req,res,next){
  const repos = await getRepos();
  const l = repos.length;
  var choice = req.body.choice;
  var result = [];
  var listOfRepos = [];
  var cnt = 0;
  var found = false;
  choice = choice.toLowerCase();

  for(var i = 0; i<l; i++){
    var element = {}
    if(repos[i].language != null)
      if(repos[i].language.toLowerCase() == choice && choice != '' ){
        cnt++;
        element['name of repo'] = repos[i].nameRepo;
        listOfRepos.push(element);
        found = true;
      }
   }
   if(found){
      element['number of repos'] = cnt;
      result.push(listOfRepos);
      result.push(element);
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



module.exports = router;

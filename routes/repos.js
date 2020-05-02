var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/repos', async function(req, res, next) {
  const repos = await getRepos();
  res.json(repos);
});


//fetch repos along with their language
async function  getRepos(){
  // YYYY-MM-DD
  var date = new Date();
  date.setDate(date.getDate() -1);
  var dateString = date.toISOString().split('T')[0];

  const url = "https://api.github.com/search/repositories?q=created:>"+dateString+"&sort=stars&order=desc";
  let response = await axios.get(url); 
  var l = response.data.items.length;
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


module.exports = router;

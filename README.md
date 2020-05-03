# Github-trending-repos
Using the Github api to get and manipulate the 100 trending repos

-The endpoint /languages gives the different languages of the 100 repos without duplicated languages

-The endpoint /language gives the infromation (number of repos with a specified language & list of the name of those repos). 
 The language is given by the user in the body of the request.
 
-Used Jest to test functions

Imporvements:
-Move some functions from routes folder to utils (in case of a big project)
 

# Liri
* LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface.
## Target User
* For students who likes to learn how API call works on node.js
* people who likes to have fun in command line
## Tech Used
* npm
* twitter npm
* node-spotify-api npm
* request npm
* fs (built in reqire method)
## All commands
* Liri takes the input using process.argv
  * Which means that user have to write: node liri.js <command> (process.argv[2] process.argv[3]++)
* command for process.argv[2]
  * my-tweets : access user's tweeter // by it-self it will lists all the tweets status user has.
  post : post status to user tweeter (example: node liri.js my-tweets post <message for status update>)
  * tweets : list other person's tweeter status
   <A person's ID>
  * spotify-this-song : lists song info // default: "The Sign" by Ace of Base
   <song name + artist name> 
  * movie-this : list movie info // defualt: "dark knight rises"
   <movie name>
  * do-what-it-says : LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
## User input
* ex) node liri.js my-tweets post I love my tweeter!
* explained
  * node liri.js -- will start the program 
  * my-tweets -- use functions in my tweeter account 
  * post -- post tweeter status to my tweeter account 
  * I love my tweeter! -- string that will be post in my tweeter 

```javascript
switch (process.argv[2]) {
  case `my-tweets`:tweeterFunction();

    break;
  case 'tweets':tweets();

    break;
  case `spotify-this-song`:spotifyFunction();

    break;
  case `movie-this`:movieFunction();

    break;
  case `do-what-it-says`:doWhatitsays();

    break;
  default:
    console.log("-------------------\n Your possible commands:");
    console.log(`my-tweets`);
    console.log(`tweets`);
    console.log(`spotify-this-song`);
    console.log(`movie-this`);
    console.log(`do-what-it-says`);
    console.log("-------------------");
}
```
## Output
* ex) node liri.js my-tweets post I love my tweeter!
* output>
  * this is loaded
  * success!: I love my tweeter!
  
![GitHub Logo](/images/tweetexample.png)

## Log user activity
* this function below will make a log.txt based on user activity.

```javascript
var recordAlldata=function(outputDATA){

  fs.appendFile("log.txt", outputDATA, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}
```

* example log.txt
```javascript
viewed I Want It That Way in spotify
viewed The Dark Knight Rises in omdbapi
viewed elonmusk tweeter
viewed my tweeter
posted: [object Object] in my tweeter
posted: I love my tweeter! in my tweeter
posted: test node module post tweet in my tweeter
viewed my tweeter
viewed elonmusk tweeter
viewed Gangnam Style (강남스타일) in spotify
viewed Spider Man in omdbapi
viewed Batman in omdbapi
```

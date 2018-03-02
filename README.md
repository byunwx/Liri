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

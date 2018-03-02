require("dotenv").config();

var keys= require("./keys.js");
var Spotify=require("node-spotify-api");
var Twitter=require("twitter");
var request=require("request");

var fs=require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command="";
var commandMaker=function(){
  for (var i = 3; i < process.argv.length; i++) {
    if (i==process.argv.length-1) {
      command+=process.argv[i];
    }else{
    command+=process.argv[i]+" ";
    }
  }
  console.log(command)
}
var recordAlldata=function(outputDATA){

  fs.appendFile("log.txt", outputDATA, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}
var tweeterFunction=function(){ //display all of my tweets
  if (process.argv[3]=="post") {
    var tweetStatus="";
    var statusMaker=function(){
      for (var i = 4; i < process.argv.length; i++) {
        if (i==process.argv.length-1) {
          tweetStatus+=process.argv[i];
        }else{
        tweetStatus+=process.argv[i]+" ";
        }
      }
    }
    statusMaker();
    client.post('statuses/update', {status: tweetStatus},  function(error, tweet, response) {
      if(error) throw error;
      console.log("success!: "+tweetStatus);  // Tweet body.
      var output="posted: "+tweetStatus+" in my tweeter\n";
      recordAlldata(output);

  });
  }else{
    var params = {screen_name: ''};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].created_at);
          console.log(tweets[i].text+"\n");

        }
        var output="viewed my tweeter\n";
        recordAlldata(output);
      }
    });
  }
}
var tweets= function(){//display other person's tweets
  if (process.argv[4]) {
    return console.log("search using only one word: tweeter acounts are composed with one word ID")
  }
  commandMaker();
  var params = {screen_name: command};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(tweets[i].text+"\n");
      }
      var output="viewed "+command+" tweeter\n";
      recordAlldata(output);
    }
  });
}
var spotifyFunction=function(eee){
  commandMaker();
  var song="The Sign, Ace of Base";
  if (process.argv[3]) {
    song=command;
  } else if(eee){
    song=eee;
  }

  spotify.search({ type: 'track', query: song }, function (err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          console.log('Title: ' + data.tracks.items[0].name);
          console.log('Artist: ' + data.tracks.items[0].artists[0].name);
          console.log('Album: ' + data.tracks.items[0].album.name);
          console.log('Preview link: ' + data.tracks.items[0].preview_url);
          var output="viewed "+data.tracks.items[0].name+" in spotify\n";
          recordAlldata(output);
        });
}
var movieFunction=function(){
  commandMaker();
  var movie = "dark knight rises"
  if (process.argv[3]) {
    movie = command;
  }

  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  // Creating an AJAX call for the specific movie button being clicked
  request(queryURL, function(error, response, body) {
    var title = JSON.parse(body).Title;
    var rating = JSON.parse(body).Rated;
    var released = JSON.parse(body).Released;
    var plot = JSON.parse(body).Plot;
    console.log(title);
    console.log(rating);
    console.log(released);
    console.log(plot);
    var output="viewed "+title+" in omdbapi\n";
    recordAlldata(output);
  });

}
var doWhatitsays=function(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
    switch (dataArr[0]) {
      case `my-tweets`:tweeterFunction();

        break;
      case 'tweets':tweets();

        break;
      case `spotify-this-song`:spotifyFunction(dataArr[1]);

        break;
      case `movie-this`:movieFunction();

        break;
    }
  });
}

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

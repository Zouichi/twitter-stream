var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var Twitter = require('twitter');

// j'instancie la connexion mongo 
var promise = mongoose.connect('mongodb://localhost:27017/ifa', {
    useMongoClient: true,
});
// quand la connexion est réussie
promise.then(
    () => {
        console.log('db.connected');
        // je démarre mon serveur web node sur le port 3000
        server.listen(3000, function() {
            console.log('listening on 3000 and database is connected');
        });
    },
    err => {
        console.log('MONGO ERROR');
        console.log(err);
    }
);

// je renvoies l'index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/stream.html')
});

// ecouter les evenements
io.sockets.on('connection', function (socket) {
    console.log("un client est connecté");
    // console.log(socket);

    socket.emit('monsocket', { hello: "world" });
  // socket.on('vote', function(msg){
  //   votes[msg.vote-1].votes++;
  //   io.sockets.emit('votes', { votes: votes });
  // })
});


// Twitter
var twitter = new Twitter({
  consumer_key: 'BnCnYT8WwUzbJBVFIOEuw96Wa',
  consumer_secret: 'MohDuyxuqKy0URCHfZIyuyHJgna1n19XlT1jpRsuCwcFKEXOjQ',
  access_token_key: '905686238056906752-eMMp715HVOOS4j2LbDmrwOrNoEoWfrE',
  access_token_secret: 'rJpDcvgVFcGliMllRa2iMQ4zoMbDRAnHVmysPr4GpKL0i'
});

twitter.stream('statuses/filter', { track: '#javascript' },
    function(stream) {

        stream.on('data', function( tweet ) {
            var tweet_id = tweet.id_str;
            var tweet_text = tweet.text;
            console.log(tweet_text);
        });

        stream.on('error', function ( error ) {
            console.error(error);
        });

    });
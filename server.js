import saveToken from './utils/save-token.js';

const PORT = process.env.PORT ?? 8000

import express from 'express';
import request  from 'request';
import { randomBytes } from 'crypto';
import cors from 'cors';
import { stringify } from 'querystring';
import cookieParser from 'cookie-parser';

var client_id = '4d04436e43634f5f826da6ea080859fe'; 
var client_secret = '3b7bcb5f7559444e95b1d960cff77ff7'; 


const generateRandomString = (length) => {
  return randomBytes(60)
  .toString('hex')
  .slice(0, length);
}

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static('public'))

app.use(express.static('/public'))
  .use(cors())
  .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  var scope = 'user-read-private user-read-email playlist-read-private user-top-read ugc-image-upload  user-library-read playlist-modify-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });
        res.cookie('token', access_token)

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
          saveToken(access_token)
        } else {
        res.redirect('/#' +
          stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});




app.get('/refresh_token', function(req, res) {

  var refresh_token = 'AQAISUwYc7WFuRRISanhHjq9hLir7S1V4WjToX1NFeWI89hYZUxie1LQhbKWe6CFLhCgVmo4Ax8lG-PyEutUYB3NwIu104d5c686a7LxvRHl7zeuvo18C5HbUEBvAT9QgCc';
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) 
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
          refresh_token = body.refresh_token;
      res.send({
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    }
  });
});



app.listen(PORT, (req,res) => {
  console.log(`App listening in \n http://localhost:${PORT}`);
});


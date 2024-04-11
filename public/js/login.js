// Open the auth popup
var spotifyLoginWindow = window.open('https://accounts.spotify.com/authorize?client_id=REPLACE_ME&redirect_uri=REPLACE_ME&response_type=code');

// Close event
spotifyLoginWindow.onbeforeunload = function() {
  var accessToken = localStorage.getItem('sp-accessToken');
  var refreshToken = localStorage.getItem('sp-refreshToken');

  // use the code to get an access token (as described in the documentation)
};

// Assuming here that the server has called /api/token
// and has rendered the access/refresh tokens in the document
var accessToken = "xxx";
var refreshToken = "xxx";
/////////////////////////

// Store the tokens
localStorage.setItem("sp-accessToken", accessToken);
localStorage.setItem("sp-refreshToken", refreshToken);

// Close the popup
window.close();
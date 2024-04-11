import {accessToken} from './saved-token.js'


const form = document.querySelector('.form')
const playInput = document.querySelector('.playInput')
const submit = document.querySelector('.submit')
const playlists = document.querySelector('.playlists')


form.addEventListener('submit', async (e) => {
  e.preventDefault()
  if(playInput.value){
    const nameInput = playInput.value
    playInput.value = ''  

    const userPlaylists = await getUserPlaylist(accessToken)

    const filteredByPlaylistName = userPlaylists.filter(element=> {
      return element.name == nameInput
    })

    const dataInThePlaylist = await getPlaylistItems(accessToken, filteredByPlaylistName)


    const getArtistsInPL = dataInThePlaylist.map((element) => {
      return element.track.artists[0].name
    })

    const artistsInput = 'Calmadò'

    const getMusic = dataInThePlaylist.filter(element => {
      return element.track.artists[0].name == artistsInput
    })

    console.log('Some artists in this pl');
    console.log(getArtistsInPL);



// <3
  }
})



async function getPlaylistItems(InsertAccessToken, playlistInfo ){
  try{
    const playlistID = playlistInfo[0].id
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=50&offset=5`, {
      headers:{
        Authorization: 'Bearer ' + InsertAccessToken
      }
    })
    return response.data.items

  }
  catch(e){
    console.log(e);
  }
}

async function createPlaylist(InsertAccessToken){
  try{
    const data = await axios.post('https://api.spotify.com/v1/users/2126enqo2356up46fiz7nx7iq/playlists', 
    {
      "name": "Test Playlist",
      "description": "New playlist description",
      "public": false
  }, {
    headers: {
      'Content-Type': 'application/application/json',
      Authorization: 'Bearer' + InsertAccessToken
    }
})

  console.log(data);



  }catch(e){
    console.log(e);
  }
}
// createPlaylist(accessToken)


// Get user playlist and insert in the html
async function getUserPlaylist(InsertAccessToken){
  try{
    const response = await axios.get('https://api.spotify.com/v1/me/playlists?limit=10&offset=0', {
      headers:{
        Authorization: 'Bearer ' + InsertAccessToken
      }
    })
    return response.data.items

  }catch(e){
    console.log(e);
  }
}
async function insertHtml(InsertAccessToken){
  const data = await getUserPlaylist(InsertAccessToken)
  const htmlItem = data.map(element => {
    return `
    <div class="playlistItem">
      <h1>${element.name}</h1>
      <h3>${element.id}</h3>
      <img src="${element.images[0].url}" alt="">
      <div></div>
    </div>`
  }).join('') 

  playlists.insertAdjacentHTML('beforeend', htmlItem)
}insertHtml(accessToken)


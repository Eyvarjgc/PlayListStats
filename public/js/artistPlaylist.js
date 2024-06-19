function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); 
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}
const accessToken = ' '  + getCookie('token')


// DEVELOPER
// import {accessToken} from './saved-token.js'

import {imgFile} from './defaultImageEncoded.js'


const form = document.querySelector('.form')
const playInput = document.querySelector('.playInput')
const submit = document.querySelector('.submit')
const playlists = document.querySelector('.playlists')
const artistsInput = document.querySelector('.artistsInput')
const artistForm = document.querySelector('.artistForm')
const playlistName = document.querySelector('.playlistName')
const artistModal = document.querySelector('.artist-modal')
const closeModal = document.querySelector('.close-modal')
const artistContainer = document.querySelector('.artist-container')


// GET PLAYLIST TRACKS
async function getPlaylistItems(InsertAccessToken, playlistInfo ){
  try{
    const playlistID = playlistInfo[0].id
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=50&offset=0`, {
      
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

// CREATE PL
async function createPlaylist(InsertAccessToken , uris, playlistName){
  try{
    const clientID = ''
    const data = await axios.post(`https://api.spotify.com/v1/users/2126enqo2356up46fiz7nx7iq/playlists`, 
    {
      "name": `${playlistName}`,
      "description": "New playlist description",
      "public": false
  }, {
    headers: {
      'Content-Type': 'application/application/json',
      Authorization: 'Bearer' + InsertAccessToken
    }
})

  updateCoverImgPlaylist(InsertAccessToken, data.data.id)
  addTracksToPlaylist(InsertAccessToken, uris, data.data.id)
  
  alert('Playlist created')
  }catch(e){
    console.log(e);
  }
}


// ADD THE TRACKS USING THE URIS TO A NEW PLAYLIST
async function addTracksToPlaylist(InsertAccessToken, uris, playlistID){
  try{
    const tracksToAdd = uris
    const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, 
    {
      "uris": tracksToAdd
        
        
    
    }, {
      headers:{
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + InsertAccessToken
      }
    })




  }catch(e){
    console.log(e);
  }

}


// UPDATE THE IMAGE OF THE PLAYLIST TO ONE DEFAULT IMG 
async function updateCoverImgPlaylist(InsertAccessToken, playlistId ){
  try{
  
    const response = await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}/images`, imgFile
      , {
      headers:{
        'Content-Type': 'image/jpeg',
        Authorization: 'Bearer' + InsertAccessToken
            }
    })




  }catch(e){
    console.log(e);
  }

}


// GET USER PLAYLISTS AND INSERT INTO THE HTML
async function getUserPlaylist(InsertAccessToken){
  try{
    const response = await axios.get('https://api.spotify.com/v1/me/playlists?limit=20&offset=0', {
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
    <div class="playlistItem" >
      <img src="${element.images[0].url}" alt="" class="playlistItem-Img" data-name="${element.name}">
      <h1 class="playlistItem-name">${element.name}</h1>

    </div>`
  }).join('') 

  playlists.insertAdjacentHTML('beforeend', htmlItem)


}


function htmlModal(artist){

    const items = artist.map(element => {
      return `<div class="artist"  data-artist="${element}">
      <p class="artist-name">${element}</p>

      </div>`
    }).join('')
    
    artistContainer.insertAdjacentHTML('beforeend', items)



}


async function htmlCode(InsertAccessToken){
  try{
    
    await insertHtml(InsertAccessToken)
    const playlistItemImg = document.querySelectorAll('.playlistItem-Img');
    playlistItemImg.forEach(element => {
      element.addEventListener('click', async(e) => {
        artistModal.classList.remove('modal-disable')
        const nameInput = e.srcElement.dataset.name

        const userPlaylists = await getUserPlaylist(accessToken)

        const filteredByPlaylistName = userPlaylists.filter(element=> {
          return element.name == nameInput

          
        })
  
        const dataInThePlaylist = await getPlaylistItems(accessToken, filteredByPlaylistName)

        const getArtistsInPL = dataInThePlaylist.map((element) => {
          return element.track.artists[0].name
        })

        let uniqueArtist = [...new Set(getArtistsInPL)]



        await htmlModal(uniqueArtist)
        const artist = document.querySelectorAll('.artist');


        artist.forEach(element => {
          element.addEventListener('click', (i) => {
            const artistInput =  i.srcElement.innerText
            const getMusic = dataInThePlaylist.filter(element => {
              return element.track.artists[0].name == artistInput
            })
            const tracksUris = getMusic.map(element => {
              return element.track.uri
            })


            createPlaylist(accessToken, tracksUris, artistInput + ' PL')
          })


        });


      })
    });



    closeModal.addEventListener('click', () => {
      artistModal.classList.add('modal-disable')
      artistContainer.textContent = ''
    })
  }catch(e){
    console.log(e);
  }

}

htmlCode(accessToken)





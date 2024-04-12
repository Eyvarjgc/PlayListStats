import {accessToken} from './saved-token.js'
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


// form.addEventListener('submit', async (e) => {
//   e.preventDefault()
//   if(playInput.value){
//     const nameInput = playInput.value
//     playInput.value = ''  

//     const userPlaylists = await getUserPlaylist(accessToken)

//     const filteredByPlaylistName = userPlaylists.filter(element=> {
//       return element.name == nameInput
//     })

//     const dataInThePlaylist = await getPlaylistItems(accessToken, filteredByPlaylistName)


//     const getArtistsInPL = dataInThePlaylist.map((element) => {
//       return element.track.artists[0].name
//     })
//     console.log('Some artists in this pl');
//     console.log(getArtistsInPL);

//     artistForm.addEventListener('submit', (e) => {
//       e.preventDefault()
//       if(artistsInput.value){
//         const artistsInputValue = artistsInput.value
  
//         const getMusic = dataInThePlaylist.filter(element => {
//           return element.track.artists[0].name == artistsInputValue
//         })
    
//         const tracksUris = getMusic.map(element => {
//           return element.track.uri
//         })
        
//         console.log(tracksUris);
        
  
//         console.log('Artist`s music ');
//         console.log(getMusic);
//         createPlaylist(accessToken, tracksUris, playlistName.value)
//         // addTracksToPlaylist(accessToken, tracksUris, )
//         // playlistID
    

//       }

//     })


//   }
// })




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
  
  }catch(e){
    console.log(e);
  }
}


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

    console.log(response);



  }catch(e){
    console.log(e);
  }

}


async function updateCoverImgPlaylist(InsertAccessToken, playlistId ){
  try{
  
    const response = await axios.put(`https://api.spotify.com/v1/playlists/${playlistId}/images`, imgFile
      , {
      headers:{
        'Content-Type': 'image/jpeg',
        Authorization: 'Bearer' + InsertAccessToken
            }
    })

    console.log(response);



  }catch(e){
    console.log(e);
  }

}

// Get user playlist and insert in the html
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
insertHtml(accessToken).then(() => {
  const playlistItemImg = document.querySelectorAll('.playlistItem-Img');

  playlistItemImg.forEach(element => {
    element.addEventListener('click', async(e)=>{
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

      // console.log(filteredByPlaylistName);
      // console.log(dataInThePlaylist);

      console.log(getArtistsInPL);



    })
  });

  closeModal.addEventListener('click', () => {
    artistModal.classList.add('modal-disable')
  })
});

function htmlModal(){
  const htmlItem = data.map(element => {
    return `
    <div class="playlistItem" >
      <img src="${element.images[0].url}" alt="" class="playlistItem-Img" data-name="${element.name}">
      <h1 class="playlistItem-name">${element.name}</h1>

    </div>`
  }).join('') 
// REALIZAR EL CODIGO DEL MODAL
  playlists.insertAdjacentHTML('beforeend', htmlItem)
}

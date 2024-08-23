
// DEVELOPER
// import {accessToken} from './saved-token.js'


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
const accessToken = getCookie('token')


async function getProfileInfo(accessToken){
  try{
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers:{
        Authorization: 'Bearer ' + accessToken
      }
    })
    const name = response.data.display_name
  
    // console.log(response.data);
    return name
  }catch(err){
    console.error(err);
  }
}


async function getTrack(accessToken, range){
  try{
    const containerItem = document.querySelector('.containerItems')
    containerItem.textContent = ''
    const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=3`, {
      headers:{
        Authorization: 'Bearer ' + accessToken
      }
    })
    const items = response.data.items

    const itemsMap = items.map(Element => {
      const trackName = Element.name
      
      return  `        
      <div class="containerItem">
        <img src="Images/Spotify_Icon_RGB_Green.png" alt="Spotify icon" style="width: 25px;">
        <figure>  
          <img src="${Element.album.images[0].url}" alt="">
        </figure>
        <h1>${Element.name}</h1>

      </div>`
    }).join('')
    containerItem.insertAdjacentHTML('beforeend', itemsMap)

    console.log(response.data.items);

  }catch(e){
    console.log(e);
  }
}


getProfileInfo(accessToken)
getTrack(accessToken, 'short_term')

const songsTime = document.querySelector('.selectOptions')

songsTime.addEventListener('change', e => {
  const value = e.target.value
  getTrack(accessToken, value)



})

















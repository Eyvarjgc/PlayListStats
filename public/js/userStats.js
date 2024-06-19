
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
const userName = document.querySelector('.userName')
const userImg = document.querySelector('.userImg')
const showType = document.querySelector('.showType')
const showRange = document.querySelector('.showRange')

      const musicItems = document.querySelector('.musicItems')


async function getProfileInfo(accessToken){
  try{
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers:{
        Authorization: 'Bearer ' + accessToken
      }
    })
    const name = response.data.display_name
    userName.innerHTML = name
    userImg.src = response.data.images[1].url
  }catch(err){
    console.error(err);
  }
}
getProfileInfo(accessToken)

// Obtener Top canciones
async function getTracks(accessToken,range){
  try {
    musicItems.innerHTML = ''



    const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=10`, {
      headers:{
        Authorization: 'Bearer ' + accessToken
      }
    })
    const items = response.data.items

    const itemsMap = items.map(Element => {
      return  `        
      <li class="song">
        <picture>
              <img src="${Element.album.images[0].url}" alt="" class="songImg">
        </picture>
        <div>
          <h3>${Element.name}</h3>
          <p>${Element.artists[0].name}</p>
        </div>
      </li>`
    }).join('')
    musicItems.insertAdjacentHTML('beforeend', itemsMap)
    showType.innerHTML = 'Tracks'
    if(range == 'short_term'){
      range = '4 weeks'
    }
    else if(range == 'medium_term'){
      range = '6 months'

    }
    else if(range == 'long_term'){
      range = '1 year'

    }
    showRange.innerHTML = range


    
  } catch (error) {
    console.log(error);
  }
}

// Obtener Top Artistas
async function getArtist(accessToken,range){
  try {
    musicItems.innerHTML = ''

    const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${range}&limit=10`, {
      headers:{
        Authorization: 'Bearer ' + accessToken
      }
    })
    const items = response.data.items

    const itemsMap = items.map(Element => {
      return  `        
      <li class="song">
        <picture>
              <img src="${Element.images[0].url}" alt="artistImg" class="songImg">
        </picture>
        <div>
          <h3>${Element.name}</h3>
        </div>
      </li>`
    }).join('')
    musicItems.insertAdjacentHTML('beforeend', itemsMap)
    showType.innerHTML = 'Artists'
    if(range == 'short_term'){
      range = '4 weeks'
    }
    else if(range == 'medium_term'){
      range = '6 months'

    }
    else if(range == 'long_term'){
      range = '1 year'

    }
    showRange.innerHTML = range
    
  } catch (error) {
    console.log(error);
  }
}





let currentView = null; 

async function handleTimeButtons(accessToken) {
  const timeButtons = document.querySelectorAll('.timeButtons');
  timeButtons.forEach(element => {
    element.addEventListener('click', e => {
      const timeRange = e.target.value;
      if (currentView === 'tracks') {
        console.log('Fetching tracks', timeRange);
        getTracks(accessToken, timeRange);
      } else if (currentView === 'artists') {
        console.log('Fetching artists', timeRange);
        getArtist(accessToken, timeRange);
      }
    });
  });
}

const optionButtons = document.querySelectorAll('.optionButtons');
optionButtons.forEach(element => {
  element.addEventListener('click', e => {
    const value = e.target.value;
    console.log(value);

    currentView = value; // Update the state variable

    if (value === 'tracks') {
      getTracks(accessToken, 'short_term');
    } else if (value === 'artists') {
      getArtist(accessToken, 'short_term');
    } else {
      console.log('!');
    }
  });
});

handleTimeButtons(accessToken);

import {accessToken} from './saved-token.js'




// const accessToken = 'BQBKV8X4gbPmx2Je1bvGa7WIZK1RfyGqhdM5zSL0XSARDwsJiuVYTYNuByJP5bLabXgXcBvesBImFNG8IKh5iucS-o3pHnUiBlsQMxceHdee5zUtTtcXt6VQojaD4y3-7QN1YyuPnWpUXfyGOLSflZvtWYImHi0_u2zOvO0BgrRq4P2jReoO93S5Kt8jqj5d9UTs3X3i4UnW0TUn79Fak98ISeIXZoqN78of9YAdgM0xfsbJ-_ccz_NMmqeNUoFdVCP_4Lx4WSQbLg '

// async function loadAccessToken()
//   try{
//     const response = await axios.get('../../utils/saved-token.js')

//     console.log(await response);


//   }catch(e){
//     console.log(e);
//   }
// }
// loadAccessToken()

async function getProfileInfo(accessToken){
  try{
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers:{
        Authorization: 'Bearer ' + accessToken
      }
    })
    const name = response.data.display_name
  
    console.log(response.data);
    return name
  }catch(err){
    console.error(err);
  }
}




async function getTrack(accessToken){
  try{
    const containerItem = document.querySelector('.containerItems')

    const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=3', {
      headers:{
        Authorization: 'Bearer ' + accessToken
      }
    })
    const items = response.data.items

    const itemsMap = items.map(Element => {
      return  `        
      <div class="containerItem">
        <h1>${Element.name}</h1>
        <figure>
          <img src="${Element.album.images[0].url}" alt="">
        </figure>
      </div>`
    }).join('')
    containerItem.insertAdjacentHTML('beforeend', itemsMap)

    console.log(response.data.items);

  }catch(e){
    console.log(e);
  }
}


getProfileInfo(accessToken)
getTrack(accessToken)




















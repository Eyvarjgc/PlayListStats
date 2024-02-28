

const urlLink =


'https://api.spotify.com/v1/me/top/artists'



// const axios = require('axios')
const getTrack = async() => {
    const authOptions = {
        url:urlLink,
        headers: {
            'authorization': 'Bearer BQCP2zs9DUetRZitUXDN-0iylx0dTDZ-7-KjApVVbFb12C3-c8asRFBkOetACQmV8VYpINTWW_qvx1tezalvjKbVOYcKSjpMas662_bxsYPpxmNc4LHDeus-odMbgEKOj4XaJKeOoSXFA5tISmqFI3Ls-uEzNl6OTpXW__Wd6SEgnWbKEyYJGBdvpZQL23N7NeMthqh2h02JMZ4Rdg6lgQ'

        }
    }
    try{
        const response = await axios.get(authOptions.url, {
            headers: authOptions.headers
        })

        console.log(`---DATOS---`);
        console.log(response.data);


    }catch(err){console.log(err);}

    
}
// getTrack()




























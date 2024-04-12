import axios  from 'axios';

async function getEncoderImg(){
  try{
    const response = await axios.get('https://i.pinimg.com/564x/50/ef/98/50ef98ff7c1d5baadc1941388ca788d7.jpg', { responseType: 'arraybuffer' })
    let base64Image = `data:${response.headers['content-type']};base64,` + Buffer.from(response.data).toString('base64');
    
    console.log(base64Image);
    return base64Image





  }catch(e){
    console.log(e);
  }
}
getEncoderImg()
export default getEncoderImg
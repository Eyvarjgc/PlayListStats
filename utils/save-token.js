import fsPromises from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { writeFile, readFileSync } from 'node:fs'



async function saveToken(data){
  try{
  const basePath = resolve()
  const joinPath = join(basePath, 'public', 'js')
  const dataToSave = `export const accessToken = ' ${data} '  `
  writeFile(join(joinPath, 'saved-token.js'), dataToSave, (err) => {
    if(err){
      console.log(err);
    }
    else{
      console.log('Token guardado');
    }
  })

  
  }catch(err){
    console.log(err);
  }

}

async function readToken(){
  try{
  const basePath = resolve()
  const joinPath = join(basePath, 'utils')

  const readTokenFile = await readFileSync(join(joinPath, 'saved-token.js'))
  console.log(readTokenFile);

  
  }catch(err){
    console.log(err);
  }

}

// readToken()
export default saveToken 
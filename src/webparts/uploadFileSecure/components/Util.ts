import jsZip from 'jszip'

export async function validateZip(blob:Blob) {
  try {
    const zip = await jsZip.loadAsync(blob);
    console.log("ZIP file is valid. Contents:", Object.keys(zip.files));
  } catch (error) {
    console.error("Invalid ZIP file:", error);
  }
}

export const writeToFile = (text:any, fileName:string) => {
    let textFile:any = null;
    const makeFile = (text:any) => {
      const data = new Blob([text], {type: 'application/zip',});
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }
      textFile = window.URL.createObjectURL(data);
      return textFile;
    };
    const link = document.createElement('a');
    link.setAttribute('download', fileName);
    link.href = makeFile(text);
    link.click();
  };
  
export const ReadFileToBase64=(ff:File):Promise<string>=>{
  return new Promise((resolve,reject)=>{
    const freader=new FileReader();
    freader.readAsDataURL(ff);
    freader.onload= () => resolve((freader.result as string)?.split(',')[1] ) ;
    freader.onerror=(err)=>reject(err);
  })
}

export const readFileInArrayBuffer=(ff:File):Promise<ArrayBuffer>=>{
  return new Promise((resolve,reject)=>{
    const freader=new FileReader();
    freader.readAsArrayBuffer(ff);
    freader.onload= () => resolve(freader.result as ArrayBuffer ) ;
    freader.onerror=(err)=>reject(err);
  })
}

export function streamFileAsBlob(file:File) {
  const blob = new Blob([file], { type: file.type });
  console.log("Blob for streaming:", blob);
  return blob;
}

export const unzipfile=(file:File|Blob)=>{
  jsZip.loadAsync(file)
  .then(zip=>{
    Object.keys(zip.files).forEach(function (filename) {
      zip.files[filename].async('string').then( (fileData)=> {
        console.log(fileData) // These are your file contents      
      }).catch(console.log)
    })
  }).catch(console.log)
}

export const printBytes=(buff:ArrayBuffer)=>{
  const array=new Uint8Array(buff);
  const bstr = String.fromCharCode.apply(null,array);
  console.log('>>> bytes ::',array);
}
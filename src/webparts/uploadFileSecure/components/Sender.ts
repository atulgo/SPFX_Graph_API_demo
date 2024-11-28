import UploadFileSecure, { apiurl } from "./UploadFileSecure";
import { ReadFileToBase64 } from "./Util";

export const Onclick=async (e:any,UF:UploadFileSecure)=>{
    fetch(apiurl,{method:'POST',headers:{'content-type':'application/zip'/*,'content-encoding':'none'*/},
      body:UF.state.FileContent 
    }).then(x=>x.json()).then(console.log).catch(console.log)
}

export const   onFileChange=async(e:React.ChangeEvent<HTMLInputElement>,UF:UploadFileSecure)=>{
    let file:File;
    if(e.target.files){
      file=e.target.files[0];
      console.log("default type :",file.type);
      const blob = new Blob([file], { type:  "text/plain; charset=utf-8" });
      // const blob = new Blob([file], { type: file.type });
      UF.setState({
        FileContent:blob
        ,FileName:file.name
      });
    }
}
  
export const  onFileChange_blob=async(e:React.ChangeEvent<HTMLInputElement>,UF:UploadFileSecure)=>{
    let file:File;
    if(e.target.files){
      file=e.target.files[0];
      const blobb:Blob = new Blob([file], { type: file.type });
      UF.setState({
        FileContent:blobb
        ,FileName:file.name
      });
    }
}
  
export const onFileChange_convert_to_base64=async(e:React.ChangeEvent<HTMLInputElement>,UF:UploadFileSecure)=>{
    let file:File;
    if(e.target.files){
      file=e.target.files[0];
      const fileBase64:string=await ReadFileToBase64(file);
      console.log('base64',fileBase64);
      UF.setState({
        FileContent:fileBase64
        ,FileName:file.name
      });
    }
}

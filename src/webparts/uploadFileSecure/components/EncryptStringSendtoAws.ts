import { encryptData } from "./CryptoSpfx";
import UploadFileSecure, { apiurl } from "./UploadFileSecure";

export const handleclick=(UF:UploadFileSecure):void=>{
    const msg = UF.state.TextToBeSend|| "hello world";
    encryptData(msg).then(encryptedMsg=>{
        console.log('encryptedMsg:',encryptedMsg)
        return fetch(apiurl,{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:encryptedMsg
        })
    }).then(x=>x.json())
    .then(rep=>{
        console.log('reply:',rep);
        UF.setState({UserMessage:rep.decrypted})
    })
    .catch(console.log)
}

export const onTextInputChange=(e:React.ChangeEvent<HTMLInputElement>,UF:UploadFileSecure):void=>{
    UF.setState({TextToBeSend:e.target.value})
}
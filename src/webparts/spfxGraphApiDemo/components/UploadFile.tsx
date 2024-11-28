import * as React from 'react';
import SpfxGraphApiDemo from './SpfxGraphApiDemo';

const upfile=(SG:SpfxGraphApiDemo)=>{
    const url='https://rn5spkg241.execute-api.us-east-1.amazonaws.com/dev/uploadfile'
    fetch(url,{
        method:'POST',
        body:JSON.stringify({
            "file_name":"test_111",
            "file_content":"sno,title\n1,val2\n"
        }),
        headers:{
            "content-type":"application/json",
            "authorization":"Bearer "+SG.state.AccessToken
        }
    }).then(x=>x.json()).then(resp=>{
        console.log('fetch resp:',JSON.stringify(resp));
    }).catch(console.log)
}

const doupload=(SG:SpfxGraphApiDemo)=>{
    if(!SG.state.AccessToken|| SG.state.AccessToken==='' ){
        SG.props.context.aadTokenProviderFactory
        .getTokenProvider()
        .then(provider=>provider.getToken("api://850f8235-7ccd-4bf8-9bd5-fcd799d805f1/entraid.oidc"))
        .then(token=>{
            console.log('>>>>>>> access token',token);
            SG.setState(
                {AccessToken:token}
                ,()=>upfile(SG)
            );
        }).catch(error => console.log(error));
    }else{
        console.log('token exists',SG.state.AccessToken);
        upfile(SG);
    }
}

export const UploadFile=(SG:SpfxGraphApiDemo):JSX.Element=><div style={{"margin":"4em"}}>
        <input type='file'  />
        <button onClick={()=>doupload(SG)}>Upload</button>
    </div>

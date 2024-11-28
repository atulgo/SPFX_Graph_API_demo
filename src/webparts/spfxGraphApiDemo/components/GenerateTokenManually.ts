import SpfxGraphApiDemo from "./SpfxGraphApiDemo";

export const doGetToken=(SG:SpfxGraphApiDemo ,AuthCode:string)=>{
    fetch(SG._TokUrl,{method:'POST'
      ,body: SG._TokReqbody
      ,headers:{"Content-Type": "application/x-www-form-urlencoded"}
      // ,body:getTokreqbody(AuthCode) 
      // ,headers:{"Content-Type": "application/json"}
    }).then(res=>res.json())
    .then(res=>console.log('res:',res))
    .catch(error => console.log(error));
}

export const GetAccessToken=(SG:SpfxGraphApiDemo):void=>{
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('code')!==null){
      const AuthCode:string= (searchParams.get('code')||'');
      console.log('Auth code :',AuthCode)
      doGetToken(SG,AuthCode);
    }
}

export const Authorize=(SG:SpfxGraphApiDemo):void=>{
    window.location.href = SG.authUrl;
  }


export const  getTokreqbody=(AuthCode:string)=>{
    return JSON.stringify({
        "client_id":"850f8235-7ccd-4bf8-9bd5-fcd799d805f1",
        "scope":"Sites.ReadWrite.All",
        "code": AuthCode,
        "redirect_uri": "https://4zh1xz.sharepoint.com/",
        "grant-type":"client_credentials",
        // "client_secret":"gPc8Q~g46k2Vt5aQUaLhpgm1pDCCm1TC3oRBjaPy",
        "resource":"https://graph.microsoft.com/",
    });
}


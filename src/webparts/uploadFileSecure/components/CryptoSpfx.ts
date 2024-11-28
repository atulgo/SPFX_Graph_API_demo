// const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy3Xo3U13dc+xojwQYWoJLCbOQ5fOVY8LlnqcJm1W1BFtxIhOAJWohiHuIRMctv7dzx47TLlmARSKvTRjd0dF92jx/xY20Lz+DXp8YL5yUWAFgA3XkO3LSJgEOex10NB8jfkmgSb7QIudTVvbbUDfd5fwIBmCtaCwWx7NyeWWDb7A9cFxj7EjRdrDaK3ux/ToMLHFXVLqSL341TkCf4ZQoz96RFPUGPPLOfvN0x66CM1PQCkdhzjE6U5XGE964ZkkYUPPsy6Dcie4obhW4vDjgUmLzv0z7UD010RLIneUgDE2FqBfY/C+uWigNPBPkkQ+Bv/UigS6dHqTCVeD5wgyBQIDAQAB
// -----END PUBLIC KEY-----`;

const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtB+xNNwV/3w/0M0Jjqdw
sw7NhVUDWgZytu++rtXZaioQ8J4F0eqQKfVMPhoDRD18Q4zurfFYhxOKeAQqx99Q
R68QPTfS/ekoNiShYWzKkhNv5LD/FcnKFjOy/KNYYwA7wbfIFSqg7GB5Wm0mLzmX
1+Qmb05z9FOSTxLxo1ZTQ6lnnn025PV/h2qprFHD8Fh3/D+Un0gemmKbsNOlizKT
M3GXq5itmEpZr0nvBF2QKiyeWoeumLTB5VyD4p5RRlIGztmSR5kGlamKxmR4RtHt
HGvyO6rJoXDhGZ6jdpubpaYyaxUg+2+SBE5zfqWA3Tm9jGyxBF/6XGHAc6uvKeQR
mQIDAQAB
-----END PUBLIC KEY-----`

function str2ab(str:string):ArrayBuffer {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function importRsaKey(pem:string):Promise<CryptoKey> {
  const binaryDer = str2ab(atob(pem.split('\n').slice(1, -1).join('')));
  return window.crypto.subtle.importKey(
    "spki",
    binaryDer,
    {name: "RSA-OAEP", hash: "SHA-256", },
    true,
    ["encrypt"],
  );
}

export const encryptData=async (msg:string):Promise<string>=>{
    const encrypted:ArrayBuffer = await window.crypto.subtle.encrypt(
        {name: "RSA-OAEP"},
        await importRsaKey(pemEncodedKey),
        new TextEncoder().encode(msg)
    );
    const uint8Arr:Uint8Array   = new Uint8Array(encrypted)
    const tmpStr = String.fromCharCode(...uint8Arr );
    return btoa(tmpStr);  
}


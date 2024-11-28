// import { ConfidentialClientApplication } from "@azure/msal-node";
// import SpfxGraphApiDemo from "./SpfxGraphApiDemo";
// import * as React from 'react';
 
 

// // import { PublicClientApplication } from '@azure/msal-browser';
// // import { MsalProvider } from '@azure/msal-react';
//   //import { ConfidentialClientApplication } from "@azure/msal-node";
// // import { msalConfig } from ''
 
// // import * as msal from '@azure/msal-node';
// // import * as express from 'express';
 
// // const {expressjwt: jwt } = require("express-jwt");

// // import  * as jwks from 'jwks-rsa';
// // import  * as jwtAuthz from 'express-jwt-authz';
// // Used to validate JWT access tokens
// //const {expressjwt: jwt } = require("express-jwt");
 

// // Used to make the HTTP GET request to the Graph API
// const https = require('https')

// // MSAL configs fs
// const config = {
//     auth: { 
//       // 'Application (client) ID' of app registration in the Microsoft Entra admin center - this value is a GUID
//       clientId: '18fef2c5-e6ff-4761-a01e-e777ff492f3a',
     
//       // Client secret 'Value' (not the ID) from 'Client secrets' in app registration in Microsoft Entra admin center
//       clientSecret: 'gYj8Q~HIKhWdq8tkDjElg0uaDDAaZigGfIiWiads',
     
//       // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
//       authority: 'https://login.microsoftonline.com/00e2c644-cf3c-4d7a-9cc5-cafe72463bcd'
//     }
//   }

//   export const   GetMSToken=async (SA:SpfxGraphApiDemo)=>{
//     console.log(SA);
//     var client = new ConfidentialClientApplication(config);
//     var request = {
//       scopes: [ 'https://graph.microsoft.com/.default' ]
//     };

//   let response = await client.acquireTokenByClientCredential(request);

// // console.dir(response);
//     // return   <React.StrictMode>
//     //     {/* <MsalProvider instance={msalInstance}>
//     //         <App />
//     //     </MsalProvider> */}
//     // </React.StrictMode>

//   }
// // export const GetMSToken=(SA:SpfxGraphApiDemo)=>{
// //     const msalConfidentialClientApp = new msal.ConfidentialClientApplication(config);
// //      // Initialize Express
// // const app = express()

// // // Add Express middleware to validate JWT access tokens
// // app.use(jwt({
// //   secret: jwks.expressJwtSecret({
// //     jwksUri: config.auth.authority + '/discovery/v2.0/keys'
// //   }),
// //   audience: config.auth.clientId,
// //   issuer: config.auth.authority + '/v2.0',
// //   algorithms: ['RS256']
// // }));

// // // Allow access to the /me endpoint if the provided JWT access token has
// // // the 'user_impersonation' scope.
// // app.get('/me', jwtAuthz(['user_impersonation'], { customScopeKey: 'scp', customUserKey: 'auth' }), (req, res) => {
// //     // Get the user's access token for *this* web API
// //     const authHeader = req.headers.authorization
// //   if(authHeader == undefined) return;
// //     // Required for the on-behalf-of request (access token and scope(s)) to the downstream web API (Microsoft Graph, in this case)
// //     const oboRequest = {
// //       oboAssertion: authHeader.split(' ')[1],
// //       scopes: ['user.read']
// //     }
  
// //     // Obtain an access token for Graph on-behalf-of the user.
// //     // This access token comes from MSAL Node which maintains an in-memory token cache by default.
// //     msalConfidentialClientApp.acquireTokenOnBehalfOf(oboRequest).then((response) => {
// //         if(response == undefined) return;
// //       const options = {
// //         headers: { Authorization: `Bearer ${response.accessToken}` }
// //       }
  
// //       // Perform an HTTP GET request against the Graph endpoint with the access token issued by
// //       // Azure AD on behalf of the user.
// //       https.get('https://graph.microsoft.com/v1.0/me', options, (graphResponse: { on: (arg0: string, arg1: (chunk: any) => void) => void; }) => {
// //          // Upon receiving the response from Microsoft Graph, deliver the output
// //          graphResponse.on('data', function (chunk) {
// //             res.send(chunk)
// //          })
// //       }).end()
// //     })
// //   })
  
// //   app.listen(8080, () => console.log('\nListening here:\nhttp://localhost:8080'))
  

// // }   

 
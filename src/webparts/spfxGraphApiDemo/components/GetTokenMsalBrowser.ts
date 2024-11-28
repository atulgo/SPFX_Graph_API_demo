import { BrowserAuthOptions, Configuration, InteractionRequiredAuthError, PopupRequest, PublicClientApplication } from "@azure/msal-browser";


export async function getTokenPopup(scope:string, account:any,clientId:string ,authority:string) {
    const request = {
        scopes: [scope],
        account:account
    };
    // const request = {scopes: ['api://850f8235-7ccd-4bf8-9bd5-fcd799d805f1']};
    
    const browserAuthOps:BrowserAuthOptions={
        clientId:clientId,
        authority: authority,
        redirectUri: window.location.origin // Use the current page's URL for redirect
    }
    // const browserAuthOps:BrowserAuthOptions={
    //     clientId: "850f8235-7ccd-4bf8-9bd5-fcd799d805f1", // Replace with your Azure AD App's Client ID
    //     authority: "https://login.microsoftonline.com/23eff2d1-89b1-45ae-b476-48cf465542bf", // Replace with your Tenant ID
    //     redirectUri: window.location.origin // Use the current page's URL for redirect
    // }
    
    const msalConfig :Configuration= {
        auth: browserAuthOps,
        cache: {
            cacheLocation: "sessionStorage", // Stores the auth state in session
            storeAuthStateInCookie: true // Recommended for IE11 or Edge
        }
    };
    
    // Create the main MSAL(PublicClientApplication) instance
    // configuration parameters are located at authConfig.js
    const myMSALObj = new PublicClientApplication(msalConfig);

    return await myMSALObj.acquireTokenSilent(request).catch(async (error) => {
        console.log("silent token acquisition fails.");
        if (error instanceof InteractionRequiredAuthError) {
            console.log("acquiring token using popup");
            return myMSALObj.acquireTokenPopup(request).catch(error => {
                console.error(error);
            });
        } else {
            console.error(error);
        }
    });
}

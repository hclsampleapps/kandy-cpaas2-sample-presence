# kandy-cpaas2-sample-presence

### Presence app

This app is used to create a channel between two users via Presence APIs.

 - Try the [demo](https://hclsampleapps.github.io/kandy-cpaas2-sample-presence/app/)
 - Get the [source code](https://github.com/hclsampleapps/kandy-cpaas2-sample-presence)

#### User manual 

1. Create an account on **AT&T** portal via [Register now for a free account](https://apimarket.att.com/signup).
2. Open 2 instances of `index.html` in the browser for *User1* and *User2*.
3. Enter the *server URL*, for e.g.,
	- For AT&T API Marketplace [apimarket.att.com](https://apimarket.att.com), enter `https://oauth-cpaas.att.com`
4. Choose to get accessToken by *Password Grant* flow or *Client Credentials* flow.
5. Login using two different users' credentials in both the browser windows.
6. For **Password Grant** flow, enter 
	- *clientId* 
	- *emailId* 
	- *password*  
7. For **Client Credentials Grant** flow, enter
	- *privateKey*
	- *privateSecret*   
8. Click ***Login***
9. After successful login you will get an *accessToken* for *User1* and *User2*, that is used to send/receive presence of each other.
10. Click ***Subscribe*** button in both the browser windows to create the webrtc channel.
11. Update *User1*'s presence and submit to let your subscribers know about your presence.
12. Enter the *User2*'s User ID into the *User1*'s window under ***Subscribe (watch) user*** ⟶ *UserId(s)* input field; e.g., *username@domain.com*
13. Click on ***Subscribe***/***Unsubscribe*** button to receive (or not) the presence details about the provided user.
14. Enter the *User2*'s User ID into the *User1*'s window under ***Fetch and Get presence*** ⟶ *UserId(s)* input field; e.g., *username@domain.com*
15. Click on **Fetch** button to fetch the presence of the *User2*.
16. Open the *User2*'s browser window and update the presence details and check the *User1*'s brower window for updated presence of *User2*.

##### Notes

 - Existing user can confirm their account via [Log in to AT&T API Marketplace](https://apimarket.att.com/login)
 - You can download *kandy.js* from [Developer documentation - SDKs](https://apimarket.att.com/developer/sdks/javascript)

### Development

To setup the project repository, run these commands

```
git clone https://github.com/hclsampleapps/kandy-cpaas2-sample-presence.git
cd kandy-cpaas2-sample-presence
```

Then, open ```index.html``` in the browser to view the app.

#### Branching strategy

To learn about the branching strategy, contribution & coding conventions followed in the project, please refer [GitFlow based branching strategy for your project repository](https://gist.github.com/ribbon-abku/10d3fc1cff5c35a2df401196678e258a)

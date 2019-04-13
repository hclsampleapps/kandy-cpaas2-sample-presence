# kandy-sample-presence

### Presence app

This app is used to create a channel between two users via Presence APIs.

#### Steps 

1. Create an account on **AT&T** portal via [Register now for a free account](https://apimarket.att.com/signup).
2. After signup get the following 
   - *clientId* 
   - *emailId* 
   - *password*
3. If you are an existing user, please [Log in to AT&T API Marketplace](https://apimarket.att.com/login).
4. Download *kandy.js* from [Developer documentation - SDKs](https://apimarket.att.com/developer/sdks/javascript)
5. Open two instances of ```index.html``` in the browser for *User1* and *User2*.
6. Login using two different user's credentials in both the browser windows.
7. After successful login you will get an *accessToken* for *User1* and *User2*, that is used to send/receive presence of each other.
8. Click **Subscribe** button in both the browser windows to create the webrtc channel.
9. Update *User1*'s presence and submit to let your subscribers know about your presence.
10. Enter the *User2*'s User ID into the *User1*'s window **Subscribe (watch) user UserId(s)** box; e.g., *username@domain.com*
11. Click on **Subscribe/Unsubscribe** button to receive(not) the presence details about the provided user.
12. Enter the *User2*'s User ID into the *User1*'s window **Fetch and Get presence UserId(s)** box; e.g., *username@domain.com*
13. Click on **Fetch** button to fetch the presence of the *User2*.
14. Open the *User2*'s browser window and update the presence details and check the *User1*'s brower window for updated presence of *User2*.

### Development

To setup the project repository, run these commands

```
git clone https://github.com/hclsampleapps/kandy-cpaas2-sample-presence.git
cd kandy-cpaas2-sample-presence
```

Then, open ```index.html``` in the browser to view the app.

#### Branching strategy

To learn about the branching strategy, contribution & coding conventions followed in the project, please refer [GitFlow based branching strategy for your project repository](https://gist.github.com/ribbon-abku/10d3fc1cff5c35a2df401196678e258a)

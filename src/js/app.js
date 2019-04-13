/**
 * CPaaS Presence Demo
 */
var changeView;
var showhideView;
var serverBase;
var mHostUrl;
var client;
const tokenAPI = '/cpaas/auth/v1/token'

whenReady(function() {
    changeView = new ChangeView();
    changeView.showPasswordGrant();
});

class ChangeView {
    constructor() {
        this.accountPasswordGrantView = document.getElementById('passwordID');
        this.accountClientCredentialsView = document.getElementById('clientCredID');

        this.accountPasswordGrantradio = document.getElementById('passwordGrant');
        this.accountPasswordGrantradio.addEventListener('click', (evt) => this.showPasswordGrant(evt));

        this.accountClientCredentialsradio = document.getElementById('clientCred');
        this.accountClientCredentialsradio.addEventListener('click', (evt) => this.showClientCredentials(evt));
    }

    showPasswordGrant() {
        Effect.hide(this.accountClientCredentialsView);
        Effect.show(this.accountPasswordGrantView);
    }

    showClientCredentials() {
        Effect.show(this.accountClientCredentialsView);
        Effect.hide(this.accountPasswordGrantView);
    }
}

function initClient() {
    let mServerUrl = document.getElementById("serverUrl").value;
    mHostUrl = new URL(mServerUrl).host;
    console.log(mHostUrl);
    client = Kandy.create({
        subscription: {
            expires: 3600
        },
        // Required: Server connection configs.
        authentication: {
            server: {
                base: mHostUrl
            },
            clientCorrelator: 'sampleCorrelator'
        }
    })
    // Listen for subscription changes.
    client.on('subscription:change', function() {

        if (
            client.services.getSubscriptions().isPending === false &&
            client.services.getSubscriptions().subscribed.length > 0
        ) {
            log('Successfully subscribed')
        }
    })
    /*
     * Listen for change of subscribed users' presence
     */
    client.on('presence:change', function(presence) {
        // When an event is received, output the users presence.
        log('Presence received for ' + presence.userId)
        log('....Status: ' + presence.status)
        log('....Activity: ' + presence.activity)
        if (presence.note) {
            log('....Note: ' + presence.note)
        }
    })

}

/**
 * Creates a form body from an dictionary
 */
function createFormBody(paramsObject) {
    const keyValuePairs = Object.entries(paramsObject).map(
        ([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)
    )
    return keyValuePairs.join('&')
}

/**
 * Gets the tokens necessary for authentication to CPaaS
 */
async function getTokensByPasswordGrant({
    clientId,
    username,
    password
}) {
    const cpaasAuthUrl = constructServerUrl();
    const formBody = createFormBody({
        client_id: clientId,
        username,
        password,
        grant_type: 'password',
        scope: 'openid'
    })
    // POST a request to create a new authentication access token.
    const fetchResult = await fetch(cpaasAuthUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
    // Parse the result of the fetch as a JSON format.
    const data = await fetchResult.json()
    return {
        accessToken: data.access_token,
        idToken: data.id_token
    }
}
async function loginByPasswordGrant() {
    initClient();
    const clientId = document.getElementById('clientId').value
    const userEmail = document.getElementById('userEmail').value
    const password = document.getElementById('password').value
    try {
        const tokens = await getTokensByPasswordGrant({
            clientId,
            username: userEmail,
            password
        })

        log('Successfully logged in as ' + userEmail)

        client.setTokens(tokens)

    } catch (error) {
        log('Error: Failed to get authentication tokens. Error: ' + error)
    }
}

async function getTokensByClientCredGrant({
    client_id,
    client_secret
}) {

    const cpaasAuthUrl = constructServerUrl();
    const formBody = createFormBody({
        client_id,
        client_secret,
        grant_type: 'client_credentials',
        scope: 'openid regular_call'
    })

    // POST a request to create a new authentication access token.
    const fetchResult = await fetch(cpaasAuthUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    })
    // Parse the result of the fetch as a JSON format.
    const data = await fetchResult.json();

    return {
        accessToken: data.access_token,
        idToken: data.id_token
    }
}

async function loginByClientCred() {
    initClient();
    const privateKey = document.getElementById('privateKey').value
    const privateSecret = document.getElementById('privateSecret').value

    try {
        const tokens = await getTokensByClientCredGrant({
            client_id: privateKey,
            client_secret: privateSecret
        })
        client.setTokens(tokens)
        log('Successfully logged in with project User ' + privateKey)
    } catch (error) {
        log('Error: Failed to get authentication tokens. Error: ' + error)
    }
}

function constructServerUrl() {
    let cpaasUrl;
    let enteredBaseUrl = document.getElementById("serverUrl").value
    if (enteredBaseUrl.trim() !== "") {
        serverBase = enteredBaseUrl.trim()
    }
    cpaasUrl = serverBase + tokenAPI
    return cpaasUrl;
}

function subscribeService() {
    const services = ['presence']
    const subscriptionType = 'websocket'
    client.services.subscribe(services, subscriptionType)
    log('Subscribed to presence service (websocket channel)')
    populateDropdowns();
}

// Utility function for appending messages to the message div.
function log(message) {
    console.log(message);
    document.getElementById('terminal').innerHTML += '<p>' + message + '</p>';
}

// Utility function for clearing the activity messages
function clearActivities() {
    document.getElementById('presence-activity').innerHTML = ''
}

// Helper functions to update the status and activities dropdown controls
function populateDropdownControls(target, values) {
    const selectCtrl = document.getElementById(target)
    selectCtrl.innerHTML = ''
    for (let value in values) {
        for (let opt of selectCtrl.options) {
            if (opt.value === values[value]) {
                selectCtrl.removeChild(opt)
            }
        }
        var opt = document.createElement('option')
        opt.value = opt.text = values[value]
        selectCtrl.appendChild(opt)
    }
}

function populateDropdowns() {
    populateDropdownControls('activitiesDropdown', client.presence.activities)
    populateDropdownControls('statusesDropdown', client.presence.statuses)
}

/*
 *  Update user's Presence.
 */
function updatePresence() {
    const status = document.getElementById('statusesDropdown').value
    const activity = document.getElementById('activitiesDropdown').value
    const note = document.getElementById('note').value
    // Pass in your current availability.
    const myStatus = client.presence.update(status, activity, note)
    log('Presence updated with: ' + status + ', ' + activity + ', ' + note)
}

/*
 *  Subscribe to the presence of the given user(s).
 */
function subscribe() {
    const userIds = document.getElementById('userIdSubscribe').value
    client.presence.subscribe(userIds)
    log('Subscribing to: ' + userIds)
}

/*
 *  Unsubscribe from the presence of the given user(s).
 */
function unsubscribe() {
    const userIds = document.getElementById('userIdSubscribe').value
    client.presence.unsubscribe(userIds)
    log('Unsubscribing from: ' + userIds)
}

/*
 * Fetch (from the server) the presence for the given users. This will update the store with the
 * retrieved values.
 */
function fetchPresence() {
    var userIds = document.getElementById('userIdFetch').value.split(',');
    client.presence.fetch(userIds);
    log('Fetching presence for: ' + userIds)
}

/*
 * Get (from state) the presence for the given user(s)
 */
function getPresence() {
    const userIds = document.getElementById('userIdFetch').value.split(',');
    const presence = client.presence.get(userIds)
    for (let i = 0; i < presence.length; i++) {
        log('Presence for ' + presence[i].userId)
        log('....Status: ' + presence[i].status)
        log('....Activity: ' + presence[i].activity)
        if (presence[i].note) {
            log('....Note: ' + presence[i].note)
        }
    }
}
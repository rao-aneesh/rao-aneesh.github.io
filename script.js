const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const statusText = document.getElementById('status');

// 1. Listen for messages BACK from Android
// The object name 'myAndroidTarget' is defined in your Android Java/Kotlin code
if (window.myAndroidTarget) {
    window.myAndroidTarget.onmessage = function(event) {
        statusText.innerText = "Received from App: " + event.data;
    };
}

// 2. Send messages TO Android
sendBtn.addEventListener('click', () => {
    const msg = messageInput.value;

    if (window.myAndroidTarget) {
        window.myAndroidTarget.postMessage(msg);
        statusText.innerText = "Status: Sent '" + msg + "'";
    } else {
        statusText.innerText = "Status: Error - myAndroidTarget not found!";
        console.error("WebMessageListener object not injected.");
    }
});

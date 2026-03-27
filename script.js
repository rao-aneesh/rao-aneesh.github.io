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

// Listen for messages sent from the Android app via postWebMessage
window.addEventListener('message', function(event) {
    console.log(event);

    console.log("Message received from Android native:", event.data);
    
    // Update the UI to show the message
    const statusText = document.getElementById('status');
    statusText.innerText = "Native App says: " + event.data;
});

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

const downloadBtn = document.getElementById('downloadBtn');
const sizeInput = document.getElementById('sizeInput');
const storageStatus = document.getElementById('storageStatus');

downloadBtn.addEventListener('click', async () => {
    const sizeInMB = parseFloat(sizeInput.value);
    if (isNaN(sizeInMB) || sizeInMB <= 0) return alert("Enter a valid size");

    storageStatus.innerText = `Generating ${sizeInMB}MB of data...`;

    // Create a large string (1 char = ~2 bytes in UTF-16, so we adjust)
    const dataSize = sizeInMB * 1024 * 1024;
    const dummyData = "x".repeat(dataSize);

    try {
        // Using the Cache API to store the "download"
        const cache = await caches.open('webview-size-test');
        const response = new Response(dummyData);
        await cache.put(`/test-data-${Date.now()}`, response);
        
        storageStatus.innerText = `Success: Added ${sizeInMB}MB to cache.`;
    } catch (e) {
        storageStatus.innerText = `Error: ${e.message}`;
        console.error("Storage failed:", e);
    }
});

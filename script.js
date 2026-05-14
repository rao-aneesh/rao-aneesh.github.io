/**
 * Configuration & Data
 */
const sites = [
    "https://www.google.com",
    "https://www.github.com",
    "https://www.wikipedia.org",
    "https://www.apple.com",
    "https://www.android.com"
];

/**
 * Element Selectors
 */
const sendBtn = document.getElementById('sendBtn');
const downloadBtn = document.getElementById('downloadBtn');
const redirectBtn = document.getElementById('redirectBtn');
const messageInput = document.getElementById('messageInput');
const sizeInput = document.getElementById('sizeInput');
const storageStatus = document.getElementById('storageStatus');
const statusText = document.getElementById('status');

/**
 * 1. Navigation Logic (Dialog + Redirect)
 */
if (redirectBtn) {
    redirectBtn.addEventListener('click', () => {
        // Select a random URL from the array
        const destination = sites[Math.floor(Math.random() * sites.length)];

        // Show the browser dialog box
        const userConfirmed = confirm(`Would you like to leave this page and navigate to ${destination}?`);

        // If OK is clicked, navigate
        if (userConfirmed) {
            window.location.href = destination;
        } else {
            console.log("Navigation cancelled by user.");
        }
    });
}

/**
 * 2. Original Messaging Logic
 */
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const message = messageInput.value;
        
        // Update local status
        statusText.innerText = `Status: Sent "${message}" to App`;
        
        // If you are using an Android WebView bridge, call it here:
        // if (window.Android) { window.Android.postMessage(message); }
        
        console.log("Message sent:", message);
    });
}

/**
 * 3. Original Storage Test Logic
 */
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        const size = sizeInput.value;
        storageStatus.innerText = `Current Usage: Simulating ${size}MB fill...`;
        
        // Logic for storage simulation would go here
        console.log(`Storage test initiated for ${size}MB`);
    });
}

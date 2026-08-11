// ==========================================
// PMC CITIZEN PORTAL - MAIN JAVASCRIPT
// ==========================================


// ==========================================
// Show Selected File Name
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const fileInput =
        document.getElementById("complaintImage");

    const fileName =
        document.getElementById("fileName");


    if (fileInput) {

        fileInput.addEventListener(
            "change",
            function () {

                if (
                    fileName &&
                    this.files.length > 0
                ) {

                    fileName.textContent =
                        this.files[0].name;

                } else if (fileName) {

                    fileName.textContent =
                        "No file chosen";

                }

            }
        );

    }

});


// ==========================================
// PWA INSTALL
// ==========================================

window.deferredPrompt = null;


// ==========================================
// Show Install Banner
// ==========================================

function showInstallBanner() {

    console.log(
        "🔥 showInstallBanner called"
    );


    const installBanner =
        document.getElementById(
            "installBanner"
        );


    if (!installBanner) {

        console.log(
            "❌ Install banner not found"
        );

        return;

    }


    // ==========================================
    // Check Local Storage
    // ==========================================

    const alreadyInstalled =
        localStorage.getItem(
            "pmcAppInstalled"
        );


    if (
        alreadyInstalled === "true"
    ) {

        console.log(
            "✅ App already installed - popup hidden"
        );

        installBanner.style.display =
            "none";

        return;

    }


    // ==========================================
    // Check Standalone Mode
    // ==========================================

    const isStandalone =
        window.matchMedia(
            "(display-mode: standalone)"
        ).matches;


    // ==========================================
    // Check Window Controls Overlay
    // ==========================================

    const isWindowControlsOverlay =
        window.matchMedia(
            "(display-mode: window-controls-overlay)"
        ).matches;


    // ==========================================
    // iOS Standalone Check
    // ==========================================

    const isIOSStandalone =
        window.navigator.standalone === true;


    // ==========================================
    // App Already Running as Installed App
    // ==========================================

    if (
        isStandalone ||
        isWindowControlsOverlay ||
        isIOSStandalone
    ) {

        console.log(
            "✅ Running as installed app - popup hidden"
        );


        localStorage.setItem(
            "pmcAppInstalled",
            "true"
        );


        installBanner.style.display =
            "none";


        return;

    }


    // ==========================================
    // Show Custom Install Popup
    // ==========================================

    console.log(
        "📱 App is not installed - showing popup"
    );


    installBanner.style.display =
        "flex";

}


// ==========================================
// Browser beforeinstallprompt Event
// ==========================================

window.addEventListener(
    "beforeinstallprompt",
    function (event) {

        console.log(
            "✅ beforeinstallprompt FIRED"
        );


        // Stop automatic browser popup

        event.preventDefault();


        // Save install event

        window.deferredPrompt =
            event;


        console.log(
            "✅ deferredPrompt saved"
        );


        // Show custom popup

        showInstallBanner();

    }
);


// ==========================================
// Page Loaded
// ==========================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "🔥 DOMContentLoaded fired"
        );


        // ==========================================
        // Get Install Elements
        // ==========================================

        const installBanner =
            document.getElementById(
                "installBanner"
            );


        const installButton =
            document.getElementById(
                "installButton"
            );


        const closeInstall =
            document.getElementById(
                "closeInstall"
            );


        // ==========================================
        // Show Install Popup
        // ==========================================

        showInstallBanner();


        // ==========================================
        // Install Button
        // ==========================================

        if (installButton) {

            installButton.addEventListener(
                "click",
                async function () {

                    console.log(
                        "✅ Install button clicked"
                    );


                    // ==========================================
                    // Check Install Prompt
                    // ==========================================

                    if (
                        !window.deferredPrompt
                    ) {

                        console.log(
                            "❌ Native installation prompt is not available."
                        );


                        return;

                    }


                    // ==========================================
                    // Open Native Install Prompt
                    // ==========================================

                    window.deferredPrompt.prompt();


                    // ==========================================
                    // Wait for User Choice
                    // ==========================================

                    const result =
                        await window
                            .deferredPrompt
                            .userChoice;


                    console.log(
                        "Install choice:",
                        result.outcome
                    );


                    // ==========================================
                    // Check if User Accepted
                    // ==========================================

                    if (
                        result.outcome ===
                        "accepted"
                    ) {

                        console.log(
                            "✅ User accepted installation"
                        );


                        localStorage.setItem(
                            "pmcAppInstalled",
                            "true"
                        );

                    } else {

                        console.log(
                            "❌ User cancelled installation"
                        );

                    }


                    // ==========================================
                    // Prompt Can Be Used Only Once
                    // ==========================================

                    window.deferredPrompt =
                        null;


                    // ==========================================
                    // Hide Popup
                    // ==========================================

                    if (installBanner) {

                        installBanner.style.display =
                            "none";

                    }

                }
            );

        }


        // ==========================================
        // Close Install Popup
        // ==========================================

        if (closeInstall) {

            closeInstall.addEventListener(
                "click",
                function () {

                    console.log(
                        "❌ Install popup closed"
                    );


                    if (installBanner) {

                        installBanner.style.display =
                            "none";

                    }

                }
            );

        }

    }
);


// ==========================================
// App Successfully Installed
// ==========================================

window.addEventListener(
    "appinstalled",
    function () {

        console.log(
            "✅ PMC Citizen Portal installed successfully"
        );


        // ==========================================
        // Save Installation Status
        // ==========================================

        localStorage.setItem(
            "pmcAppInstalled",
            "true"
        );


        // ==========================================
        // Clear Install Prompt
        // ==========================================

        window.deferredPrompt =
            null;


        // ==========================================
        // Hide Install Popup
        // ==========================================

        const installBanner =
            document.getElementById(
                "installBanner"
            );


        if (installBanner) {

            installBanner.style.display =
                "none";

        }

    }
);

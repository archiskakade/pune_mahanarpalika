// ==========================================
// Show Selected File Name
// ==========================================

const fileInput = document.getElementById("complaintImage");

if (fileInput) {

    fileInput.addEventListener("change", function () {

        const fileName =
            document.getElementById("fileName");

        if (this.files.length > 0) {

            fileName.textContent =
                this.files[0].name;

        } else {

            fileName.textContent =
                "No file chosen";

        }

    });

}


// ==========================================
// PWA Install App
// ==========================================

window.deferredPrompt = null;


// ==========================================
// Show Install Banner
// ==========================================

function showInstallBanner() {

    console.log("🔥 showInstallBanner called");

    const installBanner =
        document.getElementById("installBanner");

    console.log("🔥 Banner:", installBanner);

    if (!installBanner) {
        return;
    }

    installBanner.style.display = "flex";
}


// ==========================================
// Browser Install Event
// ==========================================

window.addEventListener(
    "beforeinstallprompt",
    function (event) {

        console.log(
            "✅ beforeinstallprompt FIRED"
        );

        // Prevent automatic browser popup
        event.preventDefault();

        // Save install event
        window.deferredPrompt = event;

        console.log(
            "✅ deferredPrompt saved"
        );

        // Show custom banner
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
        // Show Custom Banner
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
                        "Install button clicked"
                    );


                    // Check native install prompt

                    if (!window.deferredPrompt) {

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
                    // Get User Choice
                    // ==========================================

                    const result =
                        await window.deferredPrompt
                            .userChoice;

                    console.log(
                        "Install choice:",
                        result.outcome
                    );


                    // ==========================================
                    // Clear Prompt
                    // ==========================================

                    window.deferredPrompt =
                        null;


                    // ==========================================
                    // Hide Banner
                    // ==========================================

                    if (installBanner) {

                        installBanner.style.display =
                            "none";

                    }

                }
            );

        }


        // ==========================================
        // Close Button
        // ==========================================

        if (closeInstall) {

            closeInstall.addEventListener(
                "click",
                function () {

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

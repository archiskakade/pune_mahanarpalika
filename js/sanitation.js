// ==========================================
// Sanitation Form
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("sanitationForm");

    const uploadFile = document.getElementById("uploadFile");

    if (uploadFile) {

        uploadFile.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) return;

            const maxSize = 5 * 1024 * 1024;

            if (file.size > maxSize) {

                alert("Maximum file size is 5 MB.");

                this.value = "";

            }

        });

    }

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("तुमचा अर्ज यशस्वीरित्या सबमिट झाला.");

        form.reset();

    });

});
function goBack() {

    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }

}
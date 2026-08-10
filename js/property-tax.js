// ==========================================
// Property Tax Form
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("propertyForm");

    const uploadFile = document.getElementById("uploadFile");

    // ==========================================
    // File Validation
    // ==========================================

    if(uploadFile){

        uploadFile.addEventListener("change", function(){

            const file = this.files[0];

            if(!file) return;

            const maxSize = 5 * 1024 * 1024;

            if(file.size > maxSize){

                alert("Please upload a file smaller than 5 MB.");

                this.value = "";

                return;

            }

        });

    }

    // ==========================================
    // Form Validation
    // ==========================================

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const requiredFields = form.querySelectorAll("[required]");

        let valid = true;

        requiredFields.forEach(function(field){

            if(field.value.trim() === ""){

                field.style.borderColor = "red";

                valid = false;

            }else{

                field.style.borderColor = "#d9d9d9";

            }

        });

        if(!valid){

            alert("Please fill all required fields.");

            return;

        }

        submitButton();

    });

});

// ==========================================
// Submit Button Animation
// ==========================================

function submitButton(){

    const btn = document.querySelector(".submit-btn");

    btn.disabled = true;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    setTimeout(function(){

        btn.innerHTML = '<i class="fas fa-check-circle"></i> Complaint Submitted';

        btn.style.background = "#28a745";

        alert("Complaint submitted successfully.");

    },2000);

}
function goBack() {

    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }

}
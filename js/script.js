// Show selected file name

const fileInput = document.getElementById("complaintImage");

if(fileInput){

    fileInput.addEventListener("change", function(){

        const fileName = document.getElementById("fileName");

        if(this.files.length > 0){

            fileName.textContent = this.files[0].name;

        }else{

            fileName.textContent = "No file chosen";

        }

    });

}
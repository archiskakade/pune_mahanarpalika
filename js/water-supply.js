// ==========================================
// Water Supply Search
// ==========================================

document.addEventListener("DOMContentLoaded", function(){

    const searchInput = document.getElementById("searchInput");

    const cards = document.querySelectorAll(".water-card");

    searchInput.addEventListener("keyup", function(){

        const value = this.value.toLowerCase();

        cards.forEach(function(card){

            const text = card.innerText.toLowerCase();

            if(text.includes(value)){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

    });

});
function goBack() {

    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }

}
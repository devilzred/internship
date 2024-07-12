function text(){
    // document.getElementById("test").style.display="block";
    // var button = document.getElementById("btn");
    // if(button.textContent === "Show"){
    //     button.textContent = "Hide";
        
    // }else{
    //     button.textContent="Show";
    //     document.getElementById("test").style.display="none";
    // }

}
function happyPet(){
    document.getElementById("pethappy").style.display="block";
    document.getElementById("petsad").style.display="none";
    document.getElementById("petbored").style.display="none";
    document.getElementById("petangry").style.display="none";
}
function sadPet(){
    document.getElementById("pethappy").style.display="none";
    document.getElementById("petsad").style.display="block";
    document.getElementById("petbored").style.display="none";
    document.getElementById("petangry").style.display="none";
}
function angryPet(){
    document.getElementById("pethappy").style.display="none";
    document.getElementById("petsad").style.display="none";
    document.getElementById("petangry").style.display="block";
    document.getElementById("petbored").style.display="none"; 
}

function boredPet(){
    document.getElementById("pethappy").style.display="none";
    document.getElementById("petsad").style.display="none";
    document.getElementById("petangry").style.display="none";
    document.getElementById("petbored").style.display="block"; 
}
document.addEventListener("DOMContentLoaded",function() {
document.getElementById("buttonlogin").addEventListener("click",function(){
    if (document.getElementById("maillogin").value!="" && document.getElementById("passwordlogin").value!=""){
    window.location.href ="frontpage.html";
    }     
})
});
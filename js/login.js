document.addEventListener("DOMContentLoaded",function() {
document.getElementById("buttonlogin").addEventListener("click",function(){
    if (document.getElementById("maillogin").value!="" && document.getElementById("passwordlogin").value!=""){
        localStorage.setItem("usuario_name",document.getElementById("maillogin").value);
        window.location.href ="index.html";
    }     
})
});
document.addEventListener("DOMContentLoaded",function() {
document.getElementById("buttonlogin").addEventListener("click",function(){
    if (document.getElementById("maillogin").value!="" && document.getElementById("passwordlogin").value!=""){
        localStorage.setItem("usuario_name",document.getElementById("maillogin").value);
        let carrito={};
        localStorage.setItem("cart_user",JSON.stringify(carrito));
        window.location.href ="index.html";
    }
})
});
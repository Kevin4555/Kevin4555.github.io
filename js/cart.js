document.addEventListener("DOMContentLoaded",function(){
    if (localStorage.getItem("usuario_name")){
        
    } else {
        alert("Tiene que Iniciar Sesion para usar el carrito")
        window.location="index.html";
    }
    
})
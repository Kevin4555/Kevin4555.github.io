let validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

function checks() {
    if (document.getElementById("maillogin").value == "" || !(validEmail.test(document.getElementById("maillogin").value))) {
        document.getElementById("maillogin").setCustomValidity("error email");
    }else{
        document.getElementById("maillogin").setCustomValidity("");
    }
    if (document.getElementById("passwordlogin").value == "") {
        document.getElementById("passwordlogin").setCustomValidity("error passw");
    } else {
        document.getElementById("passwordlogin").setCustomValidity("");
    } 
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formlogin").addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        checks();
        if (document.getElementById("formlogin").checkValidity()) {
            if (localStorage.getItem("users")){
                let users=JSON.parse(localStorage.getItem("users"));
                if (!users[document.getElementById("maillogin").value]) {
                    users[document.getElementById("maillogin").value]={
                        name:"",
                        sname:"",
                        lastname:"",
                        slastname:"",
                        telcont:"",
                        img:""
                    };
                    localStorage.setItem("users",JSON.stringify(users));
                }
            } else {
                let users={};
                users[document.getElementById("maillogin").value]={
                    name:"",
                    sname:"",
                    lastname:"",
                    slastname:"",
                    telcont:"",
                    img:""
                };
                localStorage.setItem("users",JSON.stringify(users));
            };
            localStorage.setItem("usuario_name", document.getElementById("maillogin").value);
            let carrito = {};
            localStorage.setItem("cart_user", JSON.stringify(carrito));
            window.location = "index.html";
        }else{
            document.getElementById("formlogin").classList.add(('was-validated'));
            document.getElementById("maillogin").addEventListener("input",checks);
            document.getElementById("passwordlogin").addEventListener("input",checks);
        }
    })   
});
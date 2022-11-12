function actualizo(bool) {
    let alert;
    if (bool) {
        alert = document.getElementById("success");
    } else {
        alert = document.getElementById("error");
    }
    alert.style.opacity = 1;
    setTimeout(() => {
        alert.style.opacity = 0;
    }, 4000);
}
function actualizarUserLocal(user) {
    let users = JSON.parse(localStorage.getItem("users"));
    users[localStorage.getItem("usuario_name")] = user;
    localStorage.setItem("users", JSON.stringify(users));
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("usuario_name")) {
        let inputmail = document.getElementById("email");
        let inputname = document.getElementById("name");
        let inputsname = document.getElementById("name2");
        let inputlastname = document.getElementById("lastname");
        let inputslastname = document.getElementById("lastname2");
        let inputtelcont = document.getElementById("tel_cont");
        let inputimg = document.getElementById("img_per");
        let btnguardar = document.getElementById("btnguardar");

        let users = JSON.parse(localStorage.getItem("users"));
        let user = users[localStorage.getItem("usuario_name")];
        inputmail.value = localStorage.getItem("usuario_name");
        inputname.value = user.name
        inputsname.value = user.sname;
        inputlastname.value = user.lastname;
        inputslastname.value = user.slastname;
        inputtelcont.value = user.telcont;
        let img_per = document.getElementById("perfilimg");
        if (user.img != "") {
            inputimg.files[0] = user.img;
            img_per.src=user.img;
        }


        btnguardar.addEventListener("click", () => {
            if ((inputlastname.value != "") && (inputtelcont.value != "") && (inputname.value != "")) {
                user.name = inputname.value;
                user.sname = inputsname.value;
                user.lastname = inputlastname.value;
                user.slastname = inputslastname.value;
                user.telcont = inputtelcont.value;
                actualizarUserLocal(user);
                actualizo(true);
                document.getElementById("namediv").classList.remove('was-validated');
                document.getElementById("lastnamediv").classList.remove('was-validated');
                document.getElementById("telcontdiv").classList.remove('was-validated');
            } else {
                document.getElementById("namediv").classList.add('was-validated');
                document.getElementById("lastnamediv").classList.add('was-validated');
                document.getElementById("telcontdiv").classList.add('was-validated');
                actualizo();
            }
        })
        let fileimg = inputimg.files[0];
        const reader = new FileReader();
        if (fileimg) {
            reader.readAsDataURL(fileimg);
        }
        inputimg.addEventListener('input', (e) => {
        let newfile = inputimg.files[0];
        if (/\.(jpe?g|png)$/i.test(newfile.name)){
           reader.addEventListener("load", () => {
                // convert image file to base64 string
                img_per.src = reader.result;
                user.img = reader.result;
                actualizarUserLocal(user);
            }, false);
            if (newfile) {
                reader.readAsDataURL(newfile);
            };
        }else{
            actualizo();
        }
            
        });
    } else {
        window.location = "index.html";
    }

})
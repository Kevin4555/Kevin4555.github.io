let producto;

let btncomprar = document.getElementById("btncomprar");

function Cambiarprod(id) {
    localStorage.setItem("productoID", id);
    window.location = "product-info.html";
}

function Showdata(product) {
    document.getElementById("tituloprod").innerHTML = product.name;
    let currency = product.currency;
    if (product.currency == "UYU") {
        currency = "$"
    }
    //Agrego los datos
    document.getElementById("precioprod").innerHTML = currency +" "+ Intl.NumberFormat('es-UY').format(product.cost);
    document.getElementById("descprod").innerHTML = product.description;
    document.getElementById("categprod").innerHTML = product.category;
    document.getElementById("cantvendprod").innerHTML = product.soldCount;
    //Agrego las imagenes al carousel
    for (let index = 0; index < product.images.length; index++) {
        if (index == 0) {
            document.getElementById("imagenescarousel").innerHTML =
                ` 
            <div class="carousel-item active">
            <img src="${product.images[index]}" class="d-block w-100" alt="img${index + 1}">
            </div>
            `
        } else {
            document.getElementById("imagenescarousel").innerHTML +=
                ` 
            <div class="carousel-item">
            <img src="${product.images[index]}" class="d-block w-100" alt="img${index + 1}">
            </div>
            `
        }
    }
    //Agrego los productos relacionasdos
    document.getElementById("ProdR").innerHTML = "";
    for (let element of product.relatedProducts) {
        let pr = `
    <div class="card" onclick=Cambiarprod(${element.id})>
        <img src="${element.image}" class="card-img-top" alt="image-${element.name}">
        <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
        </div>
    </div>
        `
        document.getElementById("ProdR").innerHTML += pr;
    }
}

function ShowComments(comments) {
    document.getElementById("listcomments").innerHTML = "";
    for (let comment of comments) {
        let text = `
        <div class="list-group-item">
        <p><strong>${comment.user}</strong> - ${comment.dateTime} - `;
        for (let index = 0; index < 5; index++) {
            if (index < comment.score) {
                text += `<span class="fa fa-star checked"></span>`;
            } else
                text += `<span class="fa fa-star"></span>`;
        }
        text += `</p>
        <p>${comment.description}</p>
        </div>
        `;
        document.getElementById("listcomments").innerHTML += text;
    }
}




document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("productoID")) {
        getJSONData(PRODUCT_INFO_URL + localStorage.getItem("productoID") + EXT_TYPE).then(function (resultObj) {
            if (resultObj.status === "ok") {
                producto = resultObj.data;
                Showdata(producto);
            }
        }).then(function () {
            getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("productoID") + EXT_TYPE).then(function (resultObj2) {
                if (resultObj2.status === "ok") {
                    let commentsArray = resultObj2.data;
                    if (commentsArray.length == 0) {
                        document.getElementById("listcomments").innerHTML = `
                    <div class="list-group-item text-center">
                    <p>Aun no hay comentarios</p>
                    </div>
                    `;
                    } else {
                        ShowComments(commentsArray);
                    }
                }
            })
        }).then(function () {
            document.getElementById("btncomment").addEventListener("click", function () {
                document.getElementById("textcomment").value = "";
                document.getElementById("scorecommet").selectedIndex = 0;
            })
            //Boton Comprar Que Muestra El Modal
            document.getElementById("btncomprar_modal").addEventListener("click", function () {
                if (localStorage.getItem("cart_user")) {
                    let modalcomp = document.getElementById("comparmodal_body");
                    let carro = JSON.parse(localStorage.getItem("cart_user"));
                    if (carro[producto.id]) {
                        modalcomp.innerHTML = "Este producto ya esta en el <b>carrito</b>, puede variar la cantidad a su gusto allí.";
                        btncomprar.innerHTML = `<i class='fas fa-shopping-cart' style='font-size:24px' aria-label="carrito"></i>`;
                    } else {
                        btncomprar.innerHTML = "Comprar";
                        modalcomp.innerHTML =`
                        <input maxlength="3" type="number" name="inputcomprar" value=1 id="comprarinputmodal">
                        <h4 class="float-end bold" id="subtotcom">SubTotal: ${producto.currency} ${Intl.NumberFormat('es-UY').format(producto.cost)}</h4>
                        `;
                        let inputcom=document.getElementById("comprarinputmodal");
                        inputcom.addEventListener("input",function(){
                            if (inputcom.value != "") {
                                if (inputcom.value < 1) {
                                    inputcom.value = 1;
                                }
                                document.getElementById("subtotcom").innerHTML=`SubTotal: ${producto.currency} ${Intl.NumberFormat('es-UY').format(producto.cost*inputcom.value)}`;
                            }
                        })
                    }
                    //Boton Comprar que se encarga de modificar el carrito y/o redirigir a cart.html;
                    btncomprar.addEventListener("click",function(){
                        if (btncomprar.innerHTML=="Comprar") {
                            carro[producto.id]={
                                name: producto.name,
                                currency: producto.currency,
                                cost: producto.cost,
                                cantidad: document.getElementById("comprarinputmodal").value,
                                imagen: producto.images[0]
                            };
                            localStorage.setItem("cart_user",JSON.stringify(carro));
                            window.location="cart.html";
                        } else{
                            //Si ya se habia Comprado Alguno 
                            window.location="cart.html";
                        }
                    })
                } else {
                    alert("Tiene que Iniciar Sesion");
                }
            })
        })

    }
    else {
        alert("No selecciono ningún Producto");
        window.location = "products.html";
    }
})
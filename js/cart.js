let cart;
let listaprodcart = document.getElementById("listacarrito");

function eliminarprod(id) {
    delete cart[id];
    localStorage.setItem("cart_user", JSON.stringify(cart));
    ShowProductCart(cart);
}
function CarritoVacio() {
    alert("Su Carrito esta vacio");
    window.location = "index.html";
}
function ShowProductCart(cart) {
    listaprodcart.innerHTML = "";
    if (Object.keys(cart).length === 0) {
        CarritoVacio();
    } else {
        for (let prod in cart) {
            let text = `
        <tr>
        <th scope="row" class="border-dark"><img width="75" height="50" src=${cart[prod].imagen} alt="img1"></th>
        <td class="border-dark">${cart[prod].name}</td>
        <td class="border-dark">${cart[prod].currency}<br>${cart[prod].cost}</td>
        <td class="border-dark">
            <input maxlength="3" type="number" name="${prod}" value=${cart[prod].cantidad}>
        </td>
        <td class="border-dark fw-bold">${cart[prod].currency}<br>${(cart[prod].cost * cart[prod].cantidad)}</td>
        <td class="pt-3 border-bottom-0"><i class='fas fa-times-circle cursor-active' onclick="eliminarprod(${prod})" style='font-size:25px;color:red'></i></td>
        </tr>
        `;
            listaprodcart.innerHTML += text;
        }
        for (let input of listaprodcart.getElementsByTagName("input")) {
            input.addEventListener("input", function () {
                if (input.value != "") {
                    if (input.value < 1) {
                        input.value = 1;
                    }
                    //Voy a al padre del padre,en este caso el "tr" para luego modificar el "td" especifico;
                    input.parentNode.parentNode.childNodes[9].innerHTML = `${cart[input.name].currency}<br>${(cart[input.name].cost * input.value)}`;
                    cart[input.name].cantidad = input.value;
                    localStorage.setItem("cart_user", JSON.stringify(cart));
                }
                ;
            })
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("usuario_name")) {
        document.getElementById("titule").innerHTML += localStorage.getItem("usuario_name");
        getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
            if (resultObj.status === "ok") {
                cart = JSON.parse(localStorage.getItem("cart_user"));
                if (Object.keys(cart).length === 0) {
                    CarritoVacio();
                } else {
                    let idjap = 25801;
                    if (!(cart.idjap)) {
                        cart[idjap] = {
                            name: resultObj.data.articles[0].name,
                            currency: resultObj.data.articles[0].currency,
                            cost: resultObj.data.articles[0].unitCost,
                            cantidad: resultObj.data.articles[0].count,
                            imagen: resultObj.data.articles[0].image
                        };
                    }
                    ShowProductCart(cart);
                }
            }
        })
    } else {
        alert("Tiene que Iniciar Sesion para usar el carrito")
        window.location = "index.html";
    }
})
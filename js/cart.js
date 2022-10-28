let cart;
let listaprodcart = document.getElementById("listacarrito");
let subtotal = 0;
let costenvio = "No Seleccionado";
let costodeenvio = 0;
let mostrarenuru = false;
let mediodepago;
function actualizarfpago() {
    if (document.querySelector("#listacarrito.was-validated")){
    if (document.getElementById("formapg").value == "No ha Seleccionado") {
        document.getElementById("formapgfeedback").innerHTML = "<small>Deberia seleccionar una forma de pago</small>";
    } else {
        if ((document.getElementById("num_tarj").value != "" && document.getElementById("codseg").value != "" && document.getElementById("venc").value != "") || (document.getElementById("num_cuenta").value != "")) {
            document.getElementById("formapgfeedback").innerHTML = "";
        } else {
            document.getElementById("formapgfeedback").innerHTML = "Faltan datos al seleccionar una forma de pago";
        }
    }    
    }
}
function actualizarcostos() {

    let moneda = "USD";
    if (mostrarenuru) {
        moneda = "UYU";
    }
    let html = `
    <div class="list-group-item">
    <p class="float-end">${moneda} ${Intl.NumberFormat('es-UY').format(subtotal)}</p>
    <p>Subtotal</p>
    </div> `
    if (costenvio == "No Seleccionado") {
        html += `
        <div class="list-group-item">
        <p class="float-end">######</p>
        <p>Envío: ${costenvio}</p>
        </div>
        <div class="list-group-item">
        <p class="float-end">${moneda} ${Intl.NumberFormat('es-UY').format(subtotal)}</p>
        <p>Total</p>
        </div> 
        `;
    } else {
        costodeenvio = (costenvio.porcentaje * subtotal) / 100;
        html += `
        <div class="list-group-item">
        <p class="float-end">${moneda} ${Intl.NumberFormat('es-UY').format(costodeenvio)}</p>
        <p>Envío: ${costenvio.tipo}</p>
        </div>
        <div class="list-group-item">
        <p class="float-end">${moneda} ${Intl.NumberFormat('es-UY').format(costodeenvio + subtotal)}</p>
        <p>Total</p>
        </div> 
        `;
    }
    document.getElementById("costos").innerHTML = html;
}

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
    subtotal = 0;
    listaprodcart.innerHTML = "";
    if (Object.keys(cart).length === 0) {
        CarritoVacio();
    } else {
        for (let prod in cart) {
            if (!mostrarenuru) {
                if (cart[prod].currency == "UYU") {
                    subtotal += parseInt(((cart[prod].cost * cart[prod].cantidad) / 41.2)); //Conversion del dia 18/10/2022
                } else {
                    subtotal += (cart[prod].cost * cart[prod].cantidad);
                };
            } else {
                if (cart[prod].currency == "USD") {
                    subtotal += parseInt(((cart[prod].cost * cart[prod].cantidad) * 41.2)); //Conversion del dia 18/10/2022
                } else {
                    subtotal += (cart[prod].cost * cart[prod].cantidad);
                };
            }
            formatcost = Intl.NumberFormat('es-UY').format(cart[prod].cost);
            formatsubt = Intl.NumberFormat('es-UY').format(cart[prod].cost * cart[prod].cantidad)

            let text = `
        <tr>
        <th scope="row" class="border-dark"><img width="75" height="50" src=${cart[prod].imagen} alt="img1"></th>
        <td class="border-dark">${cart[prod].name}</td>
        <td class="border-dark">${cart[prod].currency}<br>${formatcost}</td>
        <td class="border-dark">
            <input maxlength="3" type="number" class="form-control" name="${prod}" value=${cart[prod].cantidad} style="
            width: 83px;" required form="formComprar">
        </td>
        <td class="border-dark fw-bold">${cart[prod].currency}<br>${formatsubt}</td>
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
                    let textsubtot = Intl.NumberFormat('es-UY').format(cart[input.name].cost * input.value);
                    //Voy a al padre del padre,en este caso el "tr" para luego modificar el "td" especifico;
                    input.parentNode.parentNode.childNodes[9].innerHTML = `${cart[input.name].currency}<br>${textsubtot}`;
                    if (!mostrarenuru) {
                        if (cart[input.name].currency == "UYU") {
                            subtotal -= parseInt(((cart[input.name].cost * cart[input.name].cantidad) / 41.2));
                            subtotal += parseInt(((cart[input.name].cost * input.value) / 41.2));
                        } else {
                            subtotal -= (cart[input.name].cost * cart[input.name].cantidad);
                            subtotal += (cart[input.name].cost * input.value);
                        }
                    } else {
                        if (cart[input.name].currency == "USD") {
                            subtotal -= parseInt(((cart[input.name].cost * cart[input.name].cantidad) * 41.2));
                            subtotal += parseInt(((cart[input.name].cost * input.value) * 41.2));
                        } else {
                            subtotal -= (cart[input.name].cost * cart[input.name].cantidad);
                            subtotal += (cart[input.name].cost * input.value);
                        }
                    }
                    cart[input.name].cantidad = input.value;
                    localStorage.setItem("cart_user", JSON.stringify(cart));
                    actualizarcostos();
                }
                ;
            })
        }
        actualizarcostos();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("usuario_name")) {
        document.getElementById("titule").innerHTML += localStorage.getItem("usuario_name");
        cart = JSON.parse(localStorage.getItem("cart_user"));
        if (localStorage.getItem("usuario_name") == "25801") {
            getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
                if (resultObj.status === "ok") {
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
            if (Object.keys(cart).length === 0) {
                CarritoVacio();
            } else {
                ShowProductCart(cart);
            }
        }
    } else {
        alert("Tiene que Iniciar Sesion para usar el carrito")
        window.location = "index.html";
    }
    if (document.querySelector('input[name="tipodeenvio"]')) {
        document.querySelectorAll('input[name="tipodeenvio"]').forEach((elem) => {
            elem.addEventListener("change", function (event) {
                costenvio = {
                    tipo: event.target.id.toString(),
                    porcentaje: event.target.value
                };
                actualizarcostos();
            });
        });
    }
    if (document.querySelector('input[name="formadepago"]')) {
        document.querySelectorAll('input[name="formadepago"]').forEach((elem) => {
            elem.addEventListener("change", function (event) {
                document.getElementById("formapg").value = event.target.value;
                document.getElementById("num_cuenta").value = "";
                document.getElementById("num_tarj").value = "";
                document.getElementById("codseg").value = "";
                document.getElementById("venc").value = "";
                if (event.target.value == "Transferencia bancaria") {
                    document.getElementById("num_cuenta").disabled = false;
                    document.getElementById("num_tarj").disabled = true;
                    document.getElementById("codseg").disabled = true;
                    document.getElementById("venc").disabled = true;
                } else {
                    document.getElementById("num_cuenta").disabled = true;
                    document.getElementById("num_tarj").disabled = false;
                    document.getElementById("codseg").disabled = false;
                    document.getElementById("venc").disabled = false;
                }
                actualizarfpago();
            });
        });
    }
    document.getElementById("mostrarUSD").addEventListener("click", function () {
        mostrarenuru = false;
        ShowProductCart(cart);
    })
    document.getElementById("mostrarUYU").addEventListener("click", function () {
        mostrarenuru = true;
        ShowProductCart(cart);
    })
    const form = document.getElementById("formComprar");
    form.addEventListener("submit", e => {
        e.preventDefault();
        e.stopPropagation();

        form.classList.add('was-validated');
        document.getElementById("formapagoModal").classList.add('was-validated');
        document.getElementById("formapagoModal").classList.add('was-validated');
        listaprodcart.classList.add('was-validated');
        actualizarfpago();
        document.getElementById("num_cuenta").addEventListener("input", actualizarfpago);
        document.getElementById("num_tarj").addEventListener("input", actualizarfpago);
        document.getElementById("codseg").addEventListener("input", actualizarfpago);
        document.getElementById("venc").addEventListener("input", actualizarfpago);
        if (form.checkValidity()) {
            const alertexito = document.getElementById('alertexito')
            const alert = (message, type) => {
                const wrapper = document.createElement('div')
                wrapper.innerHTML = [
                    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                    `   <div>${message}</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                ].join('')

                alertexito.append(wrapper)
            }
            form.reset();
            document.getElementById("num_cuenta").value = "";
            document.getElementById("num_tarj").value = "";
            document.getElementById("codseg").value = "";
            document.getElementById("venc").value = "";
            form.classList.remove('was-validated');
            document.getElementById("formapagoModal").classList.remove('was-validated');
            listaprodcart.classList.remove('was-validated');
            costenvio = "No Seleccionado";
            actualizarcostos();
            alert('¡Has comprado con exito!', 'success')
        }
    })
})
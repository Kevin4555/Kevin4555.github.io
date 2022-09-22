const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded",function(){
  if (localStorage.getItem("usuario_name")) {
    document.getElementById("navUser").innerHTML=`
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarUserDropdownoptions" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${localStorage.getItem("usuario_name")}
        </a>
        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarUserDropdownoptions">
          <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
          <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
          <li><a class="dropdown-item" href="#" onclick="cerrarsesion()">Cerrar sesión</a></li>
        </ul>
      </li>
      `;
  }else{
    document.getElementById("navUser").innerHTML=`<a class="nav-link" href="index.html">Iniciar Sesion</a>`;
  }
})

function cerrarsesion(){
  localStorage.removeItem("usuario_name");
  window.location="login.html";
}
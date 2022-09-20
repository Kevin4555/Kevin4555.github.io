let category;
let min=undefined;
let max=undefined;

function Reditigirainfo(productoid) {
    localStorage.setItem("productoID",productoid);
    window.location="product-info.html";
}

function showProductsList(products) {
    document.getElementById("cat-list-container").innerHTML="";
    let text="";
    for (let product of products) {
        if ((!(parseInt(product.cost) < min)) && (!(parseInt(product.cost) > max))) {
        text=`
            <div class="list-group-item list-group-item-action cursor-active" onclick=Reditigirainfo(${product.id})>
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                        <small class="text-muted">${product.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML+=text;    
        }
    }
}




document.addEventListener("DOMContentLoaded",function () {
    if (localStorage.getItem("catID")) {
        getJSONData(PRODUCTS_URL+localStorage.getItem("catID")+EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok"){
                category = resultObj.data;
                document.getElementById("subtitle").innerHTML+= category.catName+".";
                showProductsList(category.products);
    
                document.getElementById("filtrarProd").addEventListener("click",function(){
                    min=parseInt(document.getElementById("filtrominP").value);
                    max=parseInt(document.getElementById("filtromaxP").value);
                    showProductsList(category.products);
                })
                document.getElementById("limpiarProd").addEventListener("click",function(){
                    document.getElementById("filtrominP").value="";
                    document.getElementById("filtromaxP").value="";
                    min=undefined;
                    max=undefined;
                    showProductsList(category.products);
                })
                document.getElementById("asdP").addEventListener("click",function () {
                    showProductsList(category.products.sort(function(a, b){return parseInt(a.cost)-parseInt(b.cost)}));
                })
                document.getElementById("desP").addEventListener("click",function () {
                    showProductsList(category.products.sort(function(a, b){return parseInt(b.cost)-parseInt(a.cost)}));
                })
                document.getElementById("desR").addEventListener("click",function () {
                    showProductsList(category.products.sort(function(a, b){return parseInt(b.soldCount)-parseInt(a.soldCount)}));
                })
            };
        })
    } else {
        window.location="categories.html";
    }
    });
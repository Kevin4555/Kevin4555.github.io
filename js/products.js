let category;

function showProductsList(products) {
    let text="";
    for (let product of products) {
       text=`
            <div class="list-group-item ">
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




document.addEventListener("DOMContentLoaded",function () {
    getJSONData(PRODUCTS_URL+localStorage.getItem("catID")+EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            category = resultObj.data;
            document.getElementById("subtitle").innerHTML+= category.catName+".";
            showProductsList(category.products);
        };
        
    })});
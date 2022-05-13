import { baseUrl } from "./api.js";

const productsUrl = baseUrl + "products/"; 

const resultContainer = document.querySelector(".container-products"); 

async function getProducts(productsUrl) {

    try {
        const response = await fetch(productsUrl);
        const json = await response.json(); 
        console.log(json); 
         

        json.forEach(function (product) {
            resultContainer.innerHTML += `<a class="products" href="productdetail.html?id">
            <h4>${product.title}</h4>
            <img src=${product.image.url}>
            <p>${product.description}</p>
            <p>Price: ${product.price}</p>
            </a>`; 
        });
    } catch (error){
        console.log(error); 
    }
}
getProducts(productsUrl);
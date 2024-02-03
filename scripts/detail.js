import { essentialOils } from "../data/data.js";
import { cart } from "./cart.js";

let app = document.getElementById('app');

const loadTemplate = () => {
  fetch('../template.html')
  .then(response => response.text())
  .then(html => {
    app.innerHTML = html;

    cart();
    initApp();
  })
}

loadTemplate();
const initApp = () => {
  let productId = new URLSearchParams(window.location.search).get('id');
  let thisProduct = essentialOils.filter(value => value.id == productId)[0];
  
    if(!thisProduct){
        window.location.href = "/";
}
let detail = document.querySelector('.detail')

detail.querySelector('.image img').src = thisProduct.image;
detail.querySelector('.name').innerText = thisProduct.name;

detail.querySelector('.price').innerText = 'R' + thisProduct.priceCents;
detail.querySelector('.quantity').innerText = thisProduct.quantity
detail.querySelector('.rating').innerText = thisProduct.rating.stars+ '('+thisProduct.rating.count+')'
detail.querySelector('.description').innerText = thisProduct.description;
detail.querySelector('.addCart').dataset.id = productId;

let productsHTML ='';

essentialOils.filter((value) => value.id !=productId).forEach((product) => {
  productsHTML +=`
  <div class="product-container">
            <a href="/detail.html?id=${product.id}">
          <div class="product-image-container">
            <img src="${product.image}" class="product-image">
          </div>
          </a>
          <div class="product-description">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-spacer"></div>
            <div class="product-quantity">
              ${product.quantity}
            </div>
            <div class="product-price">
              R${product.priceCents.toFixed(2)}
            </div>
            
            <div class="product-rating"> 
              <img src="images/icons/star-512.png" class="ratingImage">${product.rating.stars} (${product.rating.count})
            </div>
            
            <a class="quickView addCart" data-id="${product.id}">
              Add To bag
            </a>
            
          </div>
        </div>`
});
document.querySelector('.listProduct').innerHTML = productsHTML;
}
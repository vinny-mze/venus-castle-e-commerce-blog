import {products} from "../data/data.js";
import {cart} from "./cart.js";
import {login} from "./login.js";



const essentialOils = products.filter(product => product.category === "Essential Oils");
const organicSoaps = products.filter(product => product.category === "Organic Soaps");
const soyCandles = products.filter(product => product.category === "Soy Candles");

export const generateCategoryHTML = ( category, gridClass) => {
  let productsHTML ='';
  category.forEach((product) => {
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
  
  document.querySelector(`.${gridClass}`).innerHTML = productsHTML;
}

let app = document.getElementById('app');

const loadTemplate = () => {
  fetch('../template.html')
  .then(response => response.text())
  .then(html => {
    app.innerHTML = html;
  generateCategoryHTML(essentialOils, 'essentialOil-grid');
  generateCategoryHTML(organicSoaps, 'organicSoap-grid');
  generateCategoryHTML(soyCandles, 'soyCandle-grid');
    cart();
    login();
  })
}
loadTemplate();

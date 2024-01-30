import { essentialOils } from "../data/data.js";

let productsHTML ='';

essentialOils.forEach((product) => {
  productsHTML +=`
  <div class="product-container">
          <div class="product-image-container">
            <img src="${product.image}" class="product-image">
          </div>
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
            
            <button class="addToBagButton">
              Add to bag
            </button>
            
          </div>
        </div>`
});

document.querySelector('.js-product-grid').innerHTML = productsHTML;
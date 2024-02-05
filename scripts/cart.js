import { essentialOils } from "../data/data.js";

export const cart = () =>{
  let iconCart = document.querySelector('.shopping-cart');
  let body = document.querySelector('body');
  let closeCart = document.querySelector('.cartTab .close');
  let cart=[];

  iconCart.addEventListener('click', () => {
    body.classList.toggle('activeTabCart');
  })
  closeCart.addEventListener('click', () => {
    body.classList.toggle('activeTabCart');
  })

  const setProductInCart = (idProduct, quantity, position) => {
    if (quantity >0){
      if (position < 0){
        cart.push({
          product_id: idProduct,
          quantity: quantity
        })
      }else{
        cart[position].quantity = quantity;
      }
    }else{
      cart.splice(position, 1);
    }

    localStorage.setItem('cart',JSON.stringify(cart));
    refreshCartHTML();
  }

  const refreshCartHTML = () =>{
    let listHTML = document.querySelector('.listCart');
    let totalHTML = document.querySelector('.cart-quantity');
    let totalQuantity = 0;
    listHTML.innerHTML = null;
    cart.forEach(item => {
      totalQuantity = totalQuantity + item.quantity;
      let position = essentialOils.findIndex((value) => value.id == item.product_id)
      let info = essentialOils[position];
      let newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.innerHTML = `
      <div class="image">
        <img src="${info.image}">
      </div>
      <div class="name">
      ${info.name}
      </div>
      <div class="totalPrice">R${(info.priceCents * item.quantity).toFixed(2)}</div>
      <div class="quantity">
          <span class="minus" data-id="${info.id}">-</span>
          <span class="quantity">${item.quantity}</span>
          <span class="plus" data-id="${info.id}">+</span>
      </div>  
      
      `;

      listHTML.appendChild(newItem);
    })
    totalHTML.innerHTML = totalQuantity;
  }

  document.addEventListener('click', (event) => {
    let buttonClick = event.target;
    let idProduct = buttonClick.dataset.id;
    let position = cart.findIndex((value) => value.product_id == idProduct);
    let quantity = position < 0 ? 0 : cart[position].quantity;

    if (buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus')){
      quantity++;
      setProductInCart(idProduct, quantity, position);
    }else if(buttonClick.classList.contains('minus')){
      quantity --;
      setProductInCart(idProduct, quantity, position);
    } 
})

const initApp = () => {
        
  if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'));
      refreshCartHTML();
  }
  }
  initApp();
  
}


import { products } from "./products.js";
import { deliveryOptions } from "./deliveryOptions.js";
export let cartQuantity = 0;


export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId: '1'
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
    
  }];
}

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function checkProductExistsInCart(id){
  let matchingItem;
  const element = document.querySelector(`.js-select-${id}`);
  const selectQuantity = Number(element?.value || 1);
  
    cart.forEach((product)=>{
      if(product.productId == id){
        matchingItem = product;
      }
    })
    if (matchingItem){
      matchingItem.quantity += selectQuantity;
      

    }else {
    
      cart.push({
          productId : id,
          quantity : selectQuantity,
          deliveryOptionId : '1'
          
        })
      
    }
    saveToStorage();
   
  }


 export function removeFromCart(productId){
    const newCart =[];
    cart.forEach((cartItem)=>{
      if(productId != cartItem.productId){
        newCart.push(cartItem);
      }
    });
    cart = newCart;
    
    
    saveToStorage();
   
  }

cartQuantityAmount();
export function cartQuantityAmount(){
  cartQuantity = 0;
  cart.forEach((cartItems)=>{
  cartQuantity += cartItems.quantity;
})
  return cartQuantity ;
}

export function updateQuantity(productId,newQuantity){
  cart.forEach((cartItem)=>{
    
      if(cartItem.productId=== productId){
      cartItem.quantity = newQuantity;
      console.log(cartItem);
      saveToStorage();
    }
    
    
  })
}


export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  let matchingId;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
    
  });
  deliveryOptions.forEach((deliveryOption)=>{
    if(deliveryOption.id==deliveryOptionId){
      matchingId = deliveryOptionId;
    }
  })
  if(!matchingId){
    return;
  }

  if(!matchingItem){
    return;
  }

  matchingItem.deliveryOptionId = matchingId;
  saveToStorage();
}
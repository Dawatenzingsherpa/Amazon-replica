import { products } from "./products.js";
import { deliveryOptions } from "./deliveryOptions.js";
class Cart{
  cartItems;
  cartQuantity = 0;
  localStorageKey;

  constructor (localStorageKey){
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
    this.cartQuantityAmount();
  }

  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
      
    }];
  }
  saveToStorage(){
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
  }
  
  checkProductExistsInCart(id){
  let matchingItem;
  const element = document.querySelector(`.js-select-${id}`);
  const selectQuantity = Number(element?.value || 1);
  
    this.cartItems.forEach((product)=>{
      if(product.productId == id){
        matchingItem = product;
      }
    })
    if (matchingItem){
      matchingItem.quantity += selectQuantity;
      

    }else {
    
      this.cartItems.push({
          productId : id,
          quantity : selectQuantity,
          deliveryOptionId : '1'
          
        })
      
    }
    this.saveToStorage();
   
  }


 removeFromCart(productId){
    const newCart =[];
    this.cartItems.forEach((cartItem)=>{
      if(productId != cartItem.productId){
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    
    
    this.saveToStorage();
   
  }


  cartQuantityAmount(){
    this.cartQuantity = 0;
    this.cartItems.forEach((cartItem)=>{
    this.cartQuantity += cartItem.quantity;
  })
    return this.cartQuantity ;
  }

  updateQuantity(productId,newQuantity){
    this.cartItems.forEach((cartItem)=>{
    
      if(cartItem.productId=== productId){
      cartItem.quantity = newQuantity;
      
      this.saveToStorage();
    }
    
    
    })
  }

  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    let matchingId;

    this.cartItems.forEach((cartItem)=>{
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
    this.saveToStorage();
  }
}



const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');





console.log(cart);
console.log(businessCart);


import { orders,getOrder } from "../data/orders.js";
import { getProduct ,loadProductsFetch} from "../data/products.js";
import { cartQuantityAmount } from "../data/cart.js";


await loadProductsFetch();
const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const product = getProduct(productId);
console.log(product);



const order = getOrder(orderId);
console.log(order);




const html = `
  
    
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${deliveryDate()}
      </div>

      <div class="product-info">
       ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${getProductQuantity()}
      </div>

      <img class="product-image" src="${product.image}">

      <div class="progress-labels-container">
        <div class="progress-label js-preparing">
          Preparing
        </div>
        <div class="progress-label js-shipped">
          Shipped
        </div>
        <div class="progress-label js-delivered">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar js-progress-bar" style="width:${calculateProgress()}%"></div>
      </div>
    

`;

document.querySelector('.js-order-tracking')
  .innerHTML = html;


function getProductQuantity(){
  let quantity;
  order.products.forEach((orderProduct)=>{
  if(orderProduct.productId=== product.id){
    quantity = orderProduct.quantity;
  }
})
  return quantity;
}

function deliveryDate(){
  let deliveryDate;
  order.products.forEach((orderProduct)=>{
  if(orderProduct.productId=== product.id){
    const delivery = orderProduct.estimatedDeliveryTime;
    const date = new Date(delivery);
    const formatted = date.toLocaleDateString("en-US", {
      weekday: "long",   
      month: "long",     
      day: "numeric"    
    });

    deliveryDate = formatted;

  }
})
 return deliveryDate;
}

deliveryDate();


document.querySelector('.js-cart-quantity')
  .innerHTML = cartQuantityAmount();


function calculateProgress(){
  let deliveryTime;

  order.products.forEach((orderProduct)=>{
    if(orderProduct.productId=== product.id){
      const delivery = orderProduct.estimatedDeliveryTime;
      deliveryTime = new Date(delivery);
    }})

  const currentTime = new Date();
  const orderTime = new Date(order.orderTime);

  const progress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

  

 
  return progress;

}


if(calculateProgress()<50){
  document.querySelector('.js-preparing')
    .classList.add("current-status");
}else if(calculateProgress()>=50 && calculateProgress < 100){
  document.querySelector('.js-shipped')
    .classList.add("current-status");
}else{
  document.querySelector('.js-delivered')
    .classList.add("current-status");
}



document.querySelector('.js-search-button')
  .addEventListener('click',()=>{
    const inputvalue = document.querySelector('.js-search-bar')
    .value;
    window.location.href = `amazon.html?search=${inputvalue.toLowerCase()}`;
    
  })


  
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
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
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
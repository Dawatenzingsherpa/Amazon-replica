import { checkProductExistsInCart,cartQuantityAmount} from "../data/cart.js";
import { orders } from "../data/orders.js";
import { getProduct,loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

await loadProductsFetch();

let html = '';

function renderOrderHTML(){
  orders.forEach((order)=>{
    const orderTime = new Date(order.orderTime);

    const day = orderTime.getDate(); // 7
    const month = orderTime.toLocaleString("default", { month: "long" });
  
  html += `
    <div class="order-container-${order.id}">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${month} ${day}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productHTML(order)}
        </div>
  `;

})
  document.querySelector('.js-orders-grid')
    .innerHTML = html;
}

renderOrderHTML();


function productHTML(order){
  let productHtml= '';
  order.products.forEach((orderProduct)=>{
    const product = getProduct(orderProduct.productId);

    const deliveryTime = new Date(orderProduct.estimatedDeliveryTime);
    const day = deliveryTime.getDate();
    const month = deliveryTime.toLocaleString("default",{month:'long'})
 

    productHtml += `
      
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${month} ${day}
        </div>
        <div class="product-quantity">
          Quantity: ${orderProduct.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${orderProduct.productId}">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${orderProduct.productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
      
    `;
  })
  
  return productHtml;
}

/*
orders.forEach((order)=>{
  order.products.forEach((product)=>{
    console.log(product);
    const deliveryTime = new Date(product.estimatedDeliveryTime);
    const day = deliveryTime.getDate();
    const month = deliveryTime.toLocaleString("default",{month:'long'})
    console.log(day,month);
 
  })
})
*/


document.querySelectorAll('.js-buy-again-button')
  .forEach((button)=>{
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId;
      checkProductExistsInCart(productId);
      
    })
  })


document.querySelector('.js-cart-quantity')
  .innerHTML = cartQuantityAmount();


 

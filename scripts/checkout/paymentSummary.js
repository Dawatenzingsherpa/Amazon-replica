import { cart,cartQuantity} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";



export function renderPaymentSummary(){
  


  let productsPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    
    const product = getProduct(cartItem.productId);
    productsPriceCents += product.priceCents * cartItem.quantity;

   
    
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    
    shippingPriceCents += deliveryOption.priceCents;

  });
  
  const totalBeforeTax = productsPriceCents + shippingPriceCents;
  const taxAmount = (totalBeforeTax*0.1);
  const totalAfterTax = totalBeforeTax + taxAmount;
  
  let productSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(productsPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-shipping-cost">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxAmount)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-total">$${formatCurrency(totalAfterTax)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;
  
  document.querySelector('.js-payment-summary')
    .innerHTML = productSummaryHTML;

  
  document.querySelector('.js-place-order')
    .addEventListener('click',async ()=>{
      
      try{
        //throw 'error';
        const response = await fetch('https://supersimplebackend.dev/orders',{
          method : 'POST',
          headers : {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
        
        const order = await response.json();
       
        addOrder(order);
        
        
      }catch (error){
        console.log('Unexpected error.please try again later');
      }
      window.location.href = 'orders.html';
    })
}
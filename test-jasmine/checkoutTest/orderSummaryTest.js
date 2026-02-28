import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage,cart } from '../../data/cart.js';
import { loadProducts,loadProductsFetch } from '../../data/products.js';


describe('Test Suite : Render OrderSummary',()=>{
  const productId1= 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2= '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll((done)=>{
    loadProductsFetch().then(()=>{
      done();
    })
  })

  beforeEach(()=>{
    spyOn(localStorage,'setItem');

    document.querySelector('.js-test-container').innerHTML=`
      <div class="js-order-summary"></div>
      <div class="js-checkout-cart-quantity"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"></div>
    `;
    
   

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productId1,
        quantity:2,
        deliveryOptionId: '1'
        },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'

        }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML=``;
  })

  it('display the cart ',()=>{
   

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    
    
  })
  it('removes the item',()=>{
    

    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    
    
  })

  it('check product name',()=>{
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
  });

  it('check product price',()=>{
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90');
  })

  
})


describe('test suite : delivery Option',()=>{
  const productId1= 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2= '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(()=>{
    spyOn(localStorage,'setItem');

    document.querySelector('.js-test-container').innerHTML=`
      <div class="js-order-summary"></div>
      <div class="js-checkout-cart-quantity"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"></div>
    `;
    
   

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: productId1,
        quantity:2,
        deliveryOptionId: '1'
        },{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'

        }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML=``;
  })
  it('delivery Option 3 check',()=>{
    
    document.querySelector(`.js-delivery-option-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-3`).click();
    expect(document.querySelector(`.js-delivery-option-input-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-3`).checked).toEqual(true);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(document.querySelector('.js-shipping-cost').innerText).toEqual('$14.98');
    expect(document.querySelector('.js-total').innerText).toEqual('$63.50');
  })
})
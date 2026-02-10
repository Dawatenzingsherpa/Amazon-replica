import { checkProductExistsInCart, cart ,loadFromStorage,removeFromCart,updateDeliveryOption } from "../../data/cart.js";

describe('testt suite: checkProductExistsInCart',()=>{
  beforeEach(()=>{
    
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId : '1'
      }]);
    });
    loadFromStorage();
  })

  it('adds an existing product to the cart',()=>{
    

    checkProductExistsInCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(1);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId:'1'
    }]));
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

  });


  
  it('add an new product to the cart',()=>{
    

    checkProductExistsInCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId:'1'
    }]));
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
})

describe('test suite: removeFromCart()',()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem')
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId: '1'
      }]);
    
    })
    loadFromStorage();
  })

  it('remove productid that is in the cart',()=>{
    
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart','[]');
  })

  it('remove productId that is not in the cart',()=>{
    removeFromCart('121212');
    expect(cart.length).toEqual(1);
    
  })
})

describe('test suite: updateDeliveryOption',()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
  });

  it('basic test',()=>{
    
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
        
      }])
    })
    loadFromStorage();
    updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d','3');
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '3'
        
      }]))
  })

  it('does nothing if the product is not in the cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
        
      }])
    })
    loadFromStorage();
    updateDeliveryOption('does-not-exist','3');
    expect(cart[0].deliveryOptionId).toEqual('2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })

  it('does nothing if delivery Option does not exist',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
        
      }])
    })
    loadFromStorage();
    updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d','4');
    expect(cart[0].deliveryOptionId).toEqual('2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })
})
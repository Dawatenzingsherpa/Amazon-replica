export const cart = [];

export function checkProductExistsInCart(id){
  let matchingItem;
  
  
    cart.forEach((product)=>{
      if(product.productId == id){
        matchingItem = product;
      }
    })
    if (matchingItem){
      matchingItem.quantity += 1;

    }else {
    
      cart.push({
          productId : id,
          quantity : 1
        })
    
    }
  
   
  }


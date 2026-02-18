import { Product,Appliance,Clothing } from "../../data/products.js";
import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite : Product Class',()=>{
  const product = new Product( {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    })

  it('checking the product details',()=>{
    

    expect(product instanceof Product).toEqual(true);
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg");
    expect(product.priceCents).toEqual(1090);
    
  });

  it('check the method of product',()=>{
    expect(product.getRatingUrl()).toBe(`images/ratings/rating-${product.rating.stars*10}.png`);
    expect(typeof product.getPrice).toBe('function');
    expect(product.getPrice()).toEqual('10.90');
  })
})

describe('test suite : Clothing Class',()=>{
  const clothing = new Clothing({
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  });


  it('clothing product details',()=>{
    expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(clothing.type).toBe('clothing');
  });

  it('checking method in Clothing Class',()=>{
    expect(clothing.getPrice()).toEqual('7.99');
    expect(typeof clothing.extraInfoHTML).toBe('function');

    expect(clothing.extraInfoHTML()).toBe(`<a href = "images/clothing-size-chart.png" target="_blank">Size Chart</a>`);
  });
})


describe('test suite : Appliance Class',()=>{
  const appliance = new Appliance({
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
    type : 'Appliance',
    instructionsLink: 'images\appliance-instructions.png',
    warrentyLink:'images\appliance-warranty.png'
  });

  it('check the product details',()=>{
    expect(appliance.type).toEqual('Appliance');
    
  })


  it ('checking method of Appliance Class',()=>{
    expect(typeof appliance.extraInfoHTML).toBe('function');
    expect(appliance.getRatingUrl()).toBe(`images/ratings/rating-${appliance.rating.stars*10}.png`);
    expect(appliance.extraInfoHTML()).toEqual(`
      <a href="images/appliance-instructions.png" target = "_blank">instruction Link</a>
      <a href="images/appliance-warranty.png" target = "_blank">warrenty Link</a>
      `);
  })
})
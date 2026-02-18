class Car{
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  truckStatus = this.isTrunkOpen ? 'open' : 'Closed'
  constructor(brand,model){
    this.#brand = brand;
    this.#model = model;
  }
  getBrand(){
    return this.#brand;
    
  }
  getModel(){
    return this.#model;
  }

  displayInfo(){
    console.log(`${this.#brand} ${this.#model} Speed : ${this.speed} Km/H Truck : ${this.truckStatus}`);
    
  }
  go(){
    if(this.isTrunkOpen === false){
      const check = this.speed + 5;
      if(check >= 0 && check <= 200){
        this.speed = check;
      }
    }
    
  }
  brake(){
    const check = this.speed - 5;
    if(check >= 0 && check <= 200){
      this.speed = check;
    }
  }

  openTrunk(){
    this.isTrunkOpen = true;
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car{
  #brand = this.getBrand();
  #model = this.getModel();
  acceleration=0;

 
  go(){
    if(this.isTrunkOpen === false){
      const check = this.acceleration + 20;
      if(check >= 0 && check <= 300){
        this.acceleration = check;
      }
    }
  } 

  displayInfo(){
     console.log(`${this.#brand} ${this.#model} Acceleration : ${this.acceleration} Km/H TruckInfo : ${this.truckStatus}`);
  }
  
}

const toyota = new Car('toyota','Coralla');
const tesla = new Car('tesla','Model 3');
toyota.openTrunk();
toyota.go();
toyota.displayInfo();

const mcLaren = new RaceCar('Mclaren','F1');
mcLaren.go();
mcLaren.displayInfo();



class CarWash {
  constructor(brand, model = CarWash.noCarBaseModel(), services = []) {
    this.brand = brand;
    this.model = model;
    this.washed = false;
    this._services = services;
  }
  // статический метод
  static noCarBaseModel() {
    return "none";
  }
  // методы
  washReady() {
    this.washed = true;
    CarWash.counter++;
    this.report();
  }

  report() {
    console.log(this.brand, this.model, this.washed);
  }

  get services() {
    return this._services.length > 0 ? "Есть доп услуги" : "Нет доп услуг";
  }
  set services(addServices) {
    // console.log(this._services);
    return this._services.push(addServices);
  }
}

// наследование класса
class PassCar extends CarWash {
  constructor(brand, model, services, pass = 5) {
    super(brand, model, services);
    this.pass = pass;
  }
  washReady() {
    super.washReady();
    this.reportOffice();
  }
  reportOffice() {
    console.log("На мойке для легковых была помыта машина");
  }
}

// статическое свойство
CarWash.counter = 0;

const car1 = new CarWash("mazda", 3, ["black tires", "wax"]);
const car2 = new PassCar("BMW", "x5");
// const car3 = new CarWash("Lada", "grante");
// const car4 = new CarWash("ZAZ");

// car1.washReady();
// car2.washReady();
// car3.washReady();
// car4.washReady();

// console.log(CarWash.counter);

car1.services = "Протирка стекол";
// console.log(car1.services);
// console.log(car2.services);

car1.washReady();
car2.washReady();
console.log(car1);
console.log(car2);

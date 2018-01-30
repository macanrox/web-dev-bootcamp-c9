var faker = require('faker');

for(var j = 0; j < 10; j++){
    console.log(faker.commerce.productName()+" - $"+faker.commerce.price());
}
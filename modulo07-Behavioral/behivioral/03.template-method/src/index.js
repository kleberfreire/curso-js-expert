import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
  customerId: 'abc123',
  amount: 300,
  products:[{description: 'carro', price: 50000}, {describe: 'moto', price: 10000}]
})

const orderBusiness = new OrderBusiness()
const result = orderBusiness.create(order)
console.info('orderCreated', result)
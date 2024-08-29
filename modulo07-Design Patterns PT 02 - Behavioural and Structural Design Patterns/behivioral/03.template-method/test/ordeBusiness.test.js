import { expect, describe, jest, test, beforeEach } from '@jest/globals'
import Order from '../src/entities/order.js'
import OrderBusiness from '../src/business/orderBusiness.js'

describe('Test suite for Template Method design patten', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })
  describe('#OrderBusiness', () => {
    test('exection order Business without Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100,
        products:[{description: 'product 1', price: 50}, {describe: 'product 2', price: 50}]
      })

      const orderBusiness = new OrderBusiness()
      // todo: Todos devs obrigatoriamente lembrar de seguir a risca esse fluxo de execução
      // todo: Se algum dev esquecer de seguir esse fluxo, pode quebrar todo o sistema

      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBeTruthy()

      const result = orderBusiness._create(order)
      expect(result).toBeTruthy()
    })
    test('exection order Business with Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100,
        products:[{description: 'product 1', price: 50}, {describe: 'product 2', price: 50}]
      })

      const orderBusiness = new OrderBusiness()

      const calledValidationFn = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name)
      const calledCreateFn = jest.spyOn(orderBusiness, orderBusiness._create.name)

      // todo: Com template method, o fluxo de execução é garantido
      // todo: evitando a replicação de lógica e garantindo a execução correta
      const result = orderBusiness.create(order)
      expect(result).toBeTruthy()
      expect(calledValidationFn).toHaveBeenCalled()
      expect(calledCreateFn).toHaveBeenCalled()
    })
  })
  
})
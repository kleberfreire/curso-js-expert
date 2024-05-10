const { expect } = require("chai");
const { it, describe } = require("mocha");

const { productValidator } = require("../src");
const ProductDataBuilder = require("./model/productDataBuilder");

describe("Test Data Builder", () => {
  it('should return error with valid product', () => {
    const product = ProductDataBuilder.aProduct().build();

    const result = productValidator(product);
    const expected = {
      result: true,
      errors: []
    }
    expect(result).to.be.deep.equal(expected);
  })
  describe('Product Validation Rules', () => {
    it('should return an object error when creating a Product with invalid id', () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build();

      const result = productValidator(product);
      const expected = {
        errors: [`id: invalid length, current length, current[${product.id}] expected to be between 2 and 20`],
        result: false,
      }
      expect(result).to.be.deep.equal(expected);
    })
    it('should return an object error when creating a Product with invalid name', () => {
      const product = ProductDataBuilder.aProduct().withInvalidName().build();

      const result = productValidator(product);
      const expected = {
        errors: [`name: invalid name, current[${product.name}] expected to have only words`],
        result: false,
      }
      expect(result).to.be.deep.equal(expected);
    })
    it('should return an object error when creating a Product with invalid price', () => {
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build();

      const result = productValidator(product);
      const expected = {
        errors: [`price: invalid price, current[${product.price}] expected to be between 0 and 1000`],
        result: false,
      }
      expect(result).to.be.deep.equal(expected);
    })
    it('should return an object error when creating a Product with invalid category', () => {
      const product = ProductDataBuilder.aProduct().withInvalidCategory().build();

      const result = productValidator(product);
      const expected = {
        errors: [`price: invalid value, current[${product.category}] expected to be either electronic or organic`],
        result: false,
      }
      expect(result).to.be.deep.equal(expected);
    })
  })
});
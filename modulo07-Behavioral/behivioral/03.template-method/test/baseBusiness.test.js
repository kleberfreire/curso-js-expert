import { expect, describe, jest, test, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/util/exception.js'

describe('#BaseBusiness', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })
  test('should throw an error when child class doesnt implement _validateRequiredFields function', () => {
    class ConcreteClass extends BaseBusiness { }
    const concreteClass = new ConcreteClass()
    const validateError = new NotImplementedException(concreteClass._validateRequiredFields.name)

    expect(() => concreteClass.create({})).toThrow(validateError)
    
  })
  test('should throw an error when  _validateRequiredFields returns false', () => {
    const VALIDATION_DOESNT_SUCCESS = false

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCESS)
    }

    const concreteClass = new ConcreteClass()
    const validateError = new Error('invalid data!')


    expect(() => concreteClass.create({})).toThrow(validateError)

  })
  test('should throw an error when child class doesnt implement _create function', () => {
    const VALIDATION_SUCCESS = true

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCESS)
    }

    const concreteClass = new ConcreteClass()
    const validateError = new NotImplementedException(concreteClass._create.name)


    expect(() => concreteClass.create({})).toThrow(validateError)
  })
  test('should call _create and _validateRequiredFields on create', () => {
    const VALIDATION_SUCCESS = true
    const CREATE_SUCCESS = true

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCESS)
      _create = jest.fn().mockReturnValue(CREATE_SUCCESS)
    }

    const concreteClass = new ConcreteClass()
    const createFromBaseClassFn = jest.spyOn(BaseBusiness.prototype, concreteClass.create.name)
    const data = {}

    const result = concreteClass.create(data)


    expect(result).toBeTruthy()
    expect(createFromBaseClassFn).toHaveBeenCalled()
    expect(concreteClass._create).toHaveBeenCalled()
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
    expect(concreteClass._validateRequiredFields).toHaveBeenCalledWith(data)
    expect(concreteClass._create).toHaveBeenCalledWith(data)
  })
})
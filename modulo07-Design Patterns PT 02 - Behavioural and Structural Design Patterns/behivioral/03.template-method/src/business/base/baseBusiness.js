import { NotImplementedException } from "../../util/exception.js";



class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name);
  }
  _create(data) {
    throw new NotImplementedException(this._create.name);
  }

  /*
    Padrão do Martin Fowler
    a proposta do padrão e garantir um fluxo de métodos, definindo uma sequencia a ser executada

    esse create é a implementação efetiva do Template Method
  */
  create(data) {
    const valid = this._validateRequiredFields(data);
    if (!valid) {
      throw new Error('invalid data!');
    }

    return this._create(data);
    // validar campos
    // salvar no banco
  }
}

export default BaseBusiness;
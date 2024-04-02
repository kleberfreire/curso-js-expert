class UserService {
  constructor({ useRepository }) {
    this.UserService = useRepository
  }

  async find(query) {
    const users = await this.useRepository.find(query)
   
    return users
            .map(item => ({ ...item, name: item.name.toUpperCase() }))
  }
}

module.exports = UserService
export default class PaymentSubject {
  #observer = new Set();
  notify (paymentData) {
    this.#observer.forEach(observer => {
      observer.update(paymentData)
    });
  }
  subscribe (observer) {
    this.#observer.add(observer);
  }

  unsubscribe (observer) {
    this.#observer.delete(observer);
  }


}
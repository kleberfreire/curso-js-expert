export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject;
  }
  creditCard (paymentData) {
    console.log('\n a payment ocurred from ${paymentData.userName} with credit card');
    this.paymentSubject.notify(paymentData);
  }


}
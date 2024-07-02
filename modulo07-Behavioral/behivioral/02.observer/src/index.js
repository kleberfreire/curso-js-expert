import Payment from "./events/payment.js";
import Marketing from "./observers/marketing.js";
import PaymentSubject from "./subjects/paymentSubject.js";
import Shipment from "./observers/shipment.js";


const subject = new PaymentSubject();

const marketing = new Marketing();
subject.subscribe(marketing);

const shipment = new Shipment();
subject.subscribe(shipment);

const payment = new Payment(subject);

payment.creditCard({id: Date.now(), userName: 'John Doe'});

subject.unsubscribe(marketing);

payment.creditCard({id: Date.now(), userName: 'Kleber Freire'});

shipment.update({id: 1, userName: 'John Doe'});
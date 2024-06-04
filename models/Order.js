import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
    products: Object,
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
    paid: {type:Number, default:0},
}, { timestamps: true });

const Order = models?.Order|| model('Order', OrderSchema);

export default Order;
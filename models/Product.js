import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    name: String,
    catergory: String,
    img: String,
    price: Number
});

const Product = models?.Product || model('Product', ProductSchema);

export default Product;
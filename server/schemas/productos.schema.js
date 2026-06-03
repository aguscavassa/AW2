import mongoose from 'mongoose';
const {Schema, models, model} = mongoose;

const productoSchema = new Schema({
    nombre: {type: String, required: true},
    categoria: {type: String, required: true},
    desc: {type: String, required: true},
    precio: {type: Number, required: true},
    imagen: {type: String, required: true}
});

const Producto = models.Producto || model('Producto', productoSchema);

export default Producto;
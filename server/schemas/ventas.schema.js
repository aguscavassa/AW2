import mongoose from 'mongoose';
const {Schema, models, model} = mongoose;

const ventasSchema = new Schema({
    userId: { type: String, required: true },
    productos: [{ type: String, required: true }],
    fecha: { type: Date, default: Date.now },
    efectivo: { type: Boolean, default: false }
});

const Venta = models.Venta || model('Venta', ventasSchema);

export default Venta;
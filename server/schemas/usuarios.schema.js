import mongoose from 'mongoose';
const {Schema, models, model} = mongoose;

const usuarioSchema = new Schema({
    user: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const Usuario = models.Usuario || model('Usuario', usuarioSchema);

export default Usuario;
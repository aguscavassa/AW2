import { connectToDatabase } from "../js/conexiondb.js";
import Usuario from "../schemas/usuarios.schema.js";

export const crearUsuario = async(user, password) => {
    try{
        await connectToDatabase();
        const res = await Usuario.create({user, password});
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        if (error.code === 11000) {
            return { error: 'El nombre de usuario ya existe' };
        }
    }
}

export const obtenerUsuario = async(user) =>  {
    try {
        await connectToDatabase();
        const res = await Usuario.findOne({ user });
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}
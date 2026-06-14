import { connectToDatabase } from "../js/conexiondb.js";
import Venta from "../schemas/ventas.schema.js";

export const crearVenta = async(userId, productos, efectivo) => {
    try{
        await connectToDatabase();
        const res = await Venta.create({userId, productos, efectivo });
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}

export const eliminarVenta = async(id) => {
    try {
        await connectToDatabase();
        const res = await Venta.findByIdAndDelete(id);
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}

export const obtenerVenta = async(id) => {
    try {
        await connectToDatabase();
        const res = await Venta.findById(id);
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}

export const usuarioTieneVentas = async(userId) => {
    try {
        await connectToDatabase();
        const res = await Venta.exists({ userId });
        return !!res;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const actualizarVenta = async(id, productos, efectivo) => {
    try {
        await connectToDatabase();
        const res = await Venta.findByIdAndUpdate(id, { productos, efectivo }, { returnDocument: 'after' });
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}
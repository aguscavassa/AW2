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
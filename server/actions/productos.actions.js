import { connectToDatabase } from "../js/conexiondb.js";
import Producto from "../schemas/productos.schema.js";

export const crearProducto = async(nombre, categoria, desc, precio, imagen) => {
    try{
        await connectToDatabase();
        const res = await Producto.create({nombre, categoria, desc, precio, imagen});
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}

export const obtenerProductos = async() =>  {
    try {
        await connectToDatabase();
        const res = await Producto.find();
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}

export const obtenerProducto = async(id) => {
    try {
        await connectToDatabase();
        const res = await Producto.findById(id);
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}

export const eliminarProducto = async(id) => {
    try {
        await connectToDatabase();
        const res = await Producto.findByIdAndDelete(id);
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}
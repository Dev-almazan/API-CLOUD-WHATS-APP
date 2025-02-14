import { error } from "console";
import mongoose from "mongoose";

class userModel {
    constructor(colletion) {
        this.uri = process.env.DB_URI || "";
        this.db = null;
        this.model = mongoose.model(colletion, new mongoose.Schema({
            company_number: { type: Number, required: true },
            company_number_id: { type: Number, required: true },
            client_number_id: { type: Number, required: true },
            client_username: { type: String, required: true },
            messages: { type: Array, required: true }
        }));
        this.connect();
    }

    async connect() {
        try {
            console.log('Conectado a MongoDB Wps');
            this.db = await mongoose.connect(this.uri);
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error);
            this.db = false;
        }
    }

    // Método para insertar usuarios
    async insertOrUpdateData(client_number_id,data) {

        try {
            //buscamos usuario
            const searchUser = await this.model.findOne({ 'client_number_id': client_number_id });
            // si ya existe el usuario hacer un update de la propiead message
            if (searchUser) {
                const resultado = await this.model.findByIdAndUpdate(
                    searchUser._id, // ID del documento
                    { $push: { messages: data.messages } }, // Agregar el nuevo mensaje

                );
                if(resultado)
                {
                    return 'actualizado';
                }
                else
                {
                    return false
                }
            }
            else {
                // si no existe guardar el dato
                await this.model(data).save();
                return 'creado';
            }
        } catch (err) {
            // Manejar errores específicos
            if (err.name === 'ValidationError') {
                console.log(err.message)
            } else {
                console.log(err)
            }
            return false;
        }

    }


}

export default new userModel('users');
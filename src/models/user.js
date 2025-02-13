import mongoose from "mongoose";

class userModel {
    constructor(colletion) {
        this.uri = process.env.DB_URI || "";
        this.db = null;
        this.model = mongoose.model(colletion, new mongoose.Schema({
            wa_id: { type: Number, required: true },
            phone_number_id: { type: Number, required: true },

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
    // Método para tarenos usuarios
    async getData() {
        try {
            const users = await this.model.find().select('usuario ');
            return users;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async getUser(query) {
        try {
            // Busca el usuario en la base de datos
            const user = await this.model.findOne(query);
            // Si el usuario existe, lo devuelve
            if (user) {
                return user;
            }
            // Si no existe, devuelve null
            return null;
        } catch (err) {
            // Registra el error en un sistema de logging (en lugar de console.log)
            console.error('Error en getUser:', err);
            // Lanza una excepción para que el controlador pueda manejarla
            throw new Error('Error al buscar el usuario en la base de datos');
        }
    } 

    async getUser(id) {
        try {
            const result = await this.model.findOne({ 'wa_id': id });

            if (result) {
                return result;
            }
            else {
                return 'no se enco'
            }
        } catch (err) {
            console.log(err);
            return 'e';
        }
    }

    // Método para insertar usuarios
    async postData(datos) {
        try {
            return await this.model(datos).save();
        } catch (err) {
            return err;
        }
    }

  

    async updateUser(id,datos) {
        try {
            return await this.model.findByIdAndUpdate(
                id,
                { $set: { auth: datos } }, 
                { new: true } 
            );
        } catch (err) {
            return err;
        }
    }
}

export default new userModel('users');
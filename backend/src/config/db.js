import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao Mongo')
        
    }
    catch(error){
        console.error('Erro na conexão', error.message);
        process.exit(1);
    }
};

export default connectDB;

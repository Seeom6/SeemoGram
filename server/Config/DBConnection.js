import mongoose from "mongoose";

const databaseConnection = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECT_URI);
        console.log(`db connection : ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Error Db : ${error}`)
        process.exit(1);
    }
}

export default databaseConnection;
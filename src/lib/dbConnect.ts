import mongoose from "mongoose";

type ConnectionObject = {         // Here we define the TYPE of connection
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')

        connection.isConnected = db.connections[0].readyState    //readyState is type of number, we extract it and return it [ref: L:3]

        console.log(db);
        console.log(db.connection);
        
        console.log("DB Connected Successfully");
        
    } catch (error) {
        console.log("Database Connection Failed", error);
        process.exit(1)                        // This is used for exiting the process of connection of db because db connection is failed
    }
}

export default dbConnect;
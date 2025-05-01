import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error('MONGODB_URL environment variable is not defined');
        }
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

export default connectMongoDB;
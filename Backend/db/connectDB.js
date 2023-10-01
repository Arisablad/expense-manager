import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // eslint-disable-next-line no-undef
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected: ${connection.connection.host}`);
    }
    catch (error) {
        console.log(error);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}

export default connectDB
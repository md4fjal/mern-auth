import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connInst = await mongoose.connect(
      `${process.env.MONGODB_URI}/authmern`
    );
    console.log(`database connection host:${connInst.connection.host}`);
  } catch (error) {
    console.log("database connection failed", error);
    process.exit(1);
  }
};

export default connectDB;

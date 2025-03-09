import mongoose from "mongoose";

// const connectMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("connected to Mongo DB");
//   } catch (error) {
//     console.log(error);
//   }
// };

const connectMongoDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to the database.");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectMongoDB;

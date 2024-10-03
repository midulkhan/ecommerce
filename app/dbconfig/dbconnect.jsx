import mongoose from "mongoose";

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    connection.on("connection", () => {
      console.log("db is connected");
    });

    connection.on("error", (error) => {
      console.log("Database connection failed" + error);
    });
  } catch (error) {
    console.log("Something wrong with database connection");
  }
}
export default ConnectDB;

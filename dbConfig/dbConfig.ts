import mongoose from "mongoose";
import dotenv from "dotenv";
import toast from "react-hot-toast";

dotenv.config();

export async function connect() {
  const mongoUrl = process.env.URL_MONGO as string;

  if (!mongoUrl) {
    console.log("Cant Found Url MongoDB");
    toast.error("Cant Connect Database");
  }
  try {
    mongoose.connect(mongoUrl);
    const connectionDb = mongoose.connection;
    connectionDb.on("connected", () => {
      console.log("Success Connection Database");
    });

    connectionDb.on("error", (err) => {
      console.log("SomeTing Wrong Please Try Agian Error: " + err);
      process.exit(1);
    });
  } catch (error) {
    console.log("Error Server : " + error);
    process.exit(1);
  }
}

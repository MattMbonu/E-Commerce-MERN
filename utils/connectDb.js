import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    //use existing conection
    console.log("using existing connection");
    return;
  }
  //new db connection
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("db connected");
  connection.isConnected = db.connections[0].readyState;
}

export default connectDb;

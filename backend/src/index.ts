import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "../../../.env" });
import cors from "cors";

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

// connect to DB
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.listen(port, () => console.log(`Server started on port ${port}`));

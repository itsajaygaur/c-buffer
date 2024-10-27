import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import router from "./routes/employee";
// import {router } from "./routes/employee";
import {router as employeeRoutes} from './routes/employee.js';

import responseHandler from "./utils/response-handler.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(responseHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", employeeRoutes);

app.all('*', (req, res) => {
  res.status(404).json({success: false, message: "Resource not found!"})
} );



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



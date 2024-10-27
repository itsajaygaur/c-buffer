import express from "express";
import { addEmployee, getEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.js";
const router = express.Router()

router.post("/employee", addEmployee) 
router.get("/employee", getEmployee)
router.put("/employee", updateEmployee)
router.delete("/employee/:id", deleteEmployee)


export {router};

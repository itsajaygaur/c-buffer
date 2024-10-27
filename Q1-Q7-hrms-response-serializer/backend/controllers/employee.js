import { PrismaClient } from '@prisma/client'
import {employeeSchema, formatZodErrors, updateEmployeeSchema } from '../utils/validation.js';
const prisma = new PrismaClient()


export async function addEmployee(req, res) {
    const validation =  employeeSchema.safeParse(req.body);
    if (!validation.success) {
        return res.badRequest(formatZodErrors(validation)); 
    }
    
    const { name, email, salary, position, joinDate } = validation.data;

    try {
        const newEmployee = await prisma.employee.create({
            data: {
                name,
                email,
                position,
                salary,
                joinDate
            }
        });

        if(!newEmployee) {
            return res.internalError("Error adding employee");
        }

       return res.success(newEmployee, "Employee added successfully");

    } catch (error) {
        console.log('err: ', error)
        res.internalError("Error adding employee");
    }
}

export async function getEmployee(req, res) {
    try {
        const employee = await prisma.employee.findMany();
        if(!employee) {
            return res.internalError("Error getting employee");
        }   
        return res.success(employee, "Employee fetched successfully");
    } catch (error) {
        res.internalError("Error getting employee");
    }
}


export async function updateEmployee(req, res) {
    const validation =  updateEmployeeSchema.safeParse(req.body);
    if (!validation.success) {
        return res.badRequest(formatZodErrors(validation.error)); 
    }
    
    const { name, email, salary, position, joinDate, id } = validation.data;

    try {
        const newEmployee = await prisma.employee.update({
            where: {
                id: id 
            },
            data: {
                name,
                email,
                position,
                salary,
                joinDate
            }
        });

        if(!newEmployee) {
            return res.internalError("Error updating employee");
        }

       return res.success(newEmployee, "Employee updated successfully");

    } catch (error) {
        console.log(error);
        res.internalError("Error updating employee");
    }
}

export async function deleteEmployee(req, res) {
    try {

        if(!req.params?.id) {
            return res.badRequest("Employee id is missing");
        }

        const employee = await prisma.employee.delete({
            where: {
                id: Number(req.params?.id)
            }
        });

        if(!employee) {
            return res.internalError("Error deleting employee");
        }

       return res.success(null, "Employee deleted successfully");

    } catch (error) {
        res.internalError("Error deleting employee");
    }
}
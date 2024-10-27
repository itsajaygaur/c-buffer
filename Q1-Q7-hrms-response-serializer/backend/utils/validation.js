
import { z } from "zod";

export const formatZodErrors = (errors) => {
  // return errors.errors.map((error) => ({
  //   name: error.path.join("."),
  //   message: error.message,
  // }));
  if (errors.error.issues.length > 0) {
    return errors.error.issues[0].message;
  }
  return null; 
};


export const employeeSchema = z.object({
  name: z.string().trim().min(1, {message: "First name is missing"}),
  // age: z.string().trim().min(1, {message: "Age is missing"}),
  email: z.string().email(),
  salary: z.string().trim().min(1, {message: "Salary is missing"}),
  position: z.string().trim().min(1, {message: "Position is missing"}),
  joinDate: z.string().trim().min(1, {message: "Join date is missing"}),
});

export const updateEmployeeSchema = z.object({
  id: z.number().min(1, {message: "Employee id is missing"}),
  name: z.string().trim().min(1, {message: "First name is missing"}),
  // age: z.string().trim().min(1, {message: "Age is missing"}),
  email: z.string().email(),
  salary: z.string().trim().min(1, {message: "Salary is missing"}),
  position: z.string().trim().min(1, {message: "Position is missing"}),
  joinDate: z.string().trim().min(1, {message: "Join date is missing"}),
});

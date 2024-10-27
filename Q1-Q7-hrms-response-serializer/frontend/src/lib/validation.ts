import { z } from "zod"


export const employeeSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  position: z.string().trim().min(1, { message: "Position is required" }),
  salary: z.string().trim().min(1, { message: "Salary is required" }),
  email: z.string().email(),
  joinDate: z.string().trim().min(1, { message: "Joining date is required" }),
})

export type Employee = z.infer<typeof employeeSchema>
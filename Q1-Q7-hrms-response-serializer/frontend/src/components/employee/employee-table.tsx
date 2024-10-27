import { EmployeeContext } from "./employee-context"
import { useContext } from "react"
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import EmployeeAction from "./employee-action"
import { Skeleton } from "../ui/skeleton"

export default function EmployeeTable() {

    const { employees, isLoading } = useContext(EmployeeContext)

    if(isLoading) return <div className="space-y-2" >
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
    </div>

  return (
    <div >

    <Table >
        {/* <TableCaption>Employee List</TableCaption> */}
        <TableHeader>
            <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead >joinDate</TableHead>
            <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            { employees.length > 0 ? employees.map((employee) => (
            <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.joinDate}</TableCell>
                <TableCell className="text-right"><EmployeeAction employee={employee} /></TableCell>
            </TableRow>
            )) :
             <TableRow  >
                <TableCell colSpan={6} className="text-center">
            <p className="text-center mx-auto text-zinc-700 my-4" >No employees found!</p>
                </TableCell>
             </TableRow>
             }
        </TableBody>
        {/* <TableFooter>
            <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
        </TableFooter> */}
        </Table>



    </div>
  )
}
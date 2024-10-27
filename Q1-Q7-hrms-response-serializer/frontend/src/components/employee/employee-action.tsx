import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    // AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    // AlertDialogTrigger,
    } from "@/components/ui/alert-dialog"
    import {
        Dialog,
        DialogContent,
        DialogHeader,
        DialogTitle,
        // DialogTrigger,
      } from "@/components/ui/dialog"
import { EllipsisVertical } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import EmployeeForm from "./employee-form"
import { Employee } from "@/types"
// import { mutate } from "swr"
import toast from "react-hot-toast"
import useSWRMutation from 'swr/mutation'


type EmployeeActionProps = {
    employee: Employee
}


export default function EmployeeAction({employee}: EmployeeActionProps) {

    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    function closeDialog() {
        setIsDialogOpen(false);
    }

    async function deleteEmployeeFn(url: string,{arg: {id}}: {arg: {id: number}}) { 
        const res = await fetch(`${url}/${id}`, {
            method: "DELETE",
          })
          return await res.json()
    }

    const { trigger, isMutating } = useSWRMutation(`${import.meta.env.VITE_API_URL}/employee`, deleteEmployeeFn)
    


    
    async function handleDeleteEmployee(){
        try {
                const result = await trigger({id: employee.id})

              if(result.success) {
                toast.success( result?.message || "Employee deleted successfully")
                setIsAlertOpen(false)
                return
              }
        
              toast.error(result?.message || "Error deleting employee")
        } catch (error) {
            console.log("Err: ", error)
            toast.error("Error deleting employee")
        }
    }

    async function mockAPI(){  
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: "Salary paid successfully",
                })
            }, 2000)
        })
    }


    function paySalary(){
        toast.promise(mockAPI(), {
          success: 'Salary paid successfully!',
          loading: 'Paying salary...',
          error: 'Error paying salary',
        })
    }


    return (
        <>
        <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant="ghost" className='text-sm' size="icon" >
                <EllipsisVertical />
            </Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>Delete</DropdownMenuItem>
            <DropdownMenuItem onClick={paySalary} >Pay Salary</DropdownMenuItem> 
        </DropdownMenuContent>
      </DropdownMenu>



{/* Delete alert dialog */}
<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the employee.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      {/* <AlertDialogAction> */}
        <Button variant="destructive" onClick={handleDeleteEmployee} disabled={isMutating}  >  
            Continue
        </Button>
        {/* </AlertDialogAction> */}
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>


{/* Update dialog */}
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
            <DialogTitle>Update Employee</DialogTitle>
        </DialogHeader>
        <EmployeeForm closeDialog={closeDialog} employee={employee} />
      </DialogContent>
    </Dialog>


        </>
    )
}
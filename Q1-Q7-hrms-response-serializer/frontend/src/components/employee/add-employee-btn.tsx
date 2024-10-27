import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmployeeForm from "./employee-form"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useState } from "react";
import { Plus } from "lucide-react";

export default function AddEmployeeBtn() {

    const [isOpen, setIsOpen] = useState(false);


    function closeDialog() {
        setIsOpen(false);
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button> <Plus /> Add Employee</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
            {/* <DialogDescription>
                Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
        </DialogHeader>
        <EmployeeForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}

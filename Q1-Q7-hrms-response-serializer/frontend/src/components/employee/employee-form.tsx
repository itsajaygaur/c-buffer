import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { employeeSchema } from "@/lib/validation"
import {Employee} from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { mutate } from "swr"



type EmployeeFormProps = {
  closeDialog: () => void,
  employee?: Employee
}


export default function EmployeeForm({closeDialog, employee}: EmployeeFormProps) {

  const form = useForm<Employee>({resolver: zodResolver(employeeSchema), defaultValues: {
    email: employee?.email || "",
    name: employee?.name || "",
    position: employee?.position || "",
    salary: employee?.salary || "",
    joinDate: employee?.joinDate || "",
  }})


  async function onSubmit(data: Employee) {

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/employee`, {
        method: employee?.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee?.id ? {...data, id: employee?.id} : data),
      })
      const result = await res.json()
      if(result.success) {
        mutate(`${import.meta.env.VITE_API_URL}/employee`)
        toast.success( result?.message || "Employee saved successfully")
        form.reset()
        closeDialog()
        return
      }

      toast.error(result?.message || "Error saving employee")
      
    } catch (error) {
      console.log("Err: ", error)
      toast.error("Failed to save employee")
    }
    // console.log(data)
  }


  return (
    <Form {...form} >
    <form onSubmit={form.handleSubmit(onSubmit)}>

    <div className="space-y-4">
      <div className="">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem  >
              <FormLabel>Employee Name</FormLabel>
              <FormControl>
                <Input placeholder="Ajay" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="">
      <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Web Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="">
      <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input placeholder="30000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="">
      <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ajay.gaur@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="">
      <FormField
          control={form.control}
          name="joinDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Joining Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
    <div className="flex justify-end mt-4 gap-2" >
      <Button disabled={form.formState.isSubmitting} variant='outline' type="button" onClick={closeDialog}>Cancel</Button>
      <Button disabled={form.formState.isSubmitting} type="submit">Save</Button>
    </div>

  </form>
  </Form>

  )
}

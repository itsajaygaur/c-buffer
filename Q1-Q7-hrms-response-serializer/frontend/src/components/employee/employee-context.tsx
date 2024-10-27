import { Employee } from "@/types";
import { createContext } from "react";
import useSWR from "swr";

type EmployeeContextType = {
  employees: Employee[]; // Use undefined to handle the initial state
  isLoading: boolean;
}

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  isLoading: false,
});

export const EmployeeProvider = ({ children }: {children: React.ReactNode}) => {

  const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  };


  const {data: employees, isLoading} = useSWR(`${import.meta.env.VITE_API_URL}/employee`, fetcher)

  // const [employees, setEmployees] = useState<any>([]);

  return (
    <EmployeeContext.Provider value={{ employees, isLoading }}> 
      {children}
    </EmployeeContext.Provider>
  );
};
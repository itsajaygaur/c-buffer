// import Sidebar from "./components/layout/sidebar"

import AddEmployeeBtn from "./components/employee/add-employee-btn"
import EmployeeTable from "./components/employee/employee-table"

function App() {

  return (

    <div className="p-5 lg:p-14 xl:p-20" >
      <div className="flex justify-between gap-4 items-center mb-8 lg:mb-14" >
        <h1 className="text-xl md:text-3xl font-bold">HRMS Dashboard</h1>
        <AddEmployeeBtn />
      </div>
      <EmployeeTable />
    </div>

  )
}

export default App

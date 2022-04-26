import { useAdmin } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from 'react'
import SearchBox from "@/components/admin/SearchBox";
import UpdateDepartmentModal from "@/components/admin/UpdateDepartmentModal";
import DepartmentListTable from "@/components/admin/tables/DepartmentListTable";


export default function departmentList() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");

  if (isLoading) return <p> Loading ... </p>
  if (session?.user?.role != "admin") return <p> Unauthorized </p>
  
  
  const handler = () =>{
    setVisible(true);
    setType("create_department")
 
  }
  const closeHandler = () => {
    setVisible(false);
    setType("none")
  };


  return (
    <div>
      <UpdateDepartmentModal
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          department = {data.department}/>
          
        <div className="flex flex-row gap-12 my-6 ">
        <button onClick={handler} className="flex py-2 px-4 text-sm rounded-lg border border-primary-color gap-x-2.5 bg-primary-color text-white hover:shadow-lg hover:shadow-blue-700/20">Add New Department</button>
        <SearchBox /> 

        </div>
      <div className="">
        {/* <h2>List of Users</h2> */}
          { data?.departments && <DepartmentListTable department={data.departments}  />  }
        
        </div>
    </div>
  );
}
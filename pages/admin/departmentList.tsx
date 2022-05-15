import { useAdmin, useInfo } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from 'react'
import SearchBox from "@/components/admin/SearchBox";
import UpdateDepartmentModal from "@/components/admin/UpdateDepartmentModal";
import DepartmentListTable from "@/components/admin/tables/DepartmentListTable";
import LoadingIcon from "@/components/loadingIcon";


export default function departmentList() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();
  const { data: info, isLoading:infoLoading } = useInfo();

  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");

 
  
  
  const handler = () =>{
    setVisible(true);
    setType("create_department")
 
  }
  const closeHandler = () => {
    setVisible(false);
    setType("none")
  };

  if (isLoading) return  <LoadingIcon />
  if (session?.user?.role != "admin") return <p> Unauthorized </p>

  return (
    <div>
      <UpdateDepartmentModal
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          department = {{}}/>
          
        <div className="flex flex-row gap-12 my-6 items-center">
        <button onClick={handler} className="primary-btn">Add New Department</button>
        <SearchBox msg={"search for department"} /> 

        </div>
      <div className="">
        {/* <h2>List of Users</h2> */}
          { info?.departments && <DepartmentListTable department={info.departments}  />  }
        
        </div>
    </div>
  );
}
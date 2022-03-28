import Layout from "@/components/layout"
import { useAdmin } from "lib/fetcher";
import { useSession } from "next-auth/react";
import FormUpdateRole from "@/components/admin/updateRole";
import FormCreateLocation from "@/components/admin/createLocation";
import FormCreateDepartment from "@/components/admin/createDepartment";
import FormUpdateLocation from "@/components/admin/updateLocation";
import FormUpdateDepartment from "@/components/admin/updateDepartment";
import FormAddUserToDepartment from "@/components/admin/addUserToDepartment";
import FormCreateOrderType from "@/components/admin/createOrderType";
import PageHeader from "@/components/pageHeader";




export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();

  if (isLoading) return <p> Loading ... </p>
  if (session?.user?.role != "admin") return <p> Unauthorized </p>

   return (

    
    <Layout>
     <PageHeader page_name="Dashboard" />
     <section className="w-full p-8 bg-slate-100 flex flex-col md:flex-row gap-16">


<div className="md:w-1/3">
  <h2 className="text-2xl font-bold ">Hi Dan</h2>
  <span className="font-semibold">Welcome Back!</span>
  <p className="mt-4">This page is designed to give you some important information about the application</p>
</div>

<div className="md:w-1/2 mt-2 flex flex-col gap-4">
  <div className="p-4 rounded-md bg-white flex justify-between  items-center drop-shadow-sm ">
    <div>
      <p className="text-2xl">25</p>
      <span>Users</span>
    </div>

    <div className="">
      <button className="md:mr-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Add User
      </button>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> 
        View Users 
      </button>
    </div>
  
  </div>

  <div className="p-4 rounded-md bg-white flex justify-between  items-center drop-shadow-sm ">
    <div>
      <p className="text-2xl">10</p>
      <span>Departments</span>
    </div>

    <div className="">
      <button className="md:mr-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Add User
      </button>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> 
        View Users 
      </button>
    </div>
  
  </div>

  <div className="p-4 rounded-md bg-white flex justify-between  items-center drop-shadow-sm ">
    <div>
      <p className="text-2xl">160</p>
      <span>Locations</span>
    </div>

    <div className="">
      <button className="md:mr-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Add User
      </button>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> 
        View Users 
      </button>
    </div>
  
  </div>



</div>

</section>


  

 



      <div className="p-4">
        <h1> Admin Dashboard </h1>
        <h2> List of User </h2>
        {data && <div>
          <ul>
            {data.users.map((user, id) => <li key={id}>{user.email} | {user.role} </li>)}
          </ul>
        </div>}
        <hr />
          <FormUpdateRole roles={data.roles} users={data.users}/>
 <hr />
        <h2> List of Location </h2>
        {data && <div>
          <ul>
            {data.locations.map((item, id) => <li key={id}>Room: {item.room_number} | {item.zone} - {item.description} </li>)}
          </ul>
        </div>}
        <hr />
        <FormCreateLocation zones={data.zones} />

        <FormUpdateLocation zones={data.zones} locations={data.locations} />

        <hr />
        <h2 className="mt-10"> List of Department</h2>
        {data && <div>
          <ul>
            {data.departments.map((item, id) => <li key={id}>Department: {item.name} | {item.budget} </li>)}
          </ul>
        </div>}
        <hr />
        <FormCreateDepartment />
        <hr />
        <h2> Update Department Budget </h2>
        <FormUpdateDepartment departments={data.departments} />
        <FormAddUserToDepartment users={data.users} departments={data.departments} />
        <hr />
        <FormCreateOrderType orderTypes={data.orderTypes} />
        


      </div>

    </Layout>
  )
}

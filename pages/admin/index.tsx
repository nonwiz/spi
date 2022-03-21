import Layout from "@/components/layout"
import { useAdmin } from "lib/fetcher";
import { useSession } from "next-auth/react";
import FormUpdateRole from "@/components/admin/updateRole";
import FormCreateLocation from "@/components/admin/createLocation";
import FormCreateDepartment from "@/components/admin/createDepartment";
import FormUpdateLocation from "@/components/admin/updateLocation";
import FormUpdateDepartment from "@/components/admin/updateDepartment";


export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();

  if (isLoading) return <p> Loading ... </p>
  if (session?.user?.role != "admin") return <p> Unauthorized </p>

   return (
    <Layout>
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
        <FormUpdateDepartment departments={data.departments} />

      </div>

    </Layout>
  )
}

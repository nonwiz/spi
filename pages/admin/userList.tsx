import { useAdmin } from "lib/fetcher";
import { useSession } from "next-auth/react";
import UserListTable from "@/components/admin/tables/UserListTable";
import SearchBox from "@/components/admin/SearchBox";
import LoadingIcon from "@/components/loadingIcon";

export default function userList() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();

  if (isLoading) return <LoadingIcon />
  if (session?.user?.role != "admin") return <p> Unauthorized </p>
  return (
    <div>
      <div className="flex flex-row gap-12 my-6 ">
        {/* <button className="flex py-2 px-4 text-sm rounded-lg border border-primary-color gap-x-2.5 bg-primary-color text-white hover:shadow-lg hover:shadow-blue-700/20">Add New User</button> */}
        <SearchBox />
      </div>
      <div className="">
        {data?.users && data?.roles && <UserListTable users={data.users} roles={data.roles} />}
      </div>
    </div>
  );
}

import { useSession, signOut } from "next-auth/react";

const PageHeader = ({ page_name }:any) => {
  const { data: session } = useSession();
  return (
    <div className="bg-white shadow  p-5 flex justify-between mb-4">
      <h1 className="text-xl font-bold text-gray-900">{page_name}</h1>
      <div className="inline-flex">

        <a className="flex items-center px-4" href="#">
          <svg
            className="w-6 h-6 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-2 text-sm font-medium hidden sm:block">
            Dan Khazifire
          </span>
        </a>
      </div>
    </div>
  );
};

export default PageHeader;

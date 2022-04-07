import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const Header = () => {
  const pages = [
    { label: "Admin", refer: "/admin" },
    { label: "Customer", refer: "/customer" },
    { label: "Purchase", refer: "/purchase" },
    { label: "Inventory", refer: "/inventory" },
  ]

  const { data: session } = useSession()
  return (
    <>
      <div className="flex flex-row justify-between p-2 text-white bg-gray-800">
        <div>
          <Link href="/">
            <a> SPI | {session && session.user?.email} | {session && session.user?.role}</a>
          </Link>
        </div>
        <div className="flex flex-row gap-8">

          <div className="flex flex-row gap-2">
            {pages.map((item, id) =>
              <Link href={item.refer} key={id}>{item.label}</Link>
            )}

          </div>
          {!session ? (
            <a href="./api/auth/signin"> Sign in </a>
          ) : (
            <button onClick={() => signOut()} className="">
              {" "}
              Sign out{" "}
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Header

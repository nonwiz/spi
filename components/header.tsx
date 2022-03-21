import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const Header = () => {
  const pages = [
    {label: "Admin", refer: "/admin"}
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

          <div>
            <Link href="/admin"> Admin </Link>

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

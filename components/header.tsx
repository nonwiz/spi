import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const Header = () => {
  const { data: session } = useSession()
  console.log(session)
  return (
    <>
      <div className="flex flex-row justify-between p-2 text-white bg-gray-800">
        <div>
          <Link href="/">
            <a> SPI | {session && session.user?.email} </a>
          </Link>
        </div>
        <div className="flex flex-row gap-8">
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

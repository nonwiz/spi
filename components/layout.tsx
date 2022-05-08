import Header from "./header"
import Footer from "./footer"
import SideNav from "./sideNav";
import PageHeader from "./pageHeader";
import { useRouter } from "next/router";
import { useCustomer } from "lib/fetcher";
import SignIn from "pages/auth/signin";

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { data, isLoading } = useCustomer();
  const router = useRouter()
  
  if (!isLoading && !data?.user) {
    return <SignIn />
  }
  console.log(data?.user, "hi")
  if (!data?.user?.name || !data?.user?.department || !data?.user?.location) {
    return <div>{children}</div>
  }
return (
    <>
      <Header />
      <main>
        <div className="relative min-h-screen md:flex">
            <SideNav />
            <div className="flex-1 p-10 text-2xl font-bold">
                <PageHeader />
                {children}
            </div>
        </div>

      </main>
      <Footer />
    </>
  )
}

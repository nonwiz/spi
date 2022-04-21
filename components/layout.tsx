import Header from "./header"
import Footer from "./footer"
import SideNav from "./sideNav";
import PageHeader from "./pageHeader";
// import type { ReactChildren } from "react"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>
        <div className="flex gap-8 w-full">

        <div className="relative min-h-screen md:flex">
            <SideNav />
            <div className="flex-1 p-10 text-2xl font-bold">
                <PageHeader />
                {children}
            </div>
        </div>
          
        </div>
      </main>
      <Footer />
    </>
  )
}

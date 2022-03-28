import Header from "./header"
import Footer from "./footer"
import SideNav from "./sideNav";
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

          <div className="mr-16 sm:mr-48">
              <SideNav />
          </div>

          <div className="w-full mr-8">
            {children}
          </div>
          
        </div>
      </main>
      <Footer />
    </>
  )
}

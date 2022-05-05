import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import "/styles/globals.css"
import { NextUIProvider } from '@nextui-org/react';
import Layout from "@/components/layout";
import router from "next/router";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {


  return (
    <>
    
    <NextUIProvider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>

   
      <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </NextUIProvider>
    </>
  )
}

import Loading from "@/components/loading";
import { Grid, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import ConfirmEmail from "./confirmEmail";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSignIn = async e => {
        let user_input = e.target.querySelector(`[name=email]`).value;
        // if (user_input.length == 9) {
        //     user_input += "@my.apiu.edu"
        // } else {
        //     user_input += "@apiu.edu"
        // }
        
        try {
            setShowConfirmation(true);
            const { error } = await signIn('email', {
                email: user_input,
                redirect: false,
                callbackUrl: `/`,
                
            });
    
            setEmail(user_input)
        if (error) {
            throw new Error(error);
        }
        } catch(error) {
            console.log(error)
        }
 
    }

    return (

  <>
        {(showConfirmation && email) 
            ? <ConfirmEmail email={email} /> 
            :(showConfirmation)? 
                <Loading msg={"Please wait..."}/>
            :<div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 bg-primary-color">
                <form onSubmit={handleSignIn} className=" rounded-lg shadow-md bg-white px-4 py-6 sm:px-8 sm:py-8 space-y-6 w-60 md:w-96">
                    <div className="flex gap-6 flex-col ">
                        <div className="flex justify-center">
                            <svg className="w-8 h-8 fill-primary-color" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <span className="text-2xl font-extrabold mt-0 text-primary-color">SPI</span>
                        </div>
                        <h1 className="text-center font-bold p-0 -mt-4 mb-2 ">Sign in to your account</h1> 
                    </div>
                   
                    <div className="flex justify-center mt-2">
                  
                            <div className="w-full ">
                                <label htmlFor="email" className="text-gray-500 text-sm ">Email address</label>
                                <Input bordered color="primary" 
                                    labelRight="@apiu.edu" 
                                    placeholder="dan"
                                    className="mt-2 w-full"
                                    name="email"
                                />
                  
                                <button
                                    type="submit"
                                    className="primary-btn m-0 w-full mt-4"
                                    >
                                    Sign in
                                </button>
                      
                            </div>


                 
                    </div>
            
            
                   
               
                   
                </form>
            
            </div>
        }
  </>



            
    )
}


export default SignIn;
import { Mail } from "@/components/admin/icons/Mail";

export default function ConfirmEmail({email}) {

    return(
        <div className="fixed inset-0 z-10 bg-white">
            <div className="min-h-screen px-6 flex flex-col items-center justify-center animate-zoomIn">
                <div className="flex flex-col items-center justify-center text-center w-3/4 md:w-1/4">
                    <div className="flex md:gap-4 items-center flex-col ">
                        <Mail fill={"#0070F3"}  height={48} width={48} />
                        <h3 className="mt-2 text-lg md:text-xl font-semibold inline-flex "> Confirm your email</h3>
                    </div>
                    <p className="mt-4 text-lg"> We emailed a magic link to <strong>{email}</strong>. Check your inbox and click the link in the email to login.</p>

                    <a className="primary-btn mt-8" href="https://outlook.office.com/mail/">Click to Open Email</a>
                </div>
            </div>
      </div>
    )
}
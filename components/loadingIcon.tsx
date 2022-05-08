export default function LoadingIcon({msg="loading Data..", width="h-96"}) {

    return(
        <>
        <div className={width+" px-6 flex flex-col items-center justify-center animate-zoomIn"}>
            <div className="superballs">
                <div className="superballs__dot"></div>
                <div className="superballs__dot"></div>
            </div>
            <p className="text-lg mt-2 font-semibold">{msg}</p>
        </div>
        </>
    )
}
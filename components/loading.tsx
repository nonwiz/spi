import LoadingIcon from "./loadingIcon";

export default function Loading({msg}) {
    return(
        <>
            <div className="fixed inset-0 z-10 white">
                <LoadingIcon msg={msg} width="min-h-screen"/>
            </div>
        </>
    )
}

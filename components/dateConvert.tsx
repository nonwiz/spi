export default function DateConvert({date}) {
    const formated_Date = new Date(date).toLocaleString('en-us',{dateStyle: 'medium', timeStyle: 'short'})
    // Apr 10,2022, 10:42 PM
    return (
        <div>{formated_Date}</div>
    )
 }
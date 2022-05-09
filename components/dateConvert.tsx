export default function DateConvert({date, type}) {
    if (type){
        const formated_Date = new Date(date).toLocaleString('en-us',{dateStyle: 'medium'})
        return (<span>{formated_Date}</span>)
    }else{
        const formated_Date = new Date(date).toLocaleString('en-us',{dateStyle: 'medium', timeStyle: 'short'})
        return (<span>{formated_Date}</span>)
    }
    // Apr 10,2022, 10:42 PM
 }


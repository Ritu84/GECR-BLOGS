

let months =["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
let days=["Sunday", "Monday", "Tuesday","Wednesday", "Thursday","Friday","Saturday"]

 export const getDay=(timestamp)=>{
    let date= new Date(timestamp);

    return `${date.getDate()} ${months[date.getMonth()]}`
 }

 export const getFullDay =(timeStamp)=>{
   let date = new Date(timeStamp);

   return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
 }
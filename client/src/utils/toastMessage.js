import { toast } from "react-toastify";


const toastOptions = {
    position: "top-right",
    autoClose: 7000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};
const toastOptionsSuccess = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

 const ErrorMessage = (Message)=>{
    return toast.error(Message, toastOptions)
}

const successMessage = (Message)=>{
    return toast.success(Message, toastOptionsSuccess)
}
const toastMessage = {
    ErrorMessage,
    successMessage
}
export default  toastMessage;
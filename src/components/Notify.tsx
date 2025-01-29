import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notify = (text: string, type?: string, position?:any) => {
  if (!type) {
    toast.info(`${text}`, {
      position: position || "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }else if(type === 'warning'){
    toast.warning(`${text}`, {
      position: position || "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }else if(type === 'success'){
    toast.success(`${text}`, {
      position: position || "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }else if(type === 'error'){
    toast.error(`${text}`, {
      position: position || "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  
};
export default Notify;

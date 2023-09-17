import { Id, toast } from "react-toastify";

export const alertCall = async(payload: any, id:Id) => {
  if (payload.success) {
    alert("update_success", payload.message, id);
  } else {
    alert("update_error", payload.message, id);
  }
};

const alert = (type: string, message: string, id?: Id) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "info":
      toast.info(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "update_success":
      toast.update(id!, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      break;
    case "update_error":
      toast.update(id!, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
      break;

    default:
      break;
  }
};

import { toast } from "react-toastify";

export const handleError = (error) => {
  console.log(error?.response?.data?.message);
  toast.error(error?.response?.data?.message);
};

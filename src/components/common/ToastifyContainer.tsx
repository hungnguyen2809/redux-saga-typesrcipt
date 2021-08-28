import { toast, ToastContainer, ToastContent, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

/** ToastifyContainer is setup react-toastify */
export function ToastifyContainer() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

/** toastSuccess is react-toastify for success */
export function toastSuccess(content: ToastContent, options?: ToastOptions) {
  return toast.success(content, options);
}

/** toastError is react-toastify for error */
export function toastError(content: ToastContent, options?: ToastOptions) {
  return toast.error(content, options);
}

/** toastWarning is react-toastify for warning */
export function toastWarning(content: ToastContent, options?: ToastOptions) {
  return toast.warning(content, options);
}

/** toastInfo is react-toastify for info */
export function toastInfo(content: ToastContent, options?: ToastOptions) {
  return toast.info(content, options);
}

/** toastDefault is react-toastify for default */
export function toastDefault(content: ToastContent, options?: ToastOptions) {
  return toast(content, options);
}

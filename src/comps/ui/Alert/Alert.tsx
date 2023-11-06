import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";

interface IAlertProps {
  status?: "success" | "error" | "warning" | "info" | undefined;
  message: string | null;
}

const AlertMessage = ({ message, status }: IAlertProps) => {
  const [serverError, setServerError] = useState<{
    message: string | null;
  }>({ message: null });

  useEffect(() => {
    if (serverError.message) {
      showAlert(serverError.message);
    }
  }, [serverError]);

  return (
    <div className="flex">
      {status === "error" && (
        <HiOutlineXCircle className="text-red-500 w-6 h-6 inline-block mr-2" />
      )}

      {status === "success" && (
        <HiOutlineCheckCircle
          className={`text-green-400 w-6 h-6 inline-block mr-2`}
        />
      )}

      <span className="font-medium text-sm text-gray-900">
        {message ?? "Something went wrong. Please try again."}
      </span>
    </div>
  );
};

const showAlert = (
  message: string | null,
  status?: "success" | "error" | "warning" | "info" | undefined
) => {
  return toast(<AlertMessage message={message} status={status} />, {
    icon: false,
    theme: "light",
    autoClose: 5000,
    draggable: false,
    pauseOnHover: true,
    closeOnClick: true,
    progress: undefined,
    hideProgressBar: true,
    position: "bottom-right",
    style: {
      width: "100%",
      maxWidth: "400px",
      padding: ".5rem",
      borderRadius: "0px",
      boxShadow:
        "0px 2px 2px rgba(159, 162, 191, 0.32), 0px 9px 16px rgba(159, 162, 191, 0.18)",
    },
  });
};

export default showAlert;

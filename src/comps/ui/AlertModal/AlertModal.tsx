import React from "react";
import Button from "@ui/Button";
import { HiX } from "react-icons/hi";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface IModalProps {
  row?: TableRow;
  label?: string;
  accessor?: string;
  onClick?: () => void;
}

const AlertModal = ({ row, accessor, onClick }: IModalProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <span className="text-drio-red-dark inline-block w-full py-2 px-4">
          Delete
        </span>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[#6B6B6B] data-[state=open]:animate-overlayShow fixed inset-0 opacity-40" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white py-12 px-8 shadow-sm focus:outline-none">
          <div className="mx-auto w-20 h-20 rounded-full bg-[#FFE8EC] flex items-center justify-center mb-4">
            <HiX className="text-[#FF4D4D] w-10 h-10 mx-auto" />
          </div>
          <AlertDialog.Title className="text-[#223354] text-2xl font-bold text-center">
            Are you sure you want to permanently delete {accessor} account?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-[#223354] opacity-50 mt-4 mb-5 text-center">
            Once completed, this action cannot be reverted.
          </AlertDialog.Description>
          <div className="flex justify-center gap-6">
            <AlertDialog.Cancel asChild>
              <button className="text-[#1A75FF] inline-flex items-center justify-center rounded px-4 outline-none focus:border">
                Cancel
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <Button onClick={onClick}>Delete</Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AlertModal;

import { useAppSelector } from "@/hooks/useStoreTypes";
import * as CustomModal from "@radix-ui/react-alert-dialog";

interface IModalProps {
  label?: string;
  row?: TableRow;
  identifier: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Modal = ({ label, onClick, children, identifier }: IModalProps) => {
  const isOpen = useAppSelector(
    (state) => state.ui.modalBoolObject[identifier]
  );

  return (
    <CustomModal.Root open={isOpen} onOpenChange={onClick}>
      <CustomModal.Trigger asChild>
        <span className="inline-block w-full py-2 px-4">{label}</span>
      </CustomModal.Trigger>

      <CustomModal.Portal>
        <CustomModal.Overlay className="bg-[#6B6B6B] data-[state=open]:animate-overlayShow fixed inset-0 opacity-40 z-[1000]" />
        <CustomModal.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md shadow-sm focus:outline-none z-[1001]">
          <div className="relative max-h-[90vh] overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </CustomModal.Content>
      </CustomModal.Portal>
    </CustomModal.Root>
  );
};

export default Modal;

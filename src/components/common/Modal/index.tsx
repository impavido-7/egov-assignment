type ModalProps = {
  title: string;
  visible: boolean;
  onClose: () => void;
  onProceed: () => void;
  children: React.ReactNode;
};

const Modal = (props: ModalProps) => {
  if (!props.visible) {
    return null;
  }

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "modal-container") {
      props.onClose();
    }
  };

  return (
    <div
      id="modal-container"
      className="fixed inset-0 bg-black bg-opacity-30
       backdrop-blur-sm flex justify-center items-center
      text-gray-500 p-4 mx-4"
      onClick={handleClose}
    >
      <div className="bg-white p-2 rounded w-1/2 h-1/2 flex flex-col">
        {/* Modal Header */}
        <div className="flex font-bold justify-between border-b-2 py-2 border-gray-200">
          <p> {props.title} </p>
          <button onClick={props.onClose}>X</button>
        </div>

        {/* Modal Content */}
        <div className="pt-4 flex-grow">{props.children}</div>

        {/* Modal Footer */}
        <div className="border-t-2 py-2 border-gray-200">
          <div className="float-right">
            <button
              onClick={props.onClose}
              className="w-20 border border-red-400 text-red-400 p-2 mr-2 hover:scale-95 transition text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                props.onClose();
                props.onProceed();
              }}
              className="w-20 border border-red-400 bg-red-400 text-white p-2 hover:scale-95 transition text-sm"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

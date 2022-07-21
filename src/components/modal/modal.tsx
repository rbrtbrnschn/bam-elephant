interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}
export const Modal = ({ onClose, id, children, ...props }: IModalProps) => {
  // style={{
  //   position: "fixed",
  //   zIndex: "10",
  //   top: "0vh",
  //   height: "100vh",
  //   left: "0vw",
  //   width: "100vw",
  // }}
  return (
    <div className="modal w-screen left-0 h-screen top-0 z-10 fixed flex justify-center items-center">
      <div
        className="modal-background absolute top-0 left-0 w-screen h-screen z-10 bg-slate-700/50 "
        onClick={onClose}
      ></div>
      <div className="modal-card relative m-4 lg:m-0 w-full max-w-md h-auto  max-h-[90vh] lg:max-h-screen bg-slate-900 z-20 bg-white rounded-lg shadow dark:bg-gray-700 overflow-scroll">
        <section className="modal-card-body">{children}</section>
      </div>
    </div>
  );
};

interface ModalFullScreenInterface {
  children: React.ReactNode;
  className?: string;
}

const ModalFullScreen = ({ children, className }: ModalFullScreenInterface) => {
  return (
    <div
      className={
        "fixed w-screen h-screen z-10 top-0 left-0 after:absolute after:block after:bg-black after:w-full after:h-full after:bg-opacity-100 after:top-0 after:left-0 after:-z-[1] " +
        className
      }
    >
      {children}
    </div>
  );
};

export default ModalFullScreen;

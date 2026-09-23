import { useImperativeHandle, useState } from "react";

const Togglable = ({ children, ref }) => {
  const [visible, setVisible] = useState();

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>create blog</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  );
};

export default Togglable;

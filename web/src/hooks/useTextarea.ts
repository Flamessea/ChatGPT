import { useRef, useEffect } from "react";

const useTextarea = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  function autoResizeTextarea() {
    if (textareaRef.current) {
      textareaRef.current.style.maxHeight = "200px";
      textareaRef.current.style.overflowY = "hidden";
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }
  useEffect(() => {
    textareaRef.current?.addEventListener("input", autoResizeTextarea);
    autoResizeTextarea();
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      textareaRef.current?.removeEventListener("input", autoResizeTextarea);
    };
  }, []);

  return {
    textareaRef,
    autoResizeTextarea,
  };
};

export default useTextarea;

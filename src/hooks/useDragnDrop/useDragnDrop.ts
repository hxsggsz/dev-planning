import { validateParams } from "@/pages/auth/signup/components/addProfilePicture/addProfilePicture.types";
import { useState } from "react";

function useDragnDrop(
  setFile: React.Dispatch<React.SetStateAction<FileList | undefined>>,
  validateFile: (validateObj: validateParams) => File[],
) {
  const [isDragging, setIsDragging] = useState(false);

  function handleDragOver(ev: React.DragEvent<HTMLButtonElement>) {
    ev.preventDefault();
    ev.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(ev: React.DragEvent<HTMLButtonElement>) {
    ev.preventDefault();
    ev.stopPropagation();

    setIsDragging(false);
    const { files } = ev.dataTransfer;
    if (!files) return;

    console.log({ files, isDragging });
    const allValidFiles = validateFile({
      files,
      maxSize: 5,
      supportedMedia: ["jpg", "jpeg", "png", "webp", "gif"],
    });

    if (allValidFiles.length > 0) {
      setFile(files);
    }
  }

  return {
    isDragging,
    handleDrop,
    handleDragLeave,
    handleDragOver,
  };
}

export default useDragnDrop;

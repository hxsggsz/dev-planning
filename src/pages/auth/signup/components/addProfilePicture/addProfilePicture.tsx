import useDragnDrop from "@/hooks/useDragnDrop/useDragnDrop";
import scss from "./addProfilePicture.module.scss";
import { Image } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useToast } from "@/context/toastContext/useToast";
import { validateParams } from "./addProfilePicture.types";
import Button from "@/components/button/button";

function AddProfilePicture() {
  const [file, setFile] = useState<FileList>();

  const { toast } = useToast();

  function validateFiles({ files, maxSize, supportedMedia }: validateParams) {
    return Array.from(files).filter((file) => {
      const fileSizeInMegaBytes = Math.floor(file.size / 1024 / 1024);

      const supportedFiles = supportedMedia.find(
        (type) => file.type.includes(type) && fileSizeInMegaBytes < maxSize,
      );

      if (fileSizeInMegaBytes > maxSize) {
        toast.error("this file is too big");
        return;
      }

      if (!supportedFiles) {
        toast.error("File not supported");
        return;
      }

      return supportedFiles;
    });
  }

  const props = useDragnDrop(setFile, validateFiles);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleInputClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function onChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { files } = ev.target;
    if (!files) return;
    const allValidFiles = validateFiles({
      files,
      maxSize: 5,
      supportedMedia: ["jpg", "jpeg", "png", "webp", "gif"],
    });

    if (allValidFiles.length > 0) {
      setFile(files);
    }
  }

  return (
    <>
      <button
        className={scss.picture}
        onDrop={props.handleDrop}
        onClick={handleInputClick}
        onDragOver={props.handleDragOver}
        onDragLeave={props.handleDragLeave}
      >
        {file ? (
          <img
            className={scss.image}
            alt="your image to upload"
            src={URL.createObjectURL(file.item(0)!)}
          />
        ) : (
          <Image className={scss.imagePlaceholder} />
        )}
        <h2 className={scss.title}>click here to add a photo</h2>
        <p className={scss.subtitle}>or drag and drop a file here!</p>
        {props.isDragging && (
          <p className={scss.subtitle}>we got you file, you can drop it now</p>
        )}
        {file?.length && (
          <Button size="small" fullScreen>
            Submit
          </Button>
        )}
      </button>
      <input
        type="file"
        ref={inputRef}
        onChange={onChange}
        className={scss.hidden}
      />
    </>
  );
}

export default AddProfilePicture;

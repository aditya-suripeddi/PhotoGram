import { useState, useRef, useEffect, useCallback } from "react";
import * as LR from "@uploadcare/blocks";
import blocksStyles from "@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url";
import { FileEntry } from "@/types";
import { OutputFileEntry } from "@uploadcare/blocks";

LR.registerBlocks(LR);

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ( {fileEntry, onChange} ) => {
  const [uploadedFiles, setUploadedFiles] = useState<LR.OutputFileEntry[]>([]);
  const ctxProviderRef = useRef<typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider>();

  const handleRemoveClick = useCallback( (uuid: OutputFileEntry["uuid"]) =>
                                            onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
                                            [fileEntry.files, onChange]);

  useEffect(() => {
    
    const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
      if (e.detail) {
        console.log("The uploaded file event is ; ", e);
        setUploadedFiles([...e.detail]);
      }
    };
    
    ctxProviderRef.current?.addEventListener("data-output", handleUploadEvent);

    return () => {
      ctxProviderRef.current?.removeEventListener(
        "data-output",
        handleUploadEvent
      );
    };

  }, [setUploadedFiles]);


  useEffect(() => {
    const resetUploaderState = () =>
      ctxProviderRef.current?.uploadCollection.clearAll();

    const handleDoneFlow = () => {
      resetUploaderState();

      onChange({ files: [...uploadedFiles] });
      setUploadedFiles([]);
    };

    ctxProviderRef.current?.addEventListener("done-flow", handleDoneFlow);

    return () => {
      ctxProviderRef.current?.removeEventListener("done-flow", handleDoneFlow);
    };

    
  }, [fileEntry, onChange, uploadedFiles, setUploadedFiles]);


  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="1c929e8779d9baa05475"
        multiple={true}
        confirmUpload={false}
        removeCopyright={true}
        imgOnly={true}
      />

      <lr-file-uploader-regular ctx-name="my-uploader" css-src={blocksStyles} />

      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />

    
      <div className="grid grid-cols-2 gap-4 mt-8">
        {fileEntry.files.map((file) => (
          <div key={file.uuid} className="relative">

            {/*  format/webp/-quality/smart/-/stretch/fill/  */}
            <img
              key={file.uuid}
              src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/
              `}
            />

            <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800  rounded-full w-7 h-7">
              <button
                className="text-slate-800 text-center"
                type="button"
                onClick={() => handleRemoveClick(file.uuid)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default FileUploader;
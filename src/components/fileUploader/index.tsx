import { useState, useRef, useEffect, useCallback } from "react";
import * as LR from "@uploadcare/blocks";
import { OutputFileEntry } from "@uploadcare/blocks";
import blocksStyles from "@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url";
import { FileEntry } from "@/types";

LR.registerBlocks(LR);

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
  preview: boolean;
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({ fileEntry, onChange, preview }) => {

  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([]);
  const ctxProviderRef = useRef<typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider>(null);

  const handleRemoveClick = useCallback( 
    (uuid: OutputFileEntry["uuid"]) =>
      onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),[fileEntry.files, onChange]);

  // when user selects images to upload they are uploaded and 
  // we get cdnURL, isUploaded for each file in e.detail variable 
  // logged to console in handleUploadEvent
  useEffect(() => {
    console.log('use-effect-1, uploadedFiles:', uploadedFiles);
    const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
      if (e.detail) {
        console.log("The uploaded file event is ; ", e, ' e.detail', e.detail);
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

  // when user clicks on done, then handleDoneFlow is executed and 
  // uploadedFiles with their cdnURLs and uuids are updated in fileEntry
  // which is a state in the parent component CreatePost where post details
  // saved to firestore database
  useEffect(() => {
    console.log('use-effect-2, fileEntry:', fileEntry, ' uploadedFiles: ', uploadedFiles);
    const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();

    const handleDoneFlow = () => {
      resetUploaderState();
      onChange({ files: [...uploadedFiles] });
      setUploadedFiles([]);
    };

    ctxProviderRef.current?.addEventListener("done-flow", handleDoneFlow);

    // useEffect cleanup 
    return () => { ctxProviderRef.current?.removeEventListener("done-flow", handleDoneFlow); };

  }, [fileEntry, onChange, uploadedFiles, setUploadedFiles]);

  return (
    <div>

      <lr-config ctx-name="my-uploader"
                 pubkey="1c929e8779d9baa05475"
                 multiple={preview}
                 confirmUpload={false}
                 removeCopyright={true}
                 imgOnly={true}
      />

      <lr-file-uploader-regular ctx-name="my-uploader" css-src={blocksStyles} />
      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />

      {preview ? (
        <div className="grid grid-cols-2 gap-4 mt-8">
          {
            fileEntry.files.map((file) => (
              <div key={file.uuid} className="relative">
                <img
                  key={file.uuid}
                  // src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/`}
                  src={`${file.cdnUrl}-/scale_crop/500x500/center/`}
                />

                <div className="cursor-pointer flex justify-center
                                absolute -right-4 -top-4
                               bg-yellow-200 border-2
                               border-slate-800 rounded-full w-7 h-7">


                  <button className="text-slate-800 text-center"
                          type="button"
                          onClick={() => handleRemoveClick(file.uuid)}>
                  ×</button>

                </div>
              </div>
            ))
          }
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FileUploader;
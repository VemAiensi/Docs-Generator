import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function FileInput(props) {
  const [fileContent, setFileContent] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("The onabort is exe");
      reader.onerror = () => console.log("The error is exe");
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        props.fnc(content);
      };
      reader.readAsText(file);
    });
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop,
    });

  // fileContent && props.fnc(fileContent);

  return (
    <div className="file-input">
      <span>Source Code</span>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div>Drop the files here ...</div>
        ) : (
          <div>Drag 'n' drop some files here, or click to select files</div>
        )}
      </div>
      {acceptedFiles[0] && ( // Conditionally render file information
        <div className="file-info">
          {acceptedFiles[0].name}
          {/* <p>File Size: {selectedFile.size} bytes</p> */}
          {/* ... other file info ... */}
        </div>
      )}
    </div>
  );
}

export default FileInput;

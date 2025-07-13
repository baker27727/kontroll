// import React, { useState, useRef, useCallback } from 'react';
// import { Upload, X, File } from 'lucide-react';

// interface FileWithPreview extends File {
//   preview?: string;
// }

// interface UploadedFile extends FileWithPreview {
//   id: string;
// }

// interface FileUploaderProps {
//   maxFiles?: number;
//   maxSize?: number;
//   acceptedFileTypes?: string[];
//   onFilesSelected?: (files: File[]) => void;
//   onFileRemoved?: (file: UploadedFile) => void;
//   mode?: 'single' | 'multi';
//   theme?: 'light' | 'dark';
// }

// const CompactFileUploader: React.FC<FileUploaderProps> = ({
//   maxFiles = Infinity,
//   maxSize = 10 * 1024 * 1024, // 10MB
//   acceptedFileTypes = ['image/png', 'image/jpeg', 'image/gif'],
//   onFilesSelected,
//   onFileRemoved,
//   mode = 'multi',
//   theme = 'light',
// }) => {
//   const [files, setFiles] = useState<UploadedFile[]>([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFiles = useCallback((selectedFiles: File[]) => {
//     const validFiles = selectedFiles.filter(
//       (file) => file.size <= maxSize && acceptedFileTypes.includes(file.type)
//     );

//     const newFiles = validFiles.slice(0, maxFiles - files.length).map((file) => ({
//       ...file,
//       id: Math.random().toString(36).substr(2, 9),
//       preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
//       file: file.type.startsWith('image/') ? file : undefined,
//     }));

//     setFiles((prevFiles) => (mode === 'single' ? newFiles : [...prevFiles, ...newFiles]));
//     onFilesSelected?.(newFiles);
//   }, [files, maxFiles, maxSize, acceptedFileTypes, mode, onFilesSelected]);

//   const removeFile = (id: string) => {
//     const fileToRemove = files.find((f) => f.id === id);
//     if (fileToRemove) {
//       setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
//       onFileRemoved?.(fileToRemove);
//     }
//   };

//   const openFileDialog = () => {
//     fileInputRef.current?.click();
//   };

//   const handleDragEvents = useCallback((e: React.DragEvent, isDraggingState: boolean) => {
//     e.preventDefault();
//     setIsDragging(isDraggingState);
//   }, []);

//   const onDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     handleFiles(droppedFiles);
//   }, [handleFiles]);

//   const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';
//   const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
//   const borderColor = isDragging ? 'border-blue-500' : theme === 'light' ? 'border-gray-300' : 'border-gray-600';

//   return (
//     <div className={`w-full ${bgColor} ${textColor}`}>
//       <div
//         onClick={openFileDialog}
//         className={`border-2 cursor-pointer border-dashed rounded p-4 text-center ${borderColor} transition-colors duration-300 ease-in-out`}
//         onDragEnter={(e) => handleDragEvents(e, true)}
//         onDragLeave={(e) => handleDragEvents(e, false)}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={onDrop}
//       >
//         <input
//           type="file"
//           ref={fileInputRef}
//           className="hidden"
//           onChange={(e) => handleFiles(Array.from(e.target.files || []))}
//           multiple={mode === 'multi'}
//           accept={acceptedFileTypes.join(',')}
//         />
//         <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
//         <p className="text-sm mb-2">Drag files here or click to upload</p>
//       </div>

//       {files.length > 0 && (
//         <ul className="mt-4 space-y-2">
//           {files.map((file) => (
//             <li key={file.id} className={`flex items-center ${bgColor} rounded-lg shadow-sm p-2`}>
//               {file.preview ? (
//                 <img src={file.preview} alt={file.name} className="h-10 object-cover rounded mr-2" />
//               ) : (
//                 <File className="w-10 h-10 text-gray-400 mr-2" />
//               )}
//               <div className="flex-grow">
//                 <div className="flex justify-between items-start flex-col">
//                   <span className="text-sm font-medium truncate text-wrap">{file.file.name}</span>
//                   <span className="text-xs text-gray-500">{(file.file.size / 1024).toFixed(2)} KB</span>
//                 </div>
//               </div>
//               <button onClick={() => removeFile(file.id)} className="ml-4 text-red-500 hover:text-red-700">
//                 <X className="w-5 h-5" />
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CompactFileUploader;


const FileUploader = () => {
  return (
    <div>FileUploader</div>
  )
}

export default FileUploader
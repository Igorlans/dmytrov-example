import React, { useState, useCallback, useRef, Ref } from "react";
import toast from "react-hot-toast";
import { max } from "@popperjs/core/lib/utils/math";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface UseFileUploaderOptions {
    initialFiles?: File[];
    maxFiles?: number;
    maxSize?: number;
}

interface FileUploaderState {
    files: File[];
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleFileInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeleteFile: (index: number) => void;
    handleClearFiles: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
}

const useFileUploader = ({
                             initialFiles = [],
                             maxFiles = 30,
                             maxSize = 20 * 1024 * 1024,
                         }: UseFileUploaderOptions = {}): FileUploaderState => {

    const {t} = useTranslation()
    const {locale} = useRouter()
    const [files, setFiles] = useState<File[]>(initialFiles);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const maxSizeInMb = (maxSize / 1024) / 1024;

    const maxFilesErrorText = `${t('create:maxCountFileError')} - ${maxFiles}`
    const maxSizeErrorText = `${t('create:maxSizeFileError')} - ${maxSizeInMb} МБ`
    const fileUploadSuccess = `${t('create:uploadSuccess')}`

    const handleDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const newFiles: File[] = [];

            if (event.dataTransfer.items) {
                for (let i = 0; i < event.dataTransfer.items.length; i++) {
                    if (event.dataTransfer.items[i].kind === 'file') {
                        const file = event.dataTransfer.items[i].getAsFile();
                        if (file) {
                            newFiles.push(file);
                        }
                    }
                }
            } else {
                for (let i = 0; i < event.dataTransfer.files.length; i++) {
                    newFiles.push(event.dataTransfer.files[i]);
                }
            }

            const isBiggerThanMaxCount = files.length + newFiles.length >= maxFiles;
            let isBiggerThanMaxSize = false;

            newFiles.forEach(file => {
                if (file.size > maxSize) {
                    isBiggerThanMaxSize = true
                }
            })


            if (isBiggerThanMaxCount) {
                toast.error(maxFilesErrorText)
            } else if (isBiggerThanMaxSize) {
                toast.error(maxSizeErrorText)
            } else {
                setFiles([...files, ...newFiles]);
                toast.success(fileUploadSuccess)
            }
        },
        [files, maxFiles, locale]
    );

    const handleFileInput = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newFiles = Array.from(event.target.files || []);


            const isBiggerThanMaxCount = files.length + newFiles.length >= maxFiles;
            let isBiggerThanMaxSize = false;

            newFiles.forEach(file => {
                if (file.size > maxSize) {
                    isBiggerThanMaxSize = true
                }
            })


            if (isBiggerThanMaxCount) {
                toast.error(maxFilesErrorText)
            } else if (isBiggerThanMaxSize) {
                toast.error(maxSizeErrorText)
            } else {
                setFiles([...files, ...newFiles]);
                toast.success(fileUploadSuccess)
            }
        },
        [files, maxFiles, locale]
    );

    const handleDeleteFile = useCallback(
        (index: number) => {
            const updatedFiles = files.filter((_, i) => i !== index);
            setFiles(updatedFiles);
        },
        [files]
    );

    const handleClearFiles = useCallback(() => {
        setFiles([]);
    }, []);

    return {
        files,
        handleDrop,
        handleFileInput,
        handleDeleteFile,
        handleClearFiles,
        fileInputRef
    };
};

export default useFileUploader;

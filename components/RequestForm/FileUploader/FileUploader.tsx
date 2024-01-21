import React, { DragEventHandler, FC, Ref, useRef, useState } from "react";
import classes from "./fileUploader.module.scss";
import { LuUpload } from "react-icons/lu";
import { Button, Divider } from "@mui/material";
import ViewFiles from "@/components/RequestForm/FileUploader/ViewFiles";
import { use } from "i18next";
import { is } from "immutable";
import { useTranslation } from "next-i18next";

interface IFileUploaderProps {
    files: File[];
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleFileInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeleteFile: (index: number) => void;
    handleClearFiles: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;

}

const FileUploader: FC<IFileUploaderProps> = ({ files, handleDrop, handleFileInput, handleDeleteFile, handleClearFiles, fileInputRef }) => {


    const [isDragHover, setDragIsHover] = useState(false);


    const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsHover(true);
    };

    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsHover(false);
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        onDragLeave(event);
        handleDrop(event);
    };


    const onClick = () => {
        if (fileInputRef?.current) {
            fileInputRef.current.click();
        }
    };

    const [isOpen, setIsOpen] = useState(false)
    const {t} = useTranslation()

    return (
        <>
            <ViewFiles
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)}
                files={files}
                handleDeleteFile={handleDeleteFile}
                handleClearFiles={handleClearFiles}
            />

            <div
                onDrop={onDrop}
                onDragOver={onDragStart}
                onDragLeave={onDragLeave}
                onDragStart={onDragStart}
                className={classes.fileUploader}
                style={{ borderStyle: isDragHover ? "dashed" : "solid" }}
            >

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="*"
                    style={{ display: "none" }}
                    onChange={handleFileInput}
                />
                <div className={classes.uploadImage}>
                    <LuUpload size={50} />
                    <div className={classes.text}>
                        {t("create:dragndrop")}
                    </div>
                    <Divider style={{ fontSize: 12 }} flexItem>
                        {t("create:or").toUpperCase()}
                    </Divider>
                    <div
                        className="button create__item-btn create__item-btn-next"
                        onClick={onClick}
                    >
                        {t("create:upload")}
                    </div>
                    <div className={classes.miniText}>
                        {t("create:maxFiles")}
                    </div>

                </div>

            </div>
            {
                files.length
                    ?
                    <div className={classes.seeFiles}>
                        <Button size={'small'} onClick={() => setIsOpen(true)}>
                            {t("create:seeFiles")}
                        </Button>

                        <div className={classes.counter}>
                            {files.length} / <span>30</span>
                        </div>
                    </div>
                    : null
            }

        </>

    );
};

export default FileUploader;
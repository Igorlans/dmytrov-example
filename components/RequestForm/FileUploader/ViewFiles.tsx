import React, { FC } from "react";
import { Button, Drawer } from "@mui/material";
import classes from './fileUploader.module.scss'
import {IoIosClose} from 'react-icons/io'
import FileItem from "@/components/RequestForm/FileUploader/FileItem";
import { useTranslation } from "next-i18next";


interface IViewFilesProps {
    isOpen: boolean;
    handleClose: () => void;
    files: File[];
    handleDeleteFile: (index: number) => void;
    handleClearFiles: () => void;
}

const ViewFiles: FC<IViewFilesProps> = ({
    isOpen,
    handleClose,
    files,
    handleDeleteFile,
    handleClearFiles
                                        }) => {

    const handleClearAll = () => {
        handleClearFiles()
        handleClose()
    }

    const {t} = useTranslation()

    return (
        <Drawer
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
            anchor={"right"}
        >
            <div className={classes.viewFiles}>
                <div className={classes.header}>
                    <div className={classes.title}>{t('create:uploadedFiles')}</div>

                    <IoIosClose style={{cursor: 'pointer'}} size={50} onClick={handleClose}/>
                </div>
                <ul className={classes.list}>
                    {files.map((file, index) => (
                        <FileItem key={index} file={file} handleDeleteFile={handleDeleteFile} index={index} />
                    ))}
                </ul>
                <Button
                    onClick={handleClearAll}
                    style={{alignSelf: 'flex-end'}}
                >
                    {t('create:clearAll')}
                </Button>
            </div>

        </Drawer>
    );
};

export default ViewFiles;
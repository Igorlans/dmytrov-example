import React, { FC } from "react";
import classes from './fileUploader.module.scss'
import { Button, IconButton } from "@mui/material";
import {LuTrash} from 'react-icons/lu'

interface IFileItemProps {
    file: File;
    handleDeleteFile: (index: number) => void;
    index: number;
}

const FileItem: FC<IFileItemProps> = ({
                                          file,
                                          handleDeleteFile,
                                          index
                                      }) => {
    return (
        <li className={classes.item}>
            <div>
                {index + 1}. {file.name}
            </div>
            <IconButton
                onClick={() => handleDeleteFile(index)}
                color={'error'}
            >
                <LuTrash size={20}/>
            </IconButton>

        </li>
    );
};

export default FileItem;
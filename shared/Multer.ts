import multer, {diskStorage, StorageEngine,} from 'multer';
import {extname} from 'path';
import uuid from 'uuid';


interface IFileUpload {
    size?: number;
    allowedExtensions?: string[];
}
// multer Class setup
class FileUpload {
    path: string;
    storageEngine: StorageEngine;

    // roles for file filter
    FileRoles: IFileUpload = {
        size: 8000,
        allowedExtensions: [".png", ".jpg"]
    }

    // set custom role
    set Roles(v: IFileUpload) {
        this.FileRoles = {
            ...this.FileRoles,
            ...v
        }
    }

    constructor(path = "static/images/") {
        this.path = path;
        // storageEngine for multer
        this.storageEngine = diskStorage({
            destination: path,
            filename: (req, file, callback) => {
                callback(null, `IMG-${uuid.v4()}${extname(file.originalname)}`);
            }
        })
    }

    // download images in path
    // @params fieldName is field path in form
    upload = (fieldName: string) => {
        return multer({
            storage: this.storageEngine,
            //file Filters
            fileFilter: (req, file, callback) => {
                //file extension filter
                if (this.FileRoles.allowedExtensions != null &&
                    !(extname(file.originalname) in this.FileRoles.allowedExtensions))
                    callback(new Error("un allowed file extension"));
                // file size filter
                else if (this.FileRoles.size != null &&
                    file.size > this.FileRoles.size)
                    callback(new Error(`size of ${file.size} is larger than ${this.FileRoles.size}`));
            }
        }).single(fieldName);
    }
}

export default FileUpload;

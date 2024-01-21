import JSZip from 'jszip';


const createZipFromFiles = async (filesToZip: File[]): Promise<Blob> => {
    const zip = new JSZip();

    filesToZip.forEach((file) => {
        zip.file(file.name, file);
    });

    return await zip.generateAsync({ type: 'blob' });
};

export default createZipFromFiles;

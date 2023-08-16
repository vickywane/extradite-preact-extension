import {FileProps} from "~components/File";

export const MockFiles: FileProps[] = [
    {
        id: '1',
        upload_timestamp: new Date(),
        fileUrl:
            'https://res.cloudinary.com/dkfptto8m/image/upload/v1645390535/plant_placeholder.png',
        provider: 'cloudinary',
        fileName: 'Testfile.png',
    },
    {
        id: '1',
        upload_timestamp: new Date(),
        fileUrl:
            'https://res.cloudinary.com/dkfptto8m/image/upload/v1645390535/plant_placeholder.png',
        provider: 'AWS S3',
        fileName: 'NewFile.png',
    },
    {
        id: '1',
        upload_timestamp: new Date(),
        fileUrl:
            'https://res.cloudinary.com/dkfptto8m/image/upload/v1645390535/plant_placeholder.png',
        provider: 'GCP Blob',
        fileName: 'Badfile.png',
    },
];

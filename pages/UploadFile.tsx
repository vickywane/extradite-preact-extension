import {useNavigate} from "react-router-dom"
import "../styles/app.css"
import {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import File, {FileProps} from '../components/File';
import {ApiClient} from '../utils/api';
import AssetPreview from '../components/Preview'
import Header from "~components/Header";
import Wrapper from '../utils/Wrapper'

interface FileType {
    path: string;
    lastModified: 1689079453229;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string;
}

type ViewType = 'FILES_OVERVIEW' | 'FILE_UPLOAD';
type RequestStatusType = 'IDLE' | 'IN_PROGRESS' | 'COMPLETE';

export const UploadFile = () => {
    const navigation = useNavigate()
    const [blobLink, setBlobLink] = useState('');
    const [requestStatus, setRequestStatus] = useState<RequestStatusType>('IDLE');
    const [blobFile, setBlobFile] = useState<null | FileType>(null);
    const [notification, setNotification] = useState<SnackbarNotificationProps>({
        isVisible: false,
        message: '',
        type: '',
    });

    const onDrop = useCallback(
        (acceptedFiles: any) => setBlobFile(acceptedFiles[0]),
        []
    );
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    const resetExtraditeState = () => {
        setBlobFile(null);
        setBlobLink('');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            setRequestStatus('IN_PROGRESS');

            await ApiClient({
                method: 'POST',
                endpoint: `/extract?assetUrl=${blobLink}`,
                body: {
                    assetUrl: blobLink,
                },
            });

            resetExtraditeState();

            setNotification(state => {
                state.isVisible = true;
                state.message = 'Your asset has been uploaded into your bucket';
                state.type = 'success';

                return state;
            });
        } catch (e) {
            console.log(e);
        } finally {
            setRequestStatus('IDLE');
        }
    };

    useEffect(() => {
        if (notification.isVisible) {
            setTimeout(() => {
                setNotification(state => {
                    state.isVisible = false;
                    state.message = '';
                    state.type = '';

                    return state;
                });

                console.log('TIMEOUT FIRED', notification);
            }, 3000);
        }
    }, [notification.isVisible]);

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <div className={'mb-4'}>
                    <label className={'text-base'}> File Link </label>

                    <input
                        onChange={e => setBlobLink(e.target.value)}
                        value={blobLink}
                        placeholder={'Enter file link...'}
                        className='mt-2 h-12 w-full border p-4'
                    />
                </div>

                {blobLink.length < 2 && (
                    <div className={'my-6'}>
                        {blobFile ? (
                            <div>
                                <AssetPreview
                                    url={''}
                                    name={blobFile.name}
                                    handlePreviewRemove={resetExtraditeState}
                                />
                            </div>
                        ) : (
                            <div>
                                <p className={'mb-2 text-base'}> Local File </p>

                                <div
                                    {...getRootProps()}
                                    className='flex h-24 cursor-pointer items-center justify-center rounded border-2 border-dashed border-[#757872] bg-gray-100'
                                >
                                    <input {...getInputProps()} />

                                    <p>
                                        {isDragActive
                                            ? 'Drop File Here'
                                            : "Drag 'n' drop local file "}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {blobLink.length > 2 && (
                    <AssetPreview
                        url={blobLink}
                        name={'Asset File'}
                        handlePreviewRemove={resetExtraditeState}
                    />
                )}

                <div className={'mb-2 mt-6'}>
                    <p className={'mb-2 text-base'}> Asset Destination </p>

                    <div>
                        <ul>
                            <li>
                                <p> Cloudinary </p>
                            </li>

                            <li>
                                <p> AWS S3 </p>
                            </li>

                            <li>
                                <p> Google Cloud Bucket </p>
                            </li>

                            <li>
                                <p> Azure Blob </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={'flex justify-between'}>
                    <button
                        disabled={blobLink.length < 2}
                        onClick={handleSubmit}
                        className='mt-4 flex h-10 w-[170px]  cursor-pointer items-center justify-center rounded bg-[#DEDEDD] text-center'
                    >
                        {requestStatus === 'IN_PROGRESS' ? 'Extraditing' : 'Extradite'}
                    </button>

                    <button
                        onClick={() => navigation("/")}
                        className='mt-4 flex h-10 w-[170px]  cursor-pointer items-center justify-center rounded bg-[#DEDEDD] text-center'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};



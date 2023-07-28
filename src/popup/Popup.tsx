import { LuSettings } from 'react-icons/lu';
import { SlOptions } from 'react-icons/sl';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useDropzone } from 'react-dropzone';
import File, { FileProps } from './components/File';
import { ApiClient } from './utils/api';

const MockFiles: FileProps[] = [
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

interface AssetPreviewProps {
  url: string;
  handlePreviewRemove: () => void;
  name: string;
}

interface FileType {
  path: string;
  lastModified: 1689079453229;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
}

const AssetPreview = ({
  url,
  name,
  handlePreviewRemove,
}: AssetPreviewProps) => (
  <div className={'my-4'}>
    <p className={'mb-2 text-lg text-gray-500'}> Preview </p>

    <img alt={name} src={url} className={'h-[150px] w-full object-cover'} />

    <div className={'mt-2 flex w-full justify-between'}>
      <div>
        <p> {name} </p>
      </div>

      <div onClick={handlePreviewRemove}>
        <p> Remove </p>
      </div>
    </div>
  </div>
);

interface SnackbarNotificationProps {
  message: string;
  isVisible: boolean;
  type: '' | 'success' | 'failure';
}

const SnackbarNotification = ({
  message,
  isVisible,
  type,
}: SnackbarNotificationProps) => {
  if (!isVisible) return null;

  return (
    <div
      style={{ background: type === 'failure' ? 'red' : 'green' }}
      className={'align-center flex h-10 w-full items-center bg-[red]'}
    >
      <p className={'text-center'}> {message} </p>
    </div>
  );
};

type ViewType = 'FILES_OVERVIEW' | 'FILE_UPLOAD';
type RequestStatusType = 'IDLE' | 'IN_PROGRESS' | 'COMPLETE';

const Popup = () => {
  const [currentView, setCurrentView] = useState<ViewType>('FILE_UPLOAD');
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
    <div class='w-[400px]'>
      <div className={'flex justify-between bg-[#DEDEDD] p-3'}>
        <div>
          <p className={'text-base'}> Extradite </p>
        </div>

        <div className={'flex cursor-pointer items-center text-xl'}>
          <LuSettings />
        </div>
      </div>

      <SnackbarNotification
        isVisible={notification.isVisible}
        message={notification.message}
        type={notification.type}
      />

      {currentView === 'FILES_OVERVIEW' ? (
        <div className={'p-4'}>
          <div>
            <p className={'text-lg'}> Recent Files </p>

            <ul className={'mb-6 mt-4'}>
              {MockFiles.map((file, idx) => (
                <li key={idx} className={'mb-6'}>
                  <File {...file} />
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setCurrentView('FILE_UPLOAD')}
            className='mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded bg-[#DEDEDD] text-center'
          >
            Extradite A File
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={'my-2 p-4'}>
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
              onClick={() => setCurrentView('FILES_OVERVIEW')}
              className='mt-4 flex h-10 w-[170px]  cursor-pointer items-center justify-center rounded bg-[#DEDEDD] text-center'
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Popup;

import { GoLinkExternal } from 'react-icons/go';

export interface FileProps {
  id: string;
  fileName: string;
  provider: string;
  upload_timestamp: Date;
  fileUrl: string;
}

const File = ({ fileName, fileUrl, provider, upload_timestamp }: FileProps) => (
  <div className={'flex'}>
    <div className={'mr-2'}>
      <img
        className={'h-[45px] rounded object-cover'}
        src={fileUrl}
        alt='Testfile.png'
      />
    </div>

    <div className={'flex w-full justify-between'}>
      <div>
        <p className={'text-lg'}>
          <a target={'_blank'} rel='no-opener' href={fileUrl}>
            {fileName}
          </a>
        </p>
        <p className='text-gray-500'>
          Uploaded at {upload_timestamp.toLocaleDateString()} to
          <span className={'ml-1 font-semibold text-gray-800'}>
            {provider}
          </span>{' '}
        </p>
      </div>

      <div className={'flex items-center text-xl'}>
        <GoLinkExternal />
      </div>
    </div>
  </div>
);

export default File;

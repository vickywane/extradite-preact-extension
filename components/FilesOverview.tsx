import "../styles/app.css"
import File, {FileProps} from '../components/File';
import {MockFiles} from "~data/mock";
import {useNavigate} from "react-router-dom";

const FilesOverview = () => {
    const navigate = useNavigate()

    return (
        <div>
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
                onClick={() => navigate('/upload')}
                className='mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded bg-[#DEDEDD] text-center'
            >
                Extradite A File
            </button>
        </div>
    );
};

export default FilesOverview



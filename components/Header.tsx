import {useNavigate} from "react-router-dom"
import "../styles/app.css"
import {LuSettings} from 'react-icons/lu'

const Header = () => {
    const navigation = useNavigate()

    return (
        <div className={'flex justify-between bg-[#DEDEDD] p-3'}>
            <div>
                <p
                    onClick={() => navigation("/")}
                    className={'text-base cursor-pointer'}> Extradite </p>
            </div>

            <div onClick={() => navigation("/settings")} className={'flex cursor-pointer items-center text-xl'}>
                <LuSettings/>
            </div>
        </div>
    );
};

export default Header

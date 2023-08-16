import "~styles/app.css"
import { useEffect, useState} from 'react';
import SnackbarNotification from "~components/SnackbarNotification";
import Wrapper from '~utils/Wrapper'
import FilesOverview from "~components/FilesOverview";

type ViewType = 'FILES_OVERVIEW' | 'FILE_UPLOAD';

export const Home = () => {
    const [currentView, setCurrentView] = useState<ViewType>('FILE_UPLOAD');
    const [notification, setNotification] = useState<SnackbarNotificationProps>({
        isVisible: false,
        message: '',
        type: '',
    });

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
            <SnackbarNotification
                isVisible={notification.isVisible}
                message={notification.message}
                type={notification.type}
            />

            <FilesOverview />
        </Wrapper>
    );
};



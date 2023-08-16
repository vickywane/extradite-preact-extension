interface SnackbarNotificationProps {
    message: string;
    isVisible: boolean;
    type: '' | 'success' | 'failure';
}

const SnackbarNotification = ({ message, isVisible, type,}: SnackbarNotificationProps) => {
    if (!isVisible) return null;

    return (
        <div
            style={{background: type === 'failure' ? 'red' : 'green'}}
            className={'flex items-center h-10 w-full mb-6'}
        >
            <p className={'text-center text-white w-full'}> {message} </p>
        </div>
    );
};

export default SnackbarNotification
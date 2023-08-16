interface AssetPreviewProps {
    url: string;
    handlePreviewRemove: () => void;
    name: string;
}

const AssetPreview = ({
                          url,
                          name,
                          handlePreviewRemove,
                      }: AssetPreviewProps) => (
    <div className={'my-4'}>
        <p className={'mb-2 text-lg text-gray-500'}> Preview </p>

        <img alt={name} src={url} className={'h-[150px] w-full object-cover'}/>

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

export default AssetPreview
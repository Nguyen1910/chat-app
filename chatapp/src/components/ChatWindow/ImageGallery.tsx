import { useAppContext } from "../../Context/AppProvider";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const { setImageList, setVisibleModal, setIndexImg } = useAppContext();

  return (
    <div className=" flex flex-wrap justify-end">
      {images?.map((image: any, index: number) => (
        <img
          key={index}
          src={image}
          alt=""
          className="w-[120px] object-cover rounded-lg p-1 hover:opacity-75 cursor-pointer"
          onClick={() => {
            setVisibleModal(true);
            setImageList(images);
            setIndexImg(index);
          }}
        />
      ))}
    </div>
  );
};

export default ImageGallery;

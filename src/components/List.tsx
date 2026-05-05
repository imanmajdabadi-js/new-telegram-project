type ImageItem = {
  src: string;
  id: number;
  alt?: string;
};

type ListProps = {
  images: ImageItem[];
};

const List = ({ images }: ListProps) => {
  return (
    <div>
      {images.map((item) => (
        <img key={item.id} src={item.src} alt={item.alt ?? ''} style={{ width: '300px' }} />
      ))}
    </div>
  );
};

export default List;
// 1003996414901

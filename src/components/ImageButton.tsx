import "./ImageButton.scss";

interface ImageButtonProps {
  src: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  alt?: string;
  className?: string;
  selected?: boolean;
}

export const ImageButton: React.FC<ImageButtonProps> = ({
  src,
  alt = "",
  onClick = () => {},
  className = "",
  selected = false,
}) => {
  return (
    <div className="image-button">
      <div className="image-button-overlay" data-selected={selected} />
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        className={className}
        data-selected={selected}
      />
    </div>
  );
};

import "./Textarea.scss";

export const Textarea = ({
  value,
  onChange = () => {},
  onClick = () => {},
  placeholder,
  readOnly = false,
}: {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
}) => (
  <textarea
    placeholder={placeholder}
    className="textarea"
    value={value}
    onChange={onChange}
    onClick={onClick}
    readOnly={readOnly}
  />
);

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
    style={{
      width: "100%",
      height: "200px",
      padding: "1rem",
      borderRadius: "15px",
      marginBottom: "20px",
    }}
    value={value}
    onChange={onChange}
    onClick={onClick}
    readOnly={readOnly}
  />
);

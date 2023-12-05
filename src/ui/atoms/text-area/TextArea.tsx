import cl from './TextArea.module.scss';

interface TextAreaProps {
  placeholder?: string;
  children?: React.ReactNode;
}

export const TextArea = ({ placeholder, children }: TextAreaProps) => {
  return (
    <textarea placeholder={placeholder} className={cl.textarea}>
      {children}
    </textarea>
  );
};

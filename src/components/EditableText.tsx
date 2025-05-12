import { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  placeholder?: string;
}

export default function EditableText({ value, onChange, className = '', placeholder }: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  const handleBlur = () => {
    setEditing(false);
    onChange(tempValue.trim() || placeholder || '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') inputRef.current?.blur();
  };

  return editing ? (
    <input
      ref={inputRef}
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`bg-transparent outline-none focus:ring-0 ${className}`}
    />
  ) : (
    <span onClick={() => setEditing(true)} className={`cursor-pointer ${className}`}>
      {value}
    </span>
  );
}
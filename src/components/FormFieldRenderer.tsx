import { Trash2 } from 'lucide-react';
import type { FormElement } from '../types/form';

interface Props {
  element: FormElement;
  update: (changes: Partial<FormElement>) => void;
}

export default function FormFieldRenderer({ element, update }: Props) {
  const handleOptionChange = (index: number, value: string) => {
    const updated = [...(element.options || [])];
    updated[index] = value;
    update({ options: updated });
  };

  const addOption = () => {
    update({ options: [...(element.options || []), `Option ${(element.options?.length ?? 0) + 1}`] });
  };

  const removeOption = (index: number) => {
    const updated = [...(element.options || [])];
    updated.splice(index, 1);
    update({ options: updated });
  };

  switch (element.type) {
    case 'text':
      return (
        <input
          type="text"
          placeholder={`Enter ${element.label}`}
          className="w-full mt-2 px-3 py-2 border border-gray-100 rounded text-sm bg-white"
        />
      );
    case 'paragraph':
      return (
        <textarea
          placeholder={`Enter ${element.label}`}
          className="w-full mt-2 px-3 py-2 border border-gray-100 rounded text-sm bg-white"
          rows={4}
        />
      );
    case 'checkbox':
      return (
        <div className="space-y-2">
          {(element.options || []).map((option, index) => (
            <div key={index} className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-3 h-3">
              <div className="w-3 h-3 border border-gray-100 rounded"></div>
            </div>
            <input
              value={option}
              placeholder={`Option ${index + 1}`}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full px-2 py-1 border border-gray-100 rounded text-sm bg-white text-black"
            />
            <button onClick={() => removeOption(index)} className="text-red-500 text-sm">
              <Trash2 size={14} />
            </button>
          </div>
          
          ))}
          <button onClick={addOption} className="mt-2 text-xs text-gray-600 border border-gray-300 bg-white px-2 py-1 rounded">Add option</button>
        </div>
      );
      case 'select':
        return (
          <div className="space-y-2">
            <select disabled className="w-full rounded px-2 py-3 text-sm bg-white text-gray-400">
              <option>Select an option</option>
            </select>
            {element.options && element.options.length > 0 && (
              <div className="text-sm text-gray-600">Options:</div>
            )}
            {(element.options || []).map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="w-full px-2 py-1 border border-gray-100 rounded text-sm bg-white text-black"
                />
                <button onClick={() => removeOption(index)} className="text-red-500 text-sm"><Trash2 size={14}/></button>
              </div>
            ))}
            <button onClick={addOption} className="mt-2 text-xs text-gray-600 border border-gray-300 bg-white px-2 py-1 rounded">Add option</button>
          </div>
        );
    default:
      return null;
  }
}
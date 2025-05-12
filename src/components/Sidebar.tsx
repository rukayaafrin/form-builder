import { Type, FileText, CheckSquare, List } from 'lucide-react';
import type { FormElementType } from '../types/form';

interface SidebarProps {
  onAdd: (type: FormElementType) => void;
}

export default function Sidebar({ onAdd }: SidebarProps) {
  return (
    <div className="w-64 bg-white rounded-xl p-5 shadow">
      <h2 className="text-lg font-semibold mb-4 text-center">Add Form Elements</h2>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onAdd('text')} className="flex flex-col items-center justify-center shadow text-sm rounded-md px-4 py-2 hover:bg-gray-50">
          <Type size={20} /> Text
        </button>
        <button onClick={() => onAdd('paragraph')} className="flex flex-col items-center justify-center shadow text-sm rounded-md px-4 py-2 hover:bg-gray-50">
          <FileText size={20} /> Paragraph
        </button>
        <button onClick={() => onAdd('checkbox')} className="flex flex-col items-center justify-center shadow text-sm rounded-md px-4 py-2 hover:bg-gray-50">
          <CheckSquare size={20} /> Checkbox
        </button>
        <button onClick={() => onAdd('select')} className="flex flex-col items-center justify-center shadow text-sm rounded-md px-4 py-2 hover:bg-gray-50">
          <List size={20} /> Select
        </button>
      </div>
    </div>
  );
}
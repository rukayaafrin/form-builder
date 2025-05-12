import { useNavigate, useLocation } from 'react-router-dom';
import { Save, FileText } from 'lucide-react';
import { useFormContext } from '../hooks/useFormContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPreviewMode = location.pathname === '/preview';
  const { formTitle, formDescription, formElements } = useFormContext();

  const handleSave = () => {
    alert('Form saved!');
  };

  const handlePreview = () => {
    navigate('/preview', {
      state: {
        formTitle,
        formDescription,
        formElements,
      },
    });
  };

  return (
    <nav className="bg-white shadow px-6 py-4 rounded-t-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="text-purple-600" />
          <span className="text-lg font-semibold text-gray-800">Form Builder</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm"
          >
            <Save size={16} />
            Save
          </button>

          {!isPreviewMode ? (
            <button
              onClick={handlePreview}
              className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm"
            >
              Preview Form
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="inline-flex bg-purple-100 items-center gap-2 border border-purple-700 hover:border-gray-400 text-purple-700 font-bold px-4 py-2 rounded-md text-sm"
            >
              Edit Form
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

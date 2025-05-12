import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';
import { FormProvider } from './utils/FormContext'; 

export default function App() {
  return (
    <FormProvider>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<BuilderPage />} />
          <Route path="preview" element={<PreviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </FormProvider>
    
  );
}

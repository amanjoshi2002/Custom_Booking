"use client"
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import Toast from '../components/Toast';
import LoadingOverlay from '../components/LoadingOverlay';
import { useStyles } from '../contexts/StyleContext';
import { useSession } from "next-auth/react";
import { StyleType } from '../interface/styles';

const Form: React.FC = () => {
  const { styles: currentStyles, setStyles } = useStyles();
  const { data: session } = useSession();
  const [style, setStyle] = useState<StyleType>({
    backgroundColor: '',
    textColor: '',
    buttonColor: '',
    logoColor: '',
    hoverColor: '',
    logoname: '',
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const filteredStyles = Object.keys(style).reduce((acc, key) => {
      if (key in currentStyles) {
        acc[key as keyof StyleType] = currentStyles[key as keyof typeof currentStyles];
      }
      return acc;
    }, {} as StyleType);
    
    setStyle(filteredStyles);
  }, [currentStyles]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStyle({ ...style, [e.target.name]: e.target.value });
  };

  const handleSaveAndApply = async () => {
    if (!session?.user) {
        setToast({ message: 'User not authenticated', type: 'error' });
        return;
    }
    setIsSubmitting(true);
    try {
        console.log('Saving style:', style);
        const response = await fetch('/api/saveStyle', { // Ensure this endpoint saves the style
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...style, userId: (session.user as any).id ?? session.user.email ?? 'unknown' }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Style saved successfully:', data.message);
        setToast({ message: 'Style saved successfully', type: 'success' });

        // Apply the new styles in real-time
        setStyles({ ...currentStyles, ...style });
    } catch (error) {
        console.error('Error saving style:', error);
        setToast({ message: 'Error saving style', type: 'error' });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <>  
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={(e) => e.preventDefault()} className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Style Configuration</h2>
          {Object.entries(style).map(([key, value]) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:  </label>
              <div className="flex items-center">
                <input
                  type={key === 'logoname' ? 'text' : 'color'}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className={`p-1 border border-gray-300 rounded ${key === 'logoname' ? 'w-full' : 'w-12 h-8 mr-2'}`}
                />
                {key !== 'logoname' && (
                  <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    name={key}
                    className="p-2 border border-gray-300 rounded flex-grow"
                  />
                )}
              </div>
            </div>
          ))}
          <button 
            type="button" 
            className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            onClick={handleSaveAndApply} // Saves and applies the style
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save and Apply'}
          </button>
        </form>
      </div>
      {isSubmitting && <LoadingOverlay message="Saving style..." />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Footer />
    </>
  );
};

export default Form;
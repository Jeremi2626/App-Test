import Navbar from './components/Navbar';
import Form from './components/Form';
import axios from 'axios';

const App = () => {
  const API_KEY = `${import.meta.env.VITE_API_KEY}`;
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 to-blue-300 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Navbar />
        <Form />

      </div>
    </div>
  );
};

export default App;

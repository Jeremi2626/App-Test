import React, { useState } from 'react';
import { Search } from 'lucide-react';  

const Form = () => {
    const [city, setCity] = useState('');
    

    const handleSearch = (e) => {
        e.preventDefault();
      console.log(city);
        
      };


  return (
    <div className="bg-cyan-100 rounded-3xl p-6 w-80 shadow-xl text-center relative">
    <form onSubmit={handleSearch} className="flex mb-4 gap-2">
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 rounded-xl p-2 text-sm focus:outline-none"
        placeholder="Buscar ciudad..."
      />
      <button type="submit" className="bg-cyan-400 rounded-xl px-2 text-white">
        <Search size={16} />
      </button>
    </form> 
    </div>
  )
}

export default Form
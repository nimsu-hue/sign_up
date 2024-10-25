'use client'
import { useState, FormEvent } from 'react';

export default function Home() {
  const [name, setName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, mail, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Cuenta creada exitosamente');

      setName('');
      setMail('');
      setPassword('');
    } else {
      alert(data.message || 'Error al crear la cuenta');
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        id="form-users"
        className="w-full max-w-[600px] min-h-[300px] rounded-[20px] p-[15px] flex flex-col justify-center items-center gap-[20px]"
      >
        <label className='w-[300px]'>
          Nombre del usuario <span className='text-red-500'>*</span>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Smith Jhonson"
            required
            className="w-[300px] p-[10px] rounded-[5px] text-black mt-[10px] bg-zinc-100"
          />
        </label>
        <label className='w-[300px]'>
          Correo Electronico <span className='text-red-500'>*</span>
          <input
            type="email"
            id="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="username@gmail.com"
            pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
            required
            className="w-[300px] p-[10px] rounded-[5px] text-black mt-[10px] bg-zinc-100"
          />
        </label>
        <label className='w-[300px]'>
          Contraseña <span className='text-red-500'>*</span>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="e8M(#F1J(3sQC-"
            pattern="(?=.*\d).{8,}"
            required
            className="w-[300px] p-[10px] rounded-[5px] text-black mt-[10px] bg-zinc-100"
          />
        </label>
        <button type="submit" className="w-[300px] p-[10px] rounded-[5px] cursor-pointer bg-zinc-900 md:hover:bg-zinc-950 text-white">
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}

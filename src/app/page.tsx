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
        className="bg-zinc-700 text-white w-full max-w-[600px] min-h-[300px] rounded-[20px] p-[15px] flex flex-col justify-center items-center gap-[20px]"
      >
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre Completo"
          required
          className="w-[300px] p-[10px] rounded-[5px] text-black"
        />
        <input
          type="email"
          id="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="Correo Electronico"
          required
          className="w-[300px] p-[10px] rounded-[5px] text-black"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
          className="w-[300px] p-[10px] rounded-[5px] text-black"
        />
        <button type="submit" className="w-[300px] p-[10px] rounded-[5px] cursor-pointer bg-zinc-900 md:hover:bg-zinc-950">
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}

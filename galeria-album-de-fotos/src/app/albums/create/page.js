"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateAlbum() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAlbum = { titulo, descricao };
    
    fetch("http://localhost:3001/api/albums/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAlbum),
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/albumlista");  // Redirect to the album list
      })
      .catch((err) => console.error("Error creating album", err));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300 border-gray-600">
    <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Criar album</h2>

        {mensagemSucesso && <p className="bg-green-300 my-4 rounded py-2 text-green-700 text-center">{mensagemSucesso}</p>}
        {mensagemErro && <p className="text-red-600 text-center">{mensagemErro}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" placeholder="Titulo do Album" className="w-full p-2 border rounded" maxLength='50' value={titulo} required onChange={(e) => setTitulo(e.target.value)}/>
            <input type="text" placeholder="Descrição" className="w-full p-2 border rounded" value={descricao} required onChange={(e) => setDescricao(e.target.value)}/>

            <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded hover:bg-gray-600">Criar</button>

            <Link href="../../albumlista"><button className="w-full bg-green-500 text-white px-4 py-2 my-2 rounded hover:bg-red-400">Voltar</button></Link>
            
        </form>
    </div>
</div>
  );
}

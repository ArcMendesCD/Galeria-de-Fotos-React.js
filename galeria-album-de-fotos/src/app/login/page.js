"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation"

export default function Login(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {
            email,
            senha
        };

        try {
            const response = await fetch('http://localhost:3001/api/usuarios/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
      
            if (response.ok) {
              const result = await response.json();
              setMensagemSucesso(result.message);

              setEmail("");
              setSenha("");

              router.push("/albumlista")

            } else {
              const error = await response.json();
              setMensagemErro(error.message); 
            }
          } catch (error) {
            setMensagemErro("Erro ao fazer login. Tente novamente.");
          }

        console.log("Email:", email, "Senha:", senha);
      };
      return(
        <div className="flex justify-center items-center h-screen bg-gray-300 border-gray-600">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

                {mensagemSucesso && <p className="bg-green-300 my-4 rounded py-2 text-green-700 text-center">{mensagemSucesso}</p>}
                {mensagemErro && <p className="text-red-600 text-center">{mensagemErro}</p>}

                <form onSubmit={handleLogin} className="space-y-4">

                    <input type="email" placeholder="E-mail" className="w-full p-2 border rounded" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Senha" className="w-full p-2 border rounded" value={senha} required onChange={(e) => setSenha(e.target.value)}/>

                    <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded hover:bg-gray-600">Fazer Login</button>

                    <Link href="/register"><button className="w-full bg-red-700 text-white px-4 py-2 my-2 rounded hover:bg-red-400">Registrar</button></Link>
                    
                </form>
            </div>
        </div>
      );
}
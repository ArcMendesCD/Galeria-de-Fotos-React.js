"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export default function Register(){

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Nome:", nome, "Email:", email, "Senha:", senha);
      };
      return(
        <div className="flex justify-center items-center h-screen bg-gray-300 border-gray-600">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Registrar</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" placeholder="Nome" className="w-full p-2 border rounded" maxLength='50' value={nome} required onChange={(e) => setNome(e.target.value)}/>
                    <input type="email" placeholder="E-mail" className="w-full p-2 border rounded" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                    <input type="senha" placeholder="Senha" className="w-full p-2 border rounded" value={senha} required onChange={(e) => setSenha(e.target.value)}/>

                    <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded hover:bg-gray-600">Cadastrar</button>

                    <Link href="/login"><button className="w-full bg-green-500 text-white px-4 py-2 my-2 rounded hover:bg-red-400">Voltar</button></Link>
                    
                </form>
            </div>
        </div>
      );
}
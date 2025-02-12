"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export default function Login(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Senha:", senha);
      };
      return(
        <div className="flex justify-center items-center h-screen bg-gray-300 border-gray-600">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">

                    <input type="email" placeholder="E-mail" className="w-full p-2 border rounded" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                    <input type="senha" placeholder="Senha" className="w-full p-2 border rounded" value={senha} required onChange={(e) => setSenha(e.target.value)}/>

                    <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded hover:bg-gray-600">Fazer Login</button>

                    <Link href="/register"><button className="w-full bg-red-700 text-white px-4 py-2 my-2 rounded hover:bg-red-400">Registrar</button></Link>
                    
                </form>
            </div>
        </div>
      );
}
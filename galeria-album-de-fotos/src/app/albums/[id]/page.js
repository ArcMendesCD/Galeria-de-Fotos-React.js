"use client";

import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import Card from "../../components/card";
import { useParams } from "next/navigation";

import { useState, useEffect } from "react";

export default function Album(){
  const { id } = useParams();

  const [fotos, setFotos] = useState([]);
  const [albums, setAlbums] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:3001/api/albums/select_fotos/${id}`)
      .then((res) => res.json())
      .then((data) => setFotos(data));
  }, [id]);

      return(
        <div className="flex justify-center items-center h-screen bg-gray-300 border-gray-600">
        <div className="bg-white p-6 rounded-md shadow-lg w-[90%]">
        <a
          href="../../albumlista"
          className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 transition"
        >
          Voltar a lista
        </a>
            <h2 className="text-2xl font-semibold text-center mb-4">Fotos do Álbum</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {fotos.map((foto) => (
                  <Link key={foto.id} href={``} passHref>
                    <div className="cursor-pointer">
                      <Card
                        key={foto.id}
                        titulo={foto.titulo}
                        descricao={foto.descricao}
                        imagem=''
                      />
                    </div>
                  </Link>
                ))}
              </div>    
        </div>
        <Link href="/fotos/create">
          <div className="fixed bottom-8 right-8 bg-red-500 text-white rounded-full p-4 shadow-lg hover:bg-red-600 transition cursor-pointer">
            <span className="text-2xl font-bold">+</span>
          </div>
        </Link>
    </div>
      );
}
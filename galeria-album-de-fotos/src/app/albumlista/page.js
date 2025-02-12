"use client";

import Image from "next/image";
import Link from "next/link";
import Card from "../components/card";

import { useState, useEffect } from "react";

export default function AlbumLista(){
  const [albums, setAlbums] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3001/api/albums/select")
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

      return(
        <div className="flex justify-center items-center h-screen bg-gray-300 border-gray-600">
            <div className="bg-white p-6 rounded-md shadow-lg w-[90%]">
                <h2 className="text-2xl font-semibold text-center mb-4">Lista</h2>
                {albums.map((album) => (
                  <Card
                    key={album.id}
                    titulo={album.titulo}
                    descricao={album.descricao}
                    imagem=''
                  />
                ))}
            </div>
        </div>
      );
}
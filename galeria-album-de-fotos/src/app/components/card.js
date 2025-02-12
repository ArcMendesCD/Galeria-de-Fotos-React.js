"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export default function Card({ titulo, descricao, imagem }) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src='' alt="Loading" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{titulo}</div>
          <p className="text-gray-700 text-base">
            {descricao}
          </p>
        </div>
      </div>
    );
}
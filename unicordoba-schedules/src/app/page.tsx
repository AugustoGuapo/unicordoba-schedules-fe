"use client";

import { get } from "http";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/ping", { method: "GET"})
      .then(res => res.json())
      .then(data => {
        console.log("Ping recibido:", data);
      })
      .catch(err => {
        console.error("Error en el ping:", err);
      });
  }, []);
  return (
      <section className="flex flex-col items-center justify-center flex-1 px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4">Horarios Unicordoba</h1>
          <p className="text-lg text-gray-600 mb-8">
            ¿Cansado del horario raro de academusoft?
            <br />
            Transfórmalo en algo moderno y portable
          </p>
        </div>

        <div className="flex gap-6">
          <Link href="/tutorial" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >
            Tutorial
          </Link>
          <Link href="/schedule-maker" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Generar horario
          </Link>
        </div>
      </section>
  );
}
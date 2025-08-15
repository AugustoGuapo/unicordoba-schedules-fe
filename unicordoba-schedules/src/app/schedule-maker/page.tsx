"use client";

import { generateScheduleImageFromJSON } from "@/lib/generate-schedule";
import { processSchedule } from "@/types/schedule";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [horarioImg, setHorarioImg] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/schedule-parser", {
        method: "POST",
        body: formData,
        });

        const data = await res.json();

        const imgUrl = await generateScheduleImageFromJSON(processSchedule(data));
        setHorarioImg(imgUrl);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;
        handleUpload(selectedFile);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-gray-50 min-h-screen">
        <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full max-w-md"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                    ${
                    dragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}
            >
            <span className="text-gray-600 text-sm">
                {dragActive
                ? "Suelta el archivo aquí"
                : "Arrastra tu archivo o haz clic para seleccionar"}
            </span>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
            </label>

            {selectedFile && (
            <p className="text-sm text-gray-500">
                Archivo seleccionado:{" "}
                <span className="font-medium">{selectedFile.name}</span>
            </p>
            )}

            <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!selectedFile}
            >
            Procesar horario
            </button>
        </form>

        {horarioImg && (
            <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                <Image
                src={horarioImg}
                alt="Horario generado"
                width={600}
                height={400}
                className="rounded-lg border border-gray-300"
                />
            </div>
            <a
                href={horarioImg}
                download="horario.png"
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
            >
                Descargar imagen
            </a>
            </div>
        )}
        </div>
    );
}

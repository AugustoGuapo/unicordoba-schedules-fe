import { StaticCanvas, Rect, Textbox } from "fabric";
import { ProcessedClass } from "@/types/schedule"

export function generateScheduleImageFromJSON(data: ProcessedClass[]): string {
  const diasOrden = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const horasOrden = [
    "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00",
    "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
  ];

  // Tamaños
  const cellWidth = 150;
  const cellHeight = 50;
  const headerHeight = 40;
  const headerWidth = 80;

  const width = headerWidth + cellWidth * diasOrden.length;
  const height = headerHeight + cellHeight * horasOrden.length;

  // Crear canvas
  const canvas = new StaticCanvas(undefined, {
    width,
    height,
    backgroundColor: "#ffffff",
  });

  // Encabezados de días
  diasOrden.forEach((dia, i) => {
    canvas.add(
      new Rect({
        left: headerWidth + i * cellWidth,
        top: 0,
        width: cellWidth,
        height: headerHeight,
        fill: "#f0f0f0",
        stroke: "#000",
        strokeWidth: 1,
      })
    );
    canvas.add(
      new Textbox(dia, {
        left: headerWidth + i * cellWidth,
        top: 0,
        width: cellWidth,
        height: headerHeight,
        fontSize: 14,
        textAlign: "center",
        fontFamily: "Arial",
        originX: "left",
        originY: "top",
      })
    );
  });

  // Encabezados de horas
  horasOrden.forEach((hora, i) => {
    // Convertir a formato 12h
    const [h, m] = hora.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hora12 = `${((h + 11) % 12) + 1}:${m.toString().padStart(2, "0")} ${ampm}`;

    canvas.add(
      new Rect({
        left: 0,
        top: headerHeight + i * cellHeight,
        width: headerWidth,
        height: cellHeight,
        fill: "#f0f0f0",
        stroke: "#000",
        strokeWidth: 1,
      })
    );
    canvas.add(
      new Textbox(hora12, {
        left: 0,
        top: headerHeight + i * cellHeight,
        width: headerWidth,
        height: cellHeight,
        fontSize: 12,
        textAlign: "center",
        fontFamily: "Arial",
        originX: "left",
        originY: "top",
      })
    );
  });

  // Cuadrícula
  for (let i = 0; i < diasOrden.length; i++) {
    for (let j = 0; j < horasOrden.length; j++) {
      canvas.add(
        new Rect({
          left: headerWidth + i * cellWidth,
          top: headerHeight + j * cellHeight,
          width: cellWidth,
          height: cellHeight,
          fill: "#ffffff",
          stroke: "#000",
          strokeWidth: 1,
        })
      );
    }
  }

  // Clases
  data.forEach((clase) => {
    const diaIndex = diasOrden.indexOf(clase.day);
    const startIndex = horasOrden.indexOf(clase.start);
    const endIndex = horasOrden.indexOf(clase.end);

    if (diaIndex === -1 || startIndex === -1) {
      console.warn(`Clase ${clase.name}: día o hora de inicio no válidos`);
      return;
    }

    let durationBlocks: number;
    
    if (endIndex !== -1) {
      // Si encontramos la hora de fin, calculamos la diferencia
      durationBlocks = endIndex - startIndex;
    } else {
      // Si no encontramos la hora de fin, intentamos calcular basándose en el tiempo
      console.warn(`Clase ${clase.name}: hora de fin "${clase.end}" no encontrada en horario`);
      
      // Parsear las horas para calcular la duración
      try {
        const [startH, startM] = clase.start.split(':').map(Number);
        const [endH, endM] = clase.end.split(':').map(Number);
        
        const startMinutes = startH * 60 + startM;
        const endMinutes = endH * 60 + endM;
        const durationMinutes = endMinutes - startMinutes;
        
        // Asumir que cada bloque es de 1 hora (60 minutos)
        durationBlocks = Math.ceil(durationMinutes / 60);
      } catch (error) {
        console.error(`Error calculando duración para clase ${clase.name}:`, error);
        durationBlocks = 1; // Valor por defecto
      }
    }

    // Asegurar que la duración sea al menos 1 bloque
    durationBlocks = Math.max(1, durationBlocks);

    const x = headerWidth + diaIndex * cellWidth;
    const y = headerHeight + startIndex * cellHeight;
    const heightBlock = durationBlocks * cellHeight;

    // Verificar que no se salga del canvas
    const maxHeight = height - y;
    const finalHeight = Math.min(heightBlock, maxHeight);

    canvas.add(
      new Rect({
        left: x,
        top: y,
        width: cellWidth,
        height: finalHeight,
        fill: "#d1e7dd",
        stroke: "#000",
        strokeWidth: 1,
      })
    );

    canvas.add(
      new Textbox(`${clase.name}\n${clase.classroom ?? "Sin aula"}`, {
        left: x,
        top: y,
        width: cellWidth,
        height: finalHeight,
        fontSize: 12,
        textAlign: "center",
        fontFamily: "Arial",
        originX: "left",
        originY: "top",
      })
    );
  });

  return canvas.toDataURL({format: "png", multiplier: 1});
}
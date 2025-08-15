export async function GET() {
    try {
        const response = await fetch("https://unicordoba-schedules-be.onrender.com");
        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        return Response.json({error: "Cant reach backend"}, {status: 500})
    }
}
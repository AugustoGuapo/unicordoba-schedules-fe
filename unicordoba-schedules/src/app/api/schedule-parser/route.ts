export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return Response.json({error: "File is not present"})
        }

        const backendRes = await fetch("https://unicordoba-schedules-be.onrender.com/schedules/parser", {
            method: "POST",
            body: formData,
        });

        const data = await backendRes.json();
        return Response.json(data);
    } catch (error) {
        return Response.json({error: "error contacting backend"}, {status: 500})
    }
}
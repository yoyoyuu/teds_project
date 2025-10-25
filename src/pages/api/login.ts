export async function POST({ request }: { request: Request }) {
  const { email, password } = await request.json();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
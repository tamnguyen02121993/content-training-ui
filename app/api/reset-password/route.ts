export async function POST(request: Request) {
  const body = await request.json();
  const response = await fetch(
    `${process.env.BASE_API_URL}/auths/reset-password`,
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
      cache: "no-store",
      credentials: "include",
    }
  );

  const result = await response.json();

  return Response.json(result);
}

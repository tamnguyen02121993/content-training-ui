import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const response = await fetch(`${process.env.BASE_API_URL}/auths/sign-in`, {
    method: request.method,
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
    cache: "no-store",
    credentials: "include",
  });
  const { access_token, fullName, email } = await response.json();
  if (access_token) {
    const cookieStore = cookies();
    cookieStore.set("token", access_token, {
      maxAge: 3600,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }

  return Response.json({ access_token, fullName, email });
}

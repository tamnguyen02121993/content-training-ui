import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const isHasToken = cookieStore.has("token");
  if (isHasToken) {
    cookieStore.delete("token");
  }
  return Response.json({
    message: "Sign out successfully",
  });
}

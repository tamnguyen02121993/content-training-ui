import { cookies } from "next/headers";
import { generateCommonHeaders } from "@/utils";

export async function GET(request: Request) {
  const urlArray = request.url.split("?");
  const cookiesStore = cookies();
  const response = await fetch(
    `${process.env.BASE_API_URL}/users?${urlArray[1]}`,
    {
      method: "GET",
      headers: generateCommonHeaders(cookiesStore),
      credentials: "include",
    }
  );

  const users = await response.json();
  return Response.json(users);
}

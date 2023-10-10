import { generateCommonHeaders } from "@/utils";
import { cookies } from "next/headers";

export async function DELETE(request: Request) {
  const urlArray = request.url.split("/");
  const cookiesStore = cookies();
  const response = await fetch(
    `${process.env.BASE_API_URL}/permissions/${urlArray[urlArray.length - 1]}`,
    {
      method: "DELETE",
      headers: generateCommonHeaders(cookiesStore),
      credentials: "include",
    }
  );

  const result = await response.json();
  return Response.json(result);
}

"use server";
import { cookies } from "next/headers";
import { User } from "@/interfaces";
import { ACCESS_TOKEN_KEY } from "@/utils";

export const getUsers = async (): Promise<User[]> => {
  const cookiesStore = cookies();
  const response = await fetch(`${process.env.BASE_API_URL}/users`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Cookie: `${ACCESS_TOKEN_KEY}=${
        cookiesStore.get(ACCESS_TOKEN_KEY)?.value
      }`,
    }),
    cache: "no-store",
    credentials: "include",
  });
  const users = await response.json();
  return users;
};

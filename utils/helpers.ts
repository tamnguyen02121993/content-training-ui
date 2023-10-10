import moment from "moment";
import { ACCESS_TOKEN_KEY, FORMAT_DATE, FORMAT_DATE_TIME } from ".";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const formatDateTime = (
  date: Date | null | undefined,
  withoutTime: boolean = false
) => {
  if (!date) {
    return "";
  }
  if (withoutTime) {
    return moment(date).format(FORMAT_DATE);
  }
  return moment(date).format(FORMAT_DATE_TIME);
};

export const generateCommonHeaders = (cookies: ReadonlyRequestCookies) => {
  const token = cookies.get(ACCESS_TOKEN_KEY)?.value;
  return new Headers({
    "Content-Type": "application/json",
    Cookie: `${ACCESS_TOKEN_KEY}=${token}`,
  });
};

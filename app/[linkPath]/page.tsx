"use client";
import { redirect, useParams } from "next/navigation";

export default function LinkRedirectPage() {
  const params = useParams();
  const linkPath = params.linkPath?.toString() ?? "";
  // TODO: get full long link from db and then redirect to it
  const longLink = "https://www.google.com"; // placeholder
  redirect(longLink);
}

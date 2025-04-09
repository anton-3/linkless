"use server";
import { notFound, redirect } from "next/navigation";
import { getValue } from "../database";
import { BASE_URL, isValidLinkPath } from "../utils";

interface LinkRedirectPageProps {
  params: Promise<{
    linkPath: string;
  }>;
}

export default async function LinkRedirectPage({
  params,
}: LinkRedirectPageProps) {
  const linkPath = (await params).linkPath ?? "";
  if (!isValidLinkPath(linkPath)) {
    notFound();
  }
  const redirectUrl = (await getValue(linkPath)) ?? BASE_URL;
  redirect(redirectUrl);
}

"use server";

import { generateCharacters } from "@/app/lib/utils";

const BASE_URL = process.env.BASE_URL || "https://example.com";
const LINK_LENGTH = parseInt(String(process.env.LINK_LENGTH)) || 6;

async function generateLink(formData: FormData) {
  const longLink = formData.get("link")?.toString() ?? "";
  if (!URL.canParse(longLink)) {
    return {
      error: "invalid URL provided",
    };
  }
  let shortLinkPath = generateCharacters(LINK_LENGTH);

  // TODO: check for no repeats in the db

  const shortLink = BASE_URL + "/" + shortLinkPath;

  // TODO: store this in the db: link points to short

  console.log(`[+] link created: ${shortLink} -> ${longLink}`);
  return {
    shortLink,
  };
}

export { generateLink };

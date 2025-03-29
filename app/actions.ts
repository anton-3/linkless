"use server";

import { BASE_URL, generateCharacters } from "@/app/utils";

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

  // TODO: store this in the db: shortLinkPath points to longLink

  console.log(`[+] link created: ${shortLink} -> ${longLink}`);
  return {
    shortLink,
  };
}

export { generateLink };

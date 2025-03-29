"use server";
import { BASE_URL, generateCharacters, isValidURL } from "./utils";

const LINK_LENGTH = parseInt(String(process.env.LINK_LENGTH)) || 6;

type GenerateLinkActionState = {
  link?: string;
  message?: string;
};

async function generateLink(
  _prevState: GenerateLinkActionState,
  formData: FormData
) {
  const longLink = formData.get("link") as string;
  if (!isValidURL(longLink)) {
    return {
      message: "invalid URL provided",
    };
  }
  let shortLinkPath = generateCharacters(LINK_LENGTH);

  // TODO: check for no repeats in the db

  const shortLink = BASE_URL + "/" + shortLinkPath;

  // TODO: store this in the db: shortLinkPath points to longLink

  console.log(`[+] link created: ${shortLink} -> ${longLink}`);
  return {
    link: shortLink,
  };
}

export { generateLink };
export type { GenerateLinkActionState };

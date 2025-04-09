"use server";
import { getValue, setValue } from "./database";
import { BASE_URL, LINK_LENGTH, generateCharacters, isValidURL } from "./utils";

type GenerateLinkActionState = {
  link?: string;
  message?: string;
};

async function generateLink(
  _prevState: GenerateLinkActionState,
  formData: FormData
) {
  const longLink = String(formData.get("link") || "");
  if (!isValidURL(longLink)) {
    return {
      message: "invalid URL provided",
    };
  }
  let shortLinkPath = generateCharacters(LINK_LENGTH);
  while (await getValue(shortLinkPath)) {
    shortLinkPath = generateCharacters(LINK_LENGTH);
  }

  const shortLink = BASE_URL + "/" + shortLinkPath;
  setValue(shortLinkPath, longLink);

  console.log(`[+] link created: ${shortLink} -> ${longLink}`);
  return {
    link: shortLink,
  };
}

export { generateLink };
export type { GenerateLinkActionState };

const LINK_CHARACTERS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
const LINK_LENGTH = parseInt(String(process.env.LINK_LENGTH)) || 6;
const BASE_URL = process.env.BASE_URL || "https://example.com";

function generateCharacters(length: number): string {
  const characters = [];
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * (LINK_CHARACTERS.length + 1));
    characters.push(LINK_CHARACTERS[index]);
  }
  return characters.join("");
}

function isValidURL(url: string): boolean {
  return URL.canParse(url) && url.startsWith("http");
}

function isValidLinkPath(linkPath: string): boolean {
  return (
    linkPath.length == LINK_LENGTH &&
    [...linkPath].every((char) => LINK_CHARACTERS.includes(char))
  );
}

export {
  generateCharacters,
  isValidURL,
  isValidLinkPath,
  BASE_URL,
  LINK_LENGTH,
};

const LINK_CHARACTERS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
const BASE_URL = process.env.BASE_URL || "https://example.com";

function generateCharacters(length: number): string {
  let characters = [];
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * (LINK_CHARACTERS.length + 1));
    characters.push(LINK_CHARACTERS[index]);
  }
  return characters.join("");
}

export { generateCharacters, BASE_URL };

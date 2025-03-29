"use client";
import { useActionState } from "react";
import { generateLink, GenerateLinkActionState } from "./actions";

const initialState: GenerateLinkActionState = {
  message: "",
  link: "",
};

export default function HomePage() {
  const [state, formAction, pending] = useActionState(
    generateLink,
    initialState
  );
  return (
    <main>
      <div>
        <form action={formAction}>
          <label htmlFor="link">link:</label>
          <input type="url" id="link" name="link" required />
          <p id="error">{state?.message}</p>
          <p id="short-link">{state?.link}</p>
        </form>
      </div>
    </main>
  );
}

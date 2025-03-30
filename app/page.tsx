"use client";
import { useActionState } from "react";
import { generateLink, GenerateLinkActionState } from "./actions";

const initialState: GenerateLinkActionState = {
  message: "",
  link: "https://lnk.dedyn.io/ASDF",
};

export default function HomePage() {
  const [state, formAction] = useActionState(generateLink, initialState);

  const handleCopy = () => {
    if (state.link) {
      navigator.clipboard.writeText(state.link);
    }
  };

  return (
    <div className="w-[70%] py-32 m-auto text-[32px]">
      <form
        action={formAction}
        className="flex flex-col items-center space-y-4"
      >
        <div className="flex flex-row">
          <label htmlFor="link">link &gt;</label>
          <input
            type="url"
            id="link"
            name="link"
            autoFocus
            required
            className="w-2xl ml-4 px-1 py-0.5 border-b-white border-2 outline-none"
          />
        </div>
        <p className="text-red-600">{state?.message}</p>
        <div className="flex flex-row">
          <button onClick={handleCopy}>copy &gt;</button>
          <p className=" ml-4 break-all">{state?.link}</p>
        </div>
      </form>
    </div>
  );
}

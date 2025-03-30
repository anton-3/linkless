"use client";
import { useActionState } from "react";
import { generateLink, GenerateLinkActionState } from "./actions";

const initialState: GenerateLinkActionState = {
  message: "",
  link: "",
};

export default function HomePage() {
  const [state, formAction] = useActionState(generateLink, initialState);

  const handleCopy = () => {
    if (state.link) {
      navigator.clipboard.writeText(state.link);
    }
  };

  return (
    <main className="w-[70%] py-32 m-auto text-2xl sm:text-4xl">
      <div className="flex flex-col items-center space-y-6">
        <form
          action={formAction}
          className="w-full flex flex-row justify-center items-center"
        >
          <label htmlFor="link" className="basis-28 whitespace-nowrap">
            link &gt;
          </label>
          <input
            type="url"
            id="link"
            name="link"
            autoFocus
            required
            className="w-[70%] h-14 ml-4 px-1 py-0.5 border-b-white border-1 outline-none"
          />
        </form>
        <p className="text-red-600">{state?.message}</p>
        {state.link && (
          <div className="w-full flex flex-row justify-center items-center">
            <button
              onClick={handleCopy}
              className="h-14 basis-28 border-white border-1 px-2.5 cursor-pointer"
            >
              copy
            </button>
            <p className="ml-6 break-all">{state?.link}</p>
          </div>
        )}
      </div>
    </main>
  );
}

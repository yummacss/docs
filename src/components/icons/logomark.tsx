import type { ComponentProps } from "react";

// the mark is a Nucleo icon; see NUCLEO-NOTICE.md
export function Logomark(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <circle cx="13.5" cy="6" r="4" />
      <rect x="4" y="10" width="7" height="7" rx="1.75" ry="1.75" />
      <path d="M7.963,7.373c.222-.387,.221-.867-.004-1.252L5.33,1.611c-.454-.775-1.705-.775-2.159,0,0,0,0,0,0,0L.541,6.121c-.225,.385-.226,.865-.004,1.252,.223,.387,.638,.627,1.084,.627H6.879c.446,0,.861-.24,1.084-.627Z" />
    </svg>
  );
}

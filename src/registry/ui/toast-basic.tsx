"use client";

import { Toast } from "@base-ui/react/toast";
import * as React from "react";

export default function ExampleToast() {
  return (
    <Toast.Provider>
      <ToastButton />
      <Toast.Portal>
        <Toast.Viewport className="p-f zi-90 t-a r-4 b-4 m-a d-f w-80">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>

      <style>{`
        .toast-root {
          --gap: 0.75rem;
          --peek: 0.75rem;
          --scale: calc(max(0, 1 - (var(--toast-index) * 0.1)));
          --shrink: calc(1 - var(--scale));
          --height: var(--toast-frontmost-height, var(--toast-height));
          --offset-y: calc(var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) + var(--toast-swipe-movement-y));
          position: absolute;
          right: 0;
          bottom: 0;
          left: auto;
          width: 100%;
          z-index: calc(1000 - var(--toast-index));
          transform-origin: bottom center;
          height: var(--height);
          transform: 
            translateX(var(--toast-swipe-movement-x))
            translateY(calc(var(--toast-swipe-movement-y) - (var(--toast-index) * var(--peek)) - (var(--shrink) * var(--height))))
            scale(var(--scale));
          transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms, height 150ms;
          user-select: none;
        }
        .toast-root::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: calc(var(--gap) + 1px);
        }
        .toast-root[data-expanded] {
          transform: translateX(var(--toast-swipe-movement-x)) translateY(var(--offset-y));
          height: var(--toast-height);
        }
        .toast-root[data-starting-style] {
          transform: translateY(150%);
        }
        .toast-root[data-ending-style] {
          opacity: 0;
          transform: translateY(150%);
        }
        .toast-root[data-ending-style][data-swipe-direction='up'] {
           transform: translateY(calc(var(--toast-swipe-movement-y) - 150%));
        }
        .toast-root[data-ending-style][data-swipe-direction='down'] {
           transform: translateY(calc(var(--toast-swipe-movement-y) + 150%));
        }
        .toast-root[data-ending-style][data-swipe-direction='left'] {
           transform: translateX(calc(var(--toast-swipe-movement-x) - 150%)) translateY(var(--offset-y));
        }
        .toast-root[data-ending-style][data-swipe-direction='right'] {
           transform: translateX(calc(var(--toast-swipe-movement-x) + 150%)) translateY(var(--offset-y));
        }
        .toast-root[data-limited] {
          opacity: 0;
        }
        .toast-content {
          overflow: hidden;
          transition: opacity 250ms;
        }
        .toast-content[data-behind] {
          opacity: 0;
          pointer-events: none;
        }
        .toast-content[data-expanded] {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </Toast.Provider>
  );
}

function ToastButton() {
  const toastManager = Toast.useToastManager();
  const [count, setCount] = React.useState(0);

  function createToast() {
    setCount((prev) => prev + 1);
    toastManager.add({
      title: `Toast ${count + 1} created`,
      description: "This is a toast notification.",
    });
  }

  return (
    <button
      type="button"
      className="d-f h-10 ai-c jc-c br-1 bw-1 bc-silver-4 bg-silver-1 px-4 fs-sm fw-500 c-slate-12 us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8 active:bg-silver-2"
      onClick={createToast}
    >
      Create toast
    </button>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();
  return toasts.map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      className="br-2 bw-1 bc-silver-4 bg-silver-1 bsh-lg p-4 toast-root bg-cp"
    >
      <Toast.Content className="toast-content d-f fd-c g-0">
        <Toast.Title className="fs-md lh-5 fw-500 c-slate-12" />
        <Toast.Description className="fs-sm lh-5 c-slate-9" />
        <Toast.Close
          className="p-a t-2 r-2 d-f d-7 ai-c jc-c br-1 bw-0 bg-transparent c-slate-8 h:bg-silver-2 h:c-slate-12 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8"
          aria-label="Close"
        >
          <XIcon className="d-5" aria-hidden="true" />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Close</title>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

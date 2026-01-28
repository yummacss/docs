"use client";

import { Toast } from "@base-ui/react/toast";
import { XIcon } from "@phosphor-icons/react";
import * as React from "react";

export default function ExampleToast() {
  return (
    <Toast.Provider>
      <ToastButton />
      <Toast.Portal>
        <Toast.Viewport className="p-f zi-10 t-auto r-4 b-4 m-auto d-f w-72">
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
          margin-right: 0;
          z-index: calc(1000 - var(--toast-index));
          transform-origin: bottom center;
          height: var(--height);
          transform: translateX(var(--toast-swipe-movement-x))
            translateY(calc(var(--toast-swipe-movement-y) - (var(--toast-index) * var(--peek)) - (var(--shrink) * var(--height))))
            scale(var(--scale));
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s, height 0.15s;
          user-select: none;
          background-clip: padding-box;
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
        .toast-root[data-starting-style],
        .toast-root[data-ending-style]:not([data-limited]):not([data-swipe-direction]) {
          transform: translateY(150%);
        }
        .toast-root[data-ending-style] {
          opacity: 0;
        }
        .toast-root[data-limited] {
          opacity: 0;
        }
        .toast-content {
          overflow: hidden;
          transition: opacity 0.25s;
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
      className="d-f h-10 ai-c jc-c br-1 bw-1 bc-silver-4 bg-silver-1 px-4 fw-500 c-slate us-none h:bg-silver-2 fv:os-s fv:ow-2 fv:oo--1 fv:oc-blue-8"
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
      className="br-1 bw-1 bc-silver-4 bg-white bsh-md p-4 toast-root"
    >
      <Toast.Content className="toast-content">
        <Toast.Title className="fs-md lh-5 fw-500" />
        <Toast.Description className="fs-sm lh-5 c-slate-6" />
        <Toast.Close
          className="p-a t-2 r-2 d-f h-8 w-8 ai-c jc-c br-1 b-0 bg-transparent c-slate-6 h:bg-silver-1 h:c-slate"
          aria-label="Close"
        >
          <XIcon size={16} />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}

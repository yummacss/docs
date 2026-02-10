"use client";

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { CopyIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import type * as React from "react";

interface LogoContextMenuProps {
  children: React.ReactNode;
}

const logoSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="#413cb8" xmlns="http://www.w3.org/2000/svg">
  <path d="M1,12C1,5.9,5.9,1,12,1c6.1,0,11,4.9,11,11c0,6.1-4.9,11-11,11C5.9,23,1,18.1,1,12z M12,3
	c-5,0-9,4-9,9c0,5,4,9,9,9c5,0,9-4,9-9C21,7,17,3,12,3z M16.2,7c-0.4,0-0.8,0.2-1.1,0.5l-7.7,7.7C7.2,15.4,7,15.8,7,16.2
	c0,0.4,0.2,0.9,0.6,1.2c1.2,1,2.8,1.6,4.4,1.6c1.9,0,3.6-0.7,4.9-2.1c1.3-1.3,2.1-3.1,2.1-4.9c0-1.6-0.6-3.2-1.6-4.4
	C17.1,7.2,16.7,7,16.2,7z"/>
</svg>`;

export function LogoContextMenu({ children }: LogoContextMenuProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(logoSvg);
  };

  const handleDownload = () => {
    const blob = new Blob([logoSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yumma.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <BaseContextMenu.Root>
      <BaseContextMenu.Trigger className="us-none c-p o-n">
        {children}
      </BaseContextMenu.Trigger>
      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner className="zi-50">
          <BaseContextMenu.Popup
            className="bg-white/5 bf-b-md bc-white/10 bw-1 p-1 min-w-40"
            
          >
            <BaseContextMenu.Item
              className="d-f ai-c g-2 px-2 py-1 fs-sm c-white/80 h:bg-white/5 h:c-white c-p o-n fv:bg-white/5"
              onClick={handleCopy}
            >
              <CopyIcon size={16} />
              <span>Copy SVG</span>
            </BaseContextMenu.Item>
            <BaseContextMenu.Item
              className="d-f ai-c g-2 px-2 py-1 fs-sm c-white/80 h:bg-white/5 h:c-white c-p o-n fv:bg-white/5"
              onClick={handleDownload}
            >
              <DownloadSimpleIcon size={16} />
              <span>Download SVG</span>
            </BaseContextMenu.Item>
          </BaseContextMenu.Popup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}

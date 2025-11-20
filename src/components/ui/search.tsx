"use client";

import { OramaSearchBox } from "@orama/react-components";
import { oramaTheme } from "@/themes/theme";

interface SearchProps {
  open: boolean;
  onClose: () => void;
}

export function Search({ open, onClose }: SearchProps) {
  return (
    <OramaSearchBox
      open={open}
      index={{
        endpoint: process.env.NEXT_PUBLIC_ORAMA_ENDPOINT!,
        api_key: process.env.NEXT_PUBLIC_ORAMA_API_KEY!,
      }}
      onModalClosed={onClose}
      facetProperty="category"
      resultMap={{
        title: "title",
        description: "path",
      }}
      disableChat={true}
      colorScheme="dark"
      themeConfig={oramaTheme}
      linksTarget="_self"
    />
  );
}

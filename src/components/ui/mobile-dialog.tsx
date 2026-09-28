import MobileDialogNav, { type NavSection } from "./mobile-dialog-nav";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sections: NavSection[];
}

const topNav: NavSection = {
  title: "__top-nav__",
  _key: "__top-nav__",
  items: [
    { title: "Home", href: "/" },
    { title: "Docs", href: "/docs" },
    { title: "Components", href: "/ui/installation" },
    { title: "Blog", href: "/blog" },
    {
      title: "Playground",
      href: "https://play.yummacss.com",
      external: true,
    },
  ],
};

export default function MobileDialog({ isOpen, onClose, sections }: Props) {
  return (
    <MobileDialogNav
      sections={[topNav, ...sections]}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

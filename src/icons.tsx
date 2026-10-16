import type { Icon, IconProps } from "@phosphor-icons/react";
import {
  ArrowCounterClockwiseIcon,
  ArrowElbowDownLeftIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  CheckCircleIcon,
  CheckIcon,
  CopyIcon,
  CubeIcon,
  CursorIcon,
  DiamondIcon,
  FileIcon,
  FileMdIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  SignOutIcon,
  SlidersHorizontalIcon,
  SparkleIcon,
  TerminalWindowIcon,
  TextTIcon,
  TwitterLogoIcon,
  WarningIcon,
} from "@phosphor-icons/react/ssr";

type Props = Omit<IconProps, "weight">;

// Regular weight: at 16px its 1px strokes sit on the pixel grid, where duotone's
// fill blurs every edge. See NOTES.md, "Icons at 16px".
const regular = (Glyph: Icon) => {
  const Regular = (props: Props) => <Glyph weight="regular" {...props} />;
  return Regular;
};

export const ArrowUpRight = regular(ArrowUpRightIcon);
export const Check = regular(CheckIcon);
export const CheckCircle = regular(CheckCircleIcon);
export const ComponentSolid = regular(CubeIcon);
export const Copy = regular(CopyIcon);
export const Cursor = regular(CursorIcon);
export const Diamond = regular(DiamondIcon);
export const FileMd = regular(FileMdIcon);
export const Folder = regular(FolderIcon);
export const LogOut = regular(SignOutIcon);
export const LongArrowDownLeftSolid = regular(ArrowElbowDownLeftIcon);
export const NavArrowDown = regular(CaretDownIcon);
export const NavArrowLeft = regular(CaretLeftIcon);
export const NavArrowRight = regular(CaretRightIcon);
export const NavArrowUp = regular(CaretUpIcon);
export const OpenBook = regular(BookOpenIcon);
export const Page = regular(FileIcon);
export const Plus = regular(PlusIcon);
export const Search = regular(MagnifyingGlassIcon);
export const Sliders = regular(SlidersHorizontalIcon);
export const Sparks = regular(SparkleIcon);
export const Terminal = regular(TerminalWindowIcon);
export const TextLayer = regular(TextTIcon);
export const Twitter = regular(TwitterLogoIcon);
export const Undo = regular(ArrowCounterClockwiseIcon);
export const WarningTriangle = regular(WarningIcon);

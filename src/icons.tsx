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
  CursorClickIcon,
  CursorTextIcon,
  FileIcon,
  FileMdIcon,
  FolderIcon,
  GithubLogoIcon,
  HandPointingIcon,
  HeartIcon,
  InfoIcon,
  KeyboardIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MonitorIcon,
  MoonIcon,
  MouseLeftClickIcon,
  MouseRightClickIcon,
  MouseScrollIcon,
  NotePencilIcon,
  PlusIcon,
  ResizeIcon,
  RssSimpleIcon,
  RulerIcon,
  SignOutIcon,
  SparkleIcon,
  SunIcon,
  TwitterLogoIcon,
  WarningIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";

type Props = Omit<IconProps, "weight">;

/**
 * Icons are duotone, except stroke-only glyphs (arrows, carets, X, check, plus,
 * menu), where duotone invents a square or a filled arrowhead behind the line.
 */
const duotone = (Glyph: Icon) => {
  const Duotone = (props: Props) => <Glyph weight="duotone" {...props} />;
  return Duotone;
};

const regular = (Glyph: Icon) => {
  const Regular = (props: Props) => <Glyph weight="regular" {...props} />;
  return Regular;
};

export const ArrowUpRight = regular(ArrowUpRightIcon);
export const Check = regular(CheckIcon);
export const CheckCircle = duotone(CheckCircleIcon);
export const ComponentSolid = duotone(CubeIcon);
export const Copy = duotone(CopyIcon);
export const CursorPointer = duotone(CursorClickIcon);
export const FileMd = duotone(FileMdIcon);
export const Folder = duotone(FolderIcon);
export const Github = duotone(GithubLogoIcon);
export const HalfMoon = duotone(MoonIcon);
export const Heart = duotone(HeartIcon);
export const InfoCircle = duotone(InfoIcon);
export const InputField = duotone(CursorTextIcon);
export const LogOut = duotone(SignOutIcon);
export const LongArrowDownLeftSolid = regular(ArrowElbowDownLeftIcon);
export const Menu = regular(ListIcon);
export const Monitor = duotone(MonitorIcon);
export const MouseButtonLeft = duotone(MouseLeftClickIcon);
export const MouseButtonRight = duotone(MouseRightClickIcon);
export const MouseScrollWheel = duotone(MouseScrollIcon);
export const NavArrowDown = regular(CaretDownIcon);
export const NavArrowLeft = regular(CaretLeftIcon);
export const NavArrowRight = regular(CaretRightIcon);
export const NavArrowUp = regular(CaretUpIcon);
export const OpenBook = duotone(BookOpenIcon);
export const OpenSelectHandGesture = duotone(HandPointingIcon);
export const Page = duotone(FileIcon);
export const PageEdit = duotone(NotePencilIcon);
export const Plus = regular(PlusIcon);
export const RssFeed = duotone(RssSimpleIcon);
export const Ruler = duotone(RulerIcon);
export const RulerCombine = duotone(ResizeIcon);
export const Search = duotone(MagnifyingGlassIcon);
export const Sparks = duotone(SparkleIcon);
export const StyleBorderSolid = duotone(KeyboardIcon);
export const SunLight = duotone(SunIcon);
export const Twitter = duotone(TwitterLogoIcon);
export const Undo = regular(ArrowCounterClockwiseIcon);
export const WarningTriangle = duotone(WarningIcon);
export const Xmark = regular(XIcon);

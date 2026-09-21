import type { Icon, IconProps } from "@phosphor-icons/react";
import {
  ArrowCounterClockwiseIcon,
  ArrowElbowDownLeftIcon,
  ArrowUpRightIcon,
  BellIcon,
  BookmarkSimpleIcon,
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
  EnvelopeIcon,
  FileIcon,
  FileMagnifyingGlassIcon,
  FilePlusIcon,
  FlagIcon,
  FolderIcon,
  GithubLogoIcon,
  HandPointingIcon,
  HeartIcon,
  InfoIcon,
  KeyboardIcon,
  ListIcon,
  MagnifyingGlassIcon,
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
  StarIcon,
  SunIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TrashIcon,
  TrendUpIcon,
  TwitterLogoIcon,
  UserIcon,
  UserPlusIcon,
  WarningIcon,
  WrenchIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";

/**
 * Every icon on the site is duotone, so a call site sets size and colour and
 * nothing else. The names are the ones the registry schemas already use.
 */
const duotone = (Glyph: Icon) => {
  const Duotone = (props: Omit<IconProps, "weight">) => (
    <Glyph weight="duotone" {...props} />
  );
  return Duotone;
};

export const ArrowUpRight = duotone(ArrowUpRightIcon);
export const BellNotification = duotone(BellIcon);
export const Bold = duotone(TextBIcon);
export const Bookmark = duotone(BookmarkSimpleIcon);
export const Check = duotone(CheckIcon);
export const CheckCircle = duotone(CheckCircleIcon);
export const ComponentSolid = duotone(CubeIcon);
export const Copy = duotone(CopyIcon);
export const CursorPointer = duotone(CursorClickIcon);
export const Folder = duotone(FolderIcon);
export const Github = duotone(GithubLogoIcon);
export const HalfMoon = duotone(MoonIcon);
export const Heart = duotone(HeartIcon);
export const InfoCircle = duotone(InfoIcon);
export const InputField = duotone(CursorTextIcon);
export const Italic = duotone(TextItalicIcon);
export const LogOut = duotone(SignOutIcon);
export const LongArrowDownLeftSolid = duotone(ArrowElbowDownLeftIcon);
export const Mail = duotone(EnvelopeIcon);
export const Menu = duotone(ListIcon);
export const MouseButtonLeft = duotone(MouseLeftClickIcon);
export const MouseButtonRight = duotone(MouseRightClickIcon);
export const MouseScrollWheel = duotone(MouseScrollIcon);
export const NavArrowDown = duotone(CaretDownIcon);
export const NavArrowLeft = duotone(CaretLeftIcon);
export const NavArrowRight = duotone(CaretRightIcon);
export const NavArrowUp = duotone(CaretUpIcon);
export const OpenBook = duotone(BookOpenIcon);
export const OpenSelectHandGesture = duotone(HandPointingIcon);
export const Page = duotone(FileIcon);
export const PageEdit = duotone(NotePencilIcon);
export const PagePlus = duotone(FilePlusIcon);
export const PageSearch = duotone(FileMagnifyingGlassIcon);
export const Plus = duotone(PlusIcon);
export const RssFeed = duotone(RssSimpleIcon);
export const Ruler = duotone(RulerIcon);
export const RulerCombine = duotone(ResizeIcon);
export const Search = duotone(MagnifyingGlassIcon);
export const Sparks = duotone(SparkleIcon);
export const SparksSolid = duotone(SparkleIcon);
export const Star = duotone(StarIcon);
export const StatUp = duotone(TrendUpIcon);
export const StyleBorderSolid = duotone(KeyboardIcon);
export const SunLight = duotone(SunIcon);
export const Trash = duotone(TrashIcon);
export const TriangleFlag = duotone(FlagIcon);
export const Twitter = duotone(TwitterLogoIcon);
export const Underline = duotone(TextUnderlineIcon);
export const Undo = duotone(ArrowCounterClockwiseIcon);
export const User = duotone(UserIcon);
export const UserPlus = duotone(UserPlusIcon);
export const WarningTriangle = duotone(WarningIcon);
export const Wrench = duotone(WrenchIcon);
export const Xmark = duotone(XIcon);

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
  FileMdIcon,
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

type Props = Omit<IconProps, "weight">;

/**
 * Icons are duotone, except stroke-only glyphs (arrows, carets, X, check, plus,
 * menu), where duotone invents a square or a filled arrowhead behind the line.
 * The names are the ones the registry schemas already use.
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
export const BellNotification = duotone(BellIcon);
export const Bold = duotone(TextBIcon);
export const Bookmark = duotone(BookmarkSimpleIcon);
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
export const Italic = duotone(TextItalicIcon);
export const LogOut = duotone(SignOutIcon);
export const LongArrowDownLeftSolid = regular(ArrowElbowDownLeftIcon);
export const Mail = duotone(EnvelopeIcon);
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
export const PagePlus = duotone(FilePlusIcon);
export const PageSearch = duotone(FileMagnifyingGlassIcon);
export const Plus = regular(PlusIcon);
export const RssFeed = duotone(RssSimpleIcon);
export const Ruler = duotone(RulerIcon);
export const RulerCombine = duotone(ResizeIcon);
export const Search = duotone(MagnifyingGlassIcon);
export const Sparks = duotone(SparkleIcon);
export const SparksSolid = duotone(SparkleIcon);
export const Star = duotone(StarIcon);
export const StatUp = regular(TrendUpIcon);
export const StyleBorderSolid = duotone(KeyboardIcon);
export const SunLight = duotone(SunIcon);
export const Trash = duotone(TrashIcon);
export const TriangleFlag = duotone(FlagIcon);
export const Twitter = duotone(TwitterLogoIcon);
export const Underline = duotone(TextUnderlineIcon);
export const Undo = regular(ArrowCounterClockwiseIcon);
export const User = duotone(UserIcon);
export const UserPlus = duotone(UserPlusIcon);
export const WarningTriangle = duotone(WarningIcon);
export const Wrench = duotone(WrenchIcon);
export const Xmark = regular(XIcon);

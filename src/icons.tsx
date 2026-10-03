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
  CornersOutIcon,
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
  PauseIcon,
  PlayIcon,
  PlusIcon,
  ResizeIcon,
  RssSimpleIcon,
  RulerIcon,
  SignOutIcon,
  SlidersHorizontalIcon,
  SparkleIcon,
  SpeakerHighIcon,
  SpeakerXIcon,
  SunIcon,
  TerminalWindowIcon,
  TwitterLogoIcon,
  WarningIcon,
  XIcon,
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
export const FullScreen = regular(CornersOutIcon);
export const CursorPointer = regular(CursorClickIcon);
export const FileMd = regular(FileMdIcon);
export const Folder = regular(FolderIcon);
export const Github = regular(GithubLogoIcon);
export const HalfMoon = regular(MoonIcon);
export const Heart = regular(HeartIcon);
export const InfoCircle = regular(InfoIcon);
export const InputField = regular(CursorTextIcon);
export const LogOut = regular(SignOutIcon);
export const LongArrowDownLeftSolid = regular(ArrowElbowDownLeftIcon);
export const Menu = regular(ListIcon);
export const Monitor = regular(MonitorIcon);
export const MouseButtonLeft = regular(MouseLeftClickIcon);
export const MouseButtonRight = regular(MouseRightClickIcon);
export const MouseScrollWheel = regular(MouseScrollIcon);
export const NavArrowDown = regular(CaretDownIcon);
export const NavArrowLeft = regular(CaretLeftIcon);
export const NavArrowRight = regular(CaretRightIcon);
export const NavArrowUp = regular(CaretUpIcon);
export const OpenBook = regular(BookOpenIcon);
export const OpenSelectHandGesture = regular(HandPointingIcon);
export const Page = regular(FileIcon);
export const Pause = regular(PauseIcon);
export const Play = regular(PlayIcon);
export const PageEdit = regular(NotePencilIcon);
export const Plus = regular(PlusIcon);
export const RssFeed = regular(RssSimpleIcon);
export const Ruler = regular(RulerIcon);
export const RulerCombine = regular(ResizeIcon);
export const Search = regular(MagnifyingGlassIcon);
export const Sliders = regular(SlidersHorizontalIcon);
export const Sparks = regular(SparkleIcon);
export const Sound = regular(SpeakerHighIcon);
export const SoundOff = regular(SpeakerXIcon);
export const StyleBorderSolid = regular(KeyboardIcon);
export const SunLight = regular(SunIcon);
export const Terminal = regular(TerminalWindowIcon);
export const Twitter = regular(TwitterLogoIcon);
export const Undo = regular(ArrowCounterClockwiseIcon);
export const WarningTriangle = regular(WarningIcon);
export const Xmark = regular(XIcon);

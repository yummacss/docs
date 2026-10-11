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
  PlusIcon,
  ResizeIcon,
  RulerIcon,
  SignOutIcon,
  SlidersHorizontalIcon,
  SparkleIcon,
  SunIcon,
  TerminalWindowIcon,
  TwitterLogoIcon,
  WarningIcon,
  XIcon,
} from "@phosphor-icons/react/ssr";
import type { SVGProps } from "react";

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
export const CursorPointer = regular(CursorClickIcon);
export const FileMd = regular(FileMdIcon);
export const Folder = regular(FolderIcon);
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
export const Plus = regular(PlusIcon);
export const Ruler = regular(RulerIcon);
export const RulerCombine = regular(ResizeIcon);
export const Search = regular(MagnifyingGlassIcon);
export const Sliders = regular(SlidersHorizontalIcon);
export const Sparks = regular(SparkleIcon);
export const StyleBorderSolid = regular(KeyboardIcon);
export const SunLight = regular(SunIcon);
export const Terminal = regular(TerminalWindowIcon);
export const Twitter = regular(TwitterLogoIcon);
export const Undo = regular(ArrowCounterClockwiseIcon);
export const WarningTriangle = regular(WarningIcon);
export const Xmark = regular(XIcon);

// Phosphor's regular palette outline, with the four dots in colour.
const dots = [
  [128, 76, "#e63946"],
  [84, 100, "#ffb81c"],
  [84, 156, "#06d6a0"],
  [172, 100, "#2563eb"],
] as const;

export const Palette = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6Z" />
    {dots.map(([cx, cy, fill]) => (
      <circle key={fill} cx={cx} cy={cy} r={12} fill={fill} />
    ))}
  </svg>
);

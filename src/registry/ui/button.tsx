import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "subtle" | "ghost" | "danger" | "link";
type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "square" | "pill";

// Plain lookups rather than cva: a copied component should not drag a class
// utility into your package.json to do what an object literal already does.
const BASE = "d-if ai-c jc-c g-2 bw-1 fw-500 tp-c tdu-150 ttf-io us-none fv:oo-2";

const VARIANTS: Record<Variant, string> = {
	primary: "bg-indigo h:bg-indigo-8 bc-indigo-7 c-white fv:oc-indigo-3",
	secondary: "bg-white bc-silver-2 c-slate-10 h:bg-silver-1/50 fv:oc-indigo-3",
	subtle: "bg-silver-1 bc-transparent c-slate-7 h:bg-silver-2 fv:oc-indigo-3",
	ghost:
		"bg-transparent bc-transparent c-slate-10 h:bg-silver-1/50 h:c-slate-7 fv:oc-indigo-3",
	danger: "bg-red h:bg-red-8 bc-red-7 c-white fv:oc-red-3",
	link: "bg-transparent bc-transparent c-slate-10 tuo-2 h:td-u fv:oc-indigo-3",
};

const SIZES: Record<Size, string> = {
	sm: "px-2 py-1 fs-sm",
	md: "px-3 py-2 fs-md",
	lg: "px-4 py-3 fs-lg",
};

// An icon-only button needs equal padding on both axes, or it reads as a
// stretched rectangle around a square glyph.
const ICON_ONLY: Record<Size, string> = {
	sm: "p-1",
	md: "p-2",
	lg: "p-3",
};

const SHAPES: Record<Shape, string> = {
	rounded: "br-lg",
	square: "br-0",
	pill: "br-9999",
};

export interface ButtonProps extends ComponentProps<typeof BaseButton> {
	variant?: Variant;
	size?: Size;
	shape?: Shape;
	/** Dims the button and blocks interaction while an action is in flight. */
	loading?: boolean;
	/** Square padding, for a button whose only child is an icon. */
	iconOnly?: boolean;
	children?: ReactNode;
}

export default function Button({
	variant = "primary",
	size = "md",
	shape = "rounded",
	loading = false,
	iconOnly = false,
	disabled,
	className,
	children,
	...props
}: ButtonProps) {
	const inactive = disabled || loading;

	const classes = [
		BASE,
		VARIANTS[variant],
		iconOnly ? ICON_ONLY[size] : SIZES[size],
		SHAPES[shape],
		inactive ? "o-60 c-na" : "c-p",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<BaseButton
			className={classes}
			disabled={inactive}
			// To a screen reader `loading` is a busy state, not a disabled one.
			aria-busy={loading || undefined}
			{...props}
		>
			{children}
		</BaseButton>
	);
}

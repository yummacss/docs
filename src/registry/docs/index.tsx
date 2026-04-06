import type { ComponentType } from "react";
import ColorsOpacityModifiers from "./colors-opacity-modifiers";
import ColorsShades from "./colors-shades";
import ColorsUtilities from "./colors-utilities";
import MediaQueriesBase from "./media-queries-base";
import NegativeValuesMargin from "./negative-values-margin";
import NegativeValuesPositioning from "./negative-values-positioning";
import NegativeValuesSignToggle from "./negative-values-sign-toggle";
import NegativeValuesZIndex from "./negative-values-z-index";
import PseudoClassesActive from "./pseudo-classes-active";
import PseudoClassesChecked from "./pseudo-classes-checked";
import PseudoClassesDisabled from "./pseudo-classes-disabled";
import PseudoClassesFocus from "./pseudo-classes-focus";
import PseudoClassesFocusVisible from "./pseudo-classes-focus-visible";
import PseudoClassesFocusWithin from "./pseudo-classes-focus-within";
import PseudoClassesHover from "./pseudo-classes-hover";
import PseudoElementsPlaceholder from "./pseudo-elements-placeholder";
import PseudoElementsSelection from "./pseudo-elements-selection";

export const registry: Record<string, ComponentType> = {
  "colors-utilities": ColorsUtilities,
  "colors-shades": ColorsShades,
  "colors-opacity-modifiers": ColorsOpacityModifiers,
  "media-queries-base": MediaQueriesBase,
  "negative-values-margin": NegativeValuesMargin,
  "negative-values-positioning": NegativeValuesPositioning,
  "negative-values-z-index": NegativeValuesZIndex,
  "negative-values-sign-toggle": NegativeValuesSignToggle,
  "pseudo-classes-active": PseudoClassesActive,
  "pseudo-classes-focus": PseudoClassesFocus,
  "pseudo-classes-hover": PseudoClassesHover,
  "pseudo-classes-focus-visible": PseudoClassesFocusVisible,
  "pseudo-classes-focus-within": PseudoClassesFocusWithin,
  "pseudo-classes-checked": PseudoClassesChecked,
  "pseudo-classes-disabled": PseudoClassesDisabled,
  "pseudo-elements-selection": PseudoElementsSelection,
  "pseudo-elements-placeholder": PseudoElementsPlaceholder,
};

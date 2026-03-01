import type { ComponentType } from "react";
import AccordionBase from "./accordion-base";
import AccordionBordered from "./accordion-bordered";
import AccordionIcons from "./accordion-icons";
import AccordionMultiple from "./accordion-multiple";
import AlertDialogBase from "./alert-dialog-base";
import AlertDialogMail from "./alert-dialog-mail";
import AlertDialogVerification from "./alert-dialog-verification";
import AutocompleteBase from "./autocomplete-base";
import AvatarBase from "./avatar-base";
import AvatarDetailed from "./avatar-detailed";
import AvatarInitials from "./avatar-initials";
import AvatarPlaceholder from "./avatar-placeholder";
import AvatarStacked from "./avatar-stacked";
import AvatarStatus from "./avatar-status";
import AvatarVerified from "./avatar-verified";
import ButtonBase from "./button-base";
import ButtonDanger from "./button-danger";
import ButtonDisabled from "./button-disabled";
import ButtonGhost from "./button-ghost";
import ButtonIcon from "./button-icon";
import ButtonIconOnly from "./button-icon-only";
import ButtonLink from "./button-link";
import ButtonLoading from "./button-loading";
import ButtonOutlined from "./button-outlined";
import ButtonPrimary from "./button-primary";
import ButtonSecondary from "./button-secondary";
import CheckboxBase from "./checkbox-base";
import CheckboxDetailed from "./checkbox-detailed";
import CheckboxDisabled from "./checkbox-disabled";
import CheckboxNestedParent from "./checkbox-nested-parent";
import CheckboxParent from "./checkbox-parent";
import CheckboxSizes from "./checkbox-sizes";
import CollapsibleBase from "./collapsible-base";
import ComboboxBase from "./combobox-base";
import ContextMenuBase from "./context-menu-base";
import DialogBase from "./dialog-base";
import DialogPayment from "./dialog-payment";
import DialogSettings from "./dialog-settings";
import FormBase from "./form-base";
import InputBase from "./input-base";
import MenuBase from "./menu-base";
import MenubarBase from "./menubar-base";
import MeterBase from "./meter-base";
import NavigationMenuBase from "./navigation-menu-base";
import NumberFieldBase from "./number-field-base";
import PopoverBase from "./popover-base";
import PreviewCardBase from "./preview-card-base";
import ProgressBase from "./progress-base";
import RadioBase from "./radio-base";
import SelectBase from "./select-base";
import SeparatorBase from "./separator-base";
import SliderBase from "./slider-base";
import SwitchBase from "./switch-base";
import TabsBase from "./tabs-base";
import ToggleBase from "./toggle-base";
import ToggleGroupBase from "./toggle-group-base";
import ToolbarBase from "./toolbar-base";
import TooltipBase from "./tooltip-base";

export const baseComponents: Record<string, ComponentType> = {
  "accordion-base": AccordionBase,
  "accordion-multiple": AccordionMultiple,
  "accordion-bordered": AccordionBordered,
  "accordion-icons": AccordionIcons,
  "alert-dialog-base": AlertDialogBase,
  "alert-dialog-mail": AlertDialogMail,
  "alert-dialog-verification": AlertDialogVerification,
  "autocomplete-base": AutocompleteBase,
  "avatar-base": AvatarBase,
  "avatar-status": AvatarStatus,
  "avatar-verified": AvatarVerified,
  "avatar-placeholder": AvatarPlaceholder,
  "avatar-initials": AvatarInitials,
  "avatar-detailed": AvatarDetailed,
  "avatar-stacked": AvatarStacked,
  "button-base": ButtonBase,
  "button-primary": ButtonPrimary,
  "button-secondary": ButtonSecondary,
  "button-danger": ButtonDanger,
  "button-outlined": ButtonOutlined,
  "button-ghost": ButtonGhost,
  "button-link": ButtonLink,
  "button-icon": ButtonIcon,
  "button-icon-only": ButtonIconOnly,
  "button-loading": ButtonLoading,
  "button-disabled": ButtonDisabled,
  "checkbox-base": CheckboxBase,
  "checkbox-detailed": CheckboxDetailed,
  "checkbox-disabled": CheckboxDisabled,
  "checkbox-sizes": CheckboxSizes,
  "checkbox-parent": CheckboxParent,
  "checkbox-nested-parent": CheckboxNestedParent,
  "collapsible-base": CollapsibleBase,
  "combobox-base": ComboboxBase,
  "context-menu-base": ContextMenuBase,
  "dialog-base": DialogBase,
  "dialog-payment": DialogPayment,
  "dialog-settings": DialogSettings,
  "form-base": FormBase,
  "input-base": InputBase,
  "menu-base": MenuBase,
  "menubar-base": MenubarBase,
  "meter-base": MeterBase,
  "navigation-menu-base": NavigationMenuBase,
  "number-field-base": NumberFieldBase,
  "popover-base": PopoverBase,
  "preview-card-base": PreviewCardBase,
  "progress-base": ProgressBase,
  "radio-base": RadioBase,
  "select-base": SelectBase,
  "separator-base": SeparatorBase,
  "slider-base": SliderBase,
  "switch-base": SwitchBase,
  "tabs-base": TabsBase,
  "toggle-base": ToggleBase,
  "toggle-group-base": ToggleGroupBase,
  "toolbar-base": ToolbarBase,
  "tooltip-base": TooltipBase,
};

// coming soon
export const uiBlocks: Record<string, ComponentType> = {};

export const registry: Record<string, ComponentType> = {
  ...baseComponents,
  ...uiBlocks,
};

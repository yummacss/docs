import type { ComponentType } from "react";

// Import all preview components
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
import ScrollAreaBase from "./scroll-area-base";
import SelectBase from "./select-base";
import SeparatorBase from "./separator-base";
import SliderBase from "./slider-base";
import SwitchBase from "./switch-base";
import TabsBase from "./tabs-base";
import ToggleBase from "./toggle-base";
import ToggleGroupBase from "./toggle-group-base";
import ToolbarBase from "./toolbar-base";
import TooltipBase from "./tooltip-base";

// Registry of preview components
export const components: Record<string, ComponentType> = {
  // Accordion
  "accordion-base": AccordionBase,
  "accordion-multiple": AccordionMultiple,
  "accordion-bordered": AccordionBordered,
  "accordion-icons": AccordionIcons,
  // Alert Dialog
  "alert-dialog-base": AlertDialogBase,
  "alert-dialog-mail": AlertDialogMail,
  "alert-dialog-verification": AlertDialogVerification,
  // Autocomplete
  "autocomplete-base": AutocompleteBase,
  // Avatar
  "avatar-base": AvatarBase,
  "avatar-status": AvatarStatus,
  "avatar-verified": AvatarVerified,
  "avatar-placeholder": AvatarPlaceholder,
  "avatar-initials": AvatarInitials,
  "avatar-detailed": AvatarDetailed,
  "avatar-stacked": AvatarStacked,
  // Button
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
  // Checkbox
  "checkbox-base": CheckboxBase,
  "checkbox-detailed": CheckboxDetailed,
  "checkbox-disabled": CheckboxDisabled,
  "checkbox-sizes": CheckboxSizes,
  "checkbox-parent": CheckboxParent,
  "checkbox-nested-parent": CheckboxNestedParent,
  // Collapsible
  "collapsible-base": CollapsibleBase,
  // Combobox
  "combobox-base": ComboboxBase,
  // Context Menu
  "context-menu-base": ContextMenuBase,
  // Dialog
  "dialog-base": DialogBase,
  "dialog-payment": DialogPayment,
  "dialog-settings": DialogSettings,
  // Form
  "form-base": FormBase,
  // Input
  "input-base": InputBase,
  // Menu
  "menu-base": MenuBase,
  // Menubar
  "menubar-base": MenubarBase,
  // Meter
  "meter-base": MeterBase,
  // Navigation Menu
  "navigation-menu-base": NavigationMenuBase,
  // Number Field
  "number-field-base": NumberFieldBase,
  // Popover
  "popover-base": PopoverBase,
  // Preview Card
  "preview-card-base": PreviewCardBase,
  // Progress
  "progress-base": ProgressBase,
  // Radio
  "radio-base": RadioBase,
  // Scroll Area
  "scroll-area-base": ScrollAreaBase,
  // Select
  "select-base": SelectBase,
  // Separator
  "separator-base": SeparatorBase,
  // Slider
  "slider-base": SliderBase,
  // Switch
  "switch-base": SwitchBase,
  // Tabs
  "tabs-base": TabsBase,
  // Toggle
  "toggle-base": ToggleBase,
  // Toggle Group
  "toggle-group-base": ToggleGroupBase,
  // Toolbar
  "toolbar-base": ToolbarBase,
  // Tooltip
  "tooltip-base": TooltipBase,
};

export const blocks: Record<string, ComponentType> = {};

export const registry: Record<string, ComponentType> = {
  ...components,
  ...blocks,
};

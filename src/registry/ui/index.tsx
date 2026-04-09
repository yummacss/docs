import type { ComponentType } from "react";
import AccordionBase from "./accordion-base";
import AccordionBordered from "./accordion-bordered";
import AccordionGhost from "./accordion-ghost";
import AccordionIcons from "./accordion-icons";
import AccordionMultiple from "./accordion-multiple";
import AccordionStatic from "./accordion-static";
import AccordionSubtle from "./accordion-subtle";
import AlertDialogConfirmation from "./alert-dialog-confirmation";
import DialogVerification from "./dialog-verification";
import DialogMail from "./dialog-mail";
import AutocompleteAutoHighlight from "./autocomplete-auto-highlight";
import AutocompleteBase from "./autocomplete-base";
import AutocompleteGrouped from "./autocomplete-grouped";
import AutocompleteStatic from "./autocomplete-static";
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
import ButtonSecondary from "./button-secondary";
import CheckboxBase from "./checkbox-base";
import CheckboxDetailed from "./checkbox-detailed";
import CheckboxDisabled from "./checkbox-disabled";
import CheckboxNestedParent from "./checkbox-nested-parent";
import CheckboxParent from "./checkbox-parent";
import CheckboxSizes from "./checkbox-sizes";
import CollapsibleBase from "./collapsible-base";
import CollapsibleBordered from "./collapsible-bordered";
import CollapsibleIcon from "./collapsible-icon";
import CollapsibleStatic from "./collapsible-static";
import ComboboxBase from "./combobox-base";
import ComboboxInline from "./combobox-inline";
import ComboboxMultiple from "./combobox-multiple";
import ComboboxStatic from "./combobox-static";
import ContextMenuBase from "./context-menu-base";
import ContextMenuCheckboxes from "./context-menu-checkboxes";
import ContextMenuGrouped from "./context-menu-grouped";
import ContextMenuIcons from "./context-menu-icons";
import ContextMenuNested from "./context-menu-nested";
import ContextMenuRadios from "./context-menu-radios";
import ContextMenuStatic from "./context-menu-static";
import DialogBase from "./dialog-base";
import DialogPayment from "./dialog-payment";
import DialogSettings from "./dialog-settings";
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
import ToggleGroup from "./toggle-group";
import ToolbarBase from "./toolbar-base";
import TooltipBase from "./tooltip-base";

export const baseComponents: Record<string, ComponentType> = {
  "accordion-base": AccordionBase,
  "accordion-bordered": AccordionBordered,
  "accordion-ghost": AccordionGhost,
  "accordion-icons": AccordionIcons,
  "accordion-multiple": AccordionMultiple,
  "accordion-static": AccordionStatic,
  "accordion-subtle": AccordionSubtle,
  "alert-dialog-confirmation": AlertDialogConfirmation,
  "dialog-verification": DialogVerification,
  "dialog-mail": DialogMail,
  "autocomplete-auto-highlight": AutocompleteAutoHighlight,
  "autocomplete-base": AutocompleteBase,
  "autocomplete-grouped": AutocompleteGrouped,
  "autocomplete-static": AutocompleteStatic,
  "avatar-base": AvatarBase,
  "avatar-detailed": AvatarDetailed,
  "avatar-initials": AvatarInitials,
  "avatar-placeholder": AvatarPlaceholder,
  "avatar-stacked": AvatarStacked,
  "avatar-status": AvatarStatus,
  "avatar-verified": AvatarVerified,
  "button-base": ButtonBase,
  "button-danger": ButtonDanger,
  "button-disabled": ButtonDisabled,
  "button-ghost": ButtonGhost,
  "button-icon-only": ButtonIconOnly,
  "button-icon": ButtonIcon,
  "button-link": ButtonLink,
  "button-loading": ButtonLoading,
  "button-outlined": ButtonOutlined,
  "button-secondary": ButtonSecondary,
  "checkbox-base": CheckboxBase,
  "checkbox-detailed": CheckboxDetailed,
  "checkbox-disabled": CheckboxDisabled,
  "checkbox-nested-parent": CheckboxNestedParent,
  "checkbox-parent": CheckboxParent,
  "checkbox-sizes": CheckboxSizes,
  "collapsible-base": CollapsibleBase,
  "collapsible-bordered": CollapsibleBordered,
  "collapsible-icon": CollapsibleIcon,
  "collapsible-static": CollapsibleStatic,
  "combobox-base": ComboboxBase,
  "combobox-inline": ComboboxInline,
  "combobox-multiple": ComboboxMultiple,
  "combobox-static": ComboboxStatic,
  "context-menu-base": ContextMenuBase,
  "context-menu-checkboxes": ContextMenuCheckboxes,
  "context-menu-grouped": ContextMenuGrouped,
  "context-menu-icons": ContextMenuIcons,
  "context-menu-nested": ContextMenuNested,
  "context-menu-radios": ContextMenuRadios,
  "context-menu-static": ContextMenuStatic,
  "dialog-base": DialogBase,
  "dialog-payment": DialogPayment,
  "dialog-settings": DialogSettings,
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
  "toggle-group": ToggleGroup,
  "toolbar-base": ToolbarBase,
  "tooltip-base": TooltipBase,
};

// coming soon
export const uiBlocks: Record<string, ComponentType> = {};

export const registry: Record<string, ComponentType> = {
  ...baseComponents,
  ...uiBlocks,
};

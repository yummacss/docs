import type { ComponentType } from "react";

// Import all preview components
import AccordionBasic from "./accordion-basic";
import AccordionBordered from "./accordion-bordered";
import AccordionIcons from "./accordion-icons";
import AccordionMultiple from "./accordion-multiple";
import AlertDialogBasic from "./alert-dialog-basic";
import AlertDialogForm from "./alert-dialog-mail";
import AlertDialogVerification from "./alert-dialog-verification";
import AutocompleteBasic from "./autocomplete-basic";
import AvatarBasic from "./avatar-basic";
import ButtonBasic from "./button-basic";
import CheckboxBasic from "./checkbox-basic";
import CheckboxGroupBasic from "./checkbox-group-basic";
import CollapsibleBasic from "./collapsible-basic";
import ComboboxBasic from "./combobox-basic";
import ContextMenuBasic from "./context-menu-basic";
import DialogBasic from "./dialog-basic";
import FieldBasic from "./field-basic";
import FieldsetBasic from "./fieldset-basic";
import FormBasic from "./form-basic";
import InputBasic from "./input-basic";
import MenuBasic from "./menu-basic";
import MenubarBasic from "./menubar-basic";
import MeterBasic from "./meter-basic";
import NavigationMenuBasic from "./navigation-menu-basic";
import NumberFieldBasic from "./number-field-basic";
import PopoverBasic from "./popover-basic";
import PreviewCardBasic from "./preview-card-basic";
import ProgressBasic from "./progress-basic";
import RadioBasic from "./radio-basic";
import ScrollAreaBasic from "./scroll-area-basic";
import SelectBasic from "./select-basic";
import SeparatorBasic from "./separator-basic";
import SliderBasic from "./slider-basic";
import SwitchBasic from "./switch-basic";
import TabsBasic from "./tabs-basic";
import ToggleBasic from "./toggle-basic";
import ToggleGroupBasic from "./toggle-group-basic";
import ToolbarBasic from "./toolbar-basic";
import TooltipBasic from "./tooltip-basic";

// Registry of preview components
export const components: Record<string, ComponentType> = {
  // Accordion
  "accordion-basic": AccordionBasic,
  "accordion-multiple": AccordionMultiple,
  "accordion-bordered": AccordionBordered,
  "accordion-icons": AccordionIcons,
  // Alert Dialog
  "alert-dialog-basic": AlertDialogBasic,
  "alert-dialog-form": AlertDialogForm,
  "alert-dialog-verification": AlertDialogVerification,
  // Autocomplete
  "autocomplete-basic": AutocompleteBasic,
  // Avatar
  "avatar-basic": AvatarBasic,
  // Button
  "button-basic": ButtonBasic,
  // Checkbox
  "checkbox-basic": CheckboxBasic,
  // Checkbox Group
  "checkbox-group-basic": CheckboxGroupBasic,
  // Collapsible
  "collapsible-basic": CollapsibleBasic,
  // Combobox
  "combobox-basic": ComboboxBasic,
  // Context Menu
  "context-menu-basic": ContextMenuBasic,
  // Dialog
  "dialog-basic": DialogBasic,
  // Field
  "field-basic": FieldBasic,
  // Fieldset
  "fieldset-basic": FieldsetBasic,
  // Form
  "form-basic": FormBasic,
  // Input
  "input-basic": InputBasic,
  // Menu
  "menu-basic": MenuBasic,
  // Menubar
  "menubar-basic": MenubarBasic,
  // Meter
  "meter-basic": MeterBasic,
  // Navigation Menu
  "navigation-menu-basic": NavigationMenuBasic,
  // Number Field
  "number-field-basic": NumberFieldBasic,
  // Popover
  "popover-basic": PopoverBasic,
  // Preview Card
  "preview-card-basic": PreviewCardBasic,
  // Progress
  "progress-basic": ProgressBasic,
  // Radio
  "radio-basic": RadioBasic,
  // Scroll Area
  "scroll-area-basic": ScrollAreaBasic,
  // Select
  "select-basic": SelectBasic,
  // Separator
  "separator-basic": SeparatorBasic,
  // Slider
  "slider-basic": SliderBasic,
  // Switch
  "switch-basic": SwitchBasic,
  // Tabs
  "tabs-basic": TabsBasic,
  // Toggle
  "toggle-basic": ToggleBasic,
  // Toggle Group
  "toggle-group-basic": ToggleGroupBasic,
  // Toolbar
  "toolbar-basic": ToolbarBasic,
  // Tooltip
  "tooltip-basic": TooltipBasic,
};

export const blocks: Record<string, ComponentType> = {};

export const registry: Record<string, ComponentType> = {
  ...components,
  ...blocks,
};

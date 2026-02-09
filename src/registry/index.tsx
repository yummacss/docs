import type { ComponentType } from "react";

// Import all preview components
import AccordionBasic from "./ui/accordion-basic";
import AlertDialogBasic from "./ui/alert-dialog-basic";
import AutocompleteBasic from "./ui/autocomplete-basic";
import AvatarBasic from "./ui/avatar-basic";
import ButtonBasic from "./ui/button-basic";
import CheckboxBasic from "./ui/checkbox-basic";
import CheckboxGroupBasic from "./ui/checkbox-group-basic";
import CollapsibleBasic from "./ui/collapsible-basic";
import ComboboxBasic from "./ui/combobox-basic";
import ContextMenuBasic from "./ui/context-menu-basic";
import DialogBasic from "./ui/dialog-basic";
import FieldBasic from "./ui/field-basic";
import FieldsetBasic from "./ui/fieldset-basic";
import FormBasic from "./ui/form-basic";
import InputBasic from "./ui/input-basic";
import MenuBasic from "./ui/menu-basic";
import MenubarBasic from "./ui/menubar-basic";
import MeterBasic from "./ui/meter-basic";
import NavigationMenuBasic from "./ui/navigation-menu-basic";
import NumberFieldBasic from "./ui/number-field-basic";
import PopoverBasic from "./ui/popover-basic";
import PreviewCardBasic from "./ui/preview-card-basic";
import ProgressBasic from "./ui/progress-basic";
import RadioBasic from "./ui/radio-basic";
import ScrollAreaBasic from "./ui/scroll-area-basic";
import SelectBasic from "./ui/select-basic";
import SeparatorBasic from "./ui/separator-basic";
import SliderBasic from "./ui/slider-basic";
import SwitchBasic from "./ui/switch-basic";
import TabsBasic from "./ui/tabs-basic";
import ToggleBasic from "./ui/toggle-basic";
import ToggleGroupBasic from "./ui/toggle-group-basic";
import ToolbarBasic from "./ui/toolbar-basic";
import TooltipBasic from "./ui/tooltip-basic";

// Registry of preview components
export const components: Record<string, ComponentType> = {
  // Accordion
  "accordion-basic": AccordionBasic,
  // Alert Dialog
  "alert-dialog-basic": AlertDialogBasic,
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

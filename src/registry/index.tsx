import type { ComponentType } from "react";

// Import all preview components
import AccordionBasic from "./ui/accordion-basic";
import AlertDialogBasic from "./ui/alert-dialog-basic";
import AuthFormBasicSignIn from "./ui/auth-form-basic-sign-in";
import AuthFormBasicSignUp from "./ui/auth-form-basic-sign-up";
import AutocompleteBasic from "./ui/autocomplete-basic";
import AvatarBasic from "./ui/avatar-basic";
import ButtonBasic from "./ui/button-basic";
import CheckboxBasic from "./ui/checkbox-basic";
import CheckboxGroupBasic from "./ui/checkbox-group-basic";
import CollapsibleBasic from "./ui/collapsible-basic";
import ComboboxBasic from "./ui/combobox-basic";
import ComparisonListBasic from "./ui/comparison-list-basic";
import ComparisonListSideBySide from "./ui/comparison-list-side-by-side";
import ContactSectionBasic from "./ui/contact-section-basic";
import ContactSectionForm from "./ui/contact-section-form";
import ContextMenuBasic from "./ui/context-menu-basic";
import CtaSectionBasic from "./ui/cta-section-basic";
import CtaSectionColored from "./ui/cta-section-colored";
import CtaSectionIcons from "./ui/cta-section-icons";
import DialogBasic from "./ui/dialog-basic";
import FeatureSectionBasic from "./ui/feature-section-basic";
import FeatureSectionCentered from "./ui/feature-section-centered";
import FieldBasic from "./ui/field-basic";
import FieldsetBasic from "./ui/fieldset-basic";
import FooterBasic from "./ui/footer-basic";
import FooterColumns from "./ui/footer-columns";
import FooterColumnsWithLogo from "./ui/footer-columns-with-logo";
import FormBasic from "./ui/form-basic";
import HeaderSectionBasic from "./ui/header-section-basic";
import HeaderSectionCentered from "./ui/header-section-centered";
import HeaderSectionLabel from "./ui/header-section-label";
import HeroSectionBadgeOnTop from "./ui/hero-section-badge-on-top";
import HeroSectionBasic from "./ui/hero-section-basic";
import InputBasic from "./ui/input-basic";
import LogoSectionBasic from "./ui/logo-section-basic";
import LogoSectionHeading from "./ui/logo-section-heading";
import MenuBasic from "./ui/menu-basic";
import MenubarBasic from "./ui/menubar-basic";
import MeterBasic from "./ui/meter-basic";
import NavbarBasic from "./ui/navbar-basic";
import NavbarCenterAlignedLinks from "./ui/navbar-center-aligned-links";
import NavigationMenuBasic from "./ui/navigation-menu-basic";
import NewsletterSectionBasic from "./ui/newsletter-section-basic";
import NewsletterSectionCentered from "./ui/newsletter-section-centered";
import NumberFieldBasic from "./ui/number-field-basic";
import PopoverBasic from "./ui/popover-basic";
import PreviewCardBasic from "./ui/preview-card-basic";
import PricingSectionBasic from "./ui/pricing-section-basic";
import ProgressBasic from "./ui/progress-basic";
import RadioBasic from "./ui/radio-basic";
import ScrollAreaBasic from "./ui/scroll-area-basic";
import SelectBasic from "./ui/select-basic";
import SeparatorBasic from "./ui/separator-basic";
import SliderBasic from "./ui/slider-basic";
import StatisticsSectionBasic from "./ui/statistics-section-basic";
import StatisticsSectionIcons from "./ui/statistics-section-icons";
import SwitchBasic from "./ui/switch-basic";
import TabsBasic from "./ui/tabs-basic";
import TeamSectionGrid from "./ui/team-section-grid";
import TestimonialSectionBasic from "./ui/testimonial-section-basic";
import TimelineBasic from "./ui/timeline-basic";
import TimelineIcons from "./ui/timeline-icons";
import ToastBasic from "./ui/toast-basic";
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
  // Toast
  "toast-basic": ToastBasic,
  // Toggle
  "toggle-basic": ToggleBasic,
  // Toggle Group
  "toggle-group-basic": ToggleGroupBasic,
  // Toolbar
  "toolbar-basic": ToolbarBasic,
  // Tooltip
  "tooltip-basic": TooltipBasic,
};

export const blocks: Record<string, ComponentType> = {
  // Auth Form
  "auth-form-basic-sign-in": AuthFormBasicSignIn,
  "auth-form-basic-sign-up": AuthFormBasicSignUp,
  // Comparison List
  "comparison-list-basic": ComparisonListBasic,
  "comparison-list-side-by-side": ComparisonListSideBySide,
  // Contact Section
  "contact-section-basic": ContactSectionBasic,
  "contact-section-form": ContactSectionForm,
  // CTA Section
  "cta-section-basic": CtaSectionBasic,
  "cta-section-colored": CtaSectionColored,
  "cta-section-icons": CtaSectionIcons,
  // Feature Section
  "feature-section-basic": FeatureSectionBasic,
  "feature-section-centered": FeatureSectionCentered,
  // Footer
  "footer-basic": FooterBasic,
  "footer-columns": FooterColumns,
  "footer-columns-with-logo": FooterColumnsWithLogo,
  // Header Section
  "header-section-basic": HeaderSectionBasic,
  "header-section-centered": HeaderSectionCentered,
  // Header Section Label
  "header-section-label": HeaderSectionLabel,
  // Hero Section
  "hero-section-basic": HeroSectionBasic,
  "hero-section-badge-on-top": HeroSectionBadgeOnTop,
  // Logo Section
  "logo-section-basic": LogoSectionBasic,
  "logo-section-heading": LogoSectionHeading,
  // Navbar
  "navbar-basic": NavbarBasic,
  "navbar-center-aligned-links": NavbarCenterAlignedLinks,
  // Newsletter Section
  "newsletter-section-basic": NewsletterSectionBasic,
  "newsletter-section-centered-with-icon": NewsletterSectionCentered,
  // Pricing Section
  "pricing-section-basic": PricingSectionBasic,
  // Statistics Section
  "statistics-section-basic": StatisticsSectionBasic,
  "statistics-section-icons": StatisticsSectionIcons,
  // Team Section
  "team-section-grid": TeamSectionGrid,
  // Testimonial Section
  "testimonial-section-basic": TestimonialSectionBasic,
  // Timeline
  "timeline-basic": TimelineBasic,
  "timeline-icons": TimelineIcons,
};

export const registry: Record<string, ComponentType> = {
  ...components,
  ...blocks,
};

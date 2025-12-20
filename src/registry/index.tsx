import type { ComponentType } from "react";

// Import all preview components
import AccordionBasic from "./ui/accordion-basic";
import AccordionGhost from "./ui/accordion-ghost";
import AccordionIcons from "./ui/accordion-icons";
import AccordionSeparated from "./ui/accordion-separated";
import AuthFormBasicSignIn from "./ui/auth-form-basic-sign-in";
import AuthFormBasicSignUp from "./ui/auth-form-basic-sign-up";
import AvatarCircle from "./ui/avatar-circle";
import AvatarIndicator from "./ui/avatar-indicator";
import AvatarInitials from "./ui/avatar-initials";
import AvatarLabel from "./ui/avatar-label";
import BadgeBasic from "./ui/badge-basic";
import BadgeColors from "./ui/badge-colors";
import BadgeIcon from "./ui/badge-icon";
import BannerAction from "./ui/banner-action";
import BannerBasic from "./ui/banner-basic";
import BannerFloating from "./ui/banner-floating";
import BannerLink from "./ui/banner-link";
import BreadcrumbChevrons from "./ui/breadcrumb-chevrons";
import BreadcrumbCollapsed from "./ui/breadcrumb-collapsed";
import ButtonDestructive from "./ui/button-destructive";
import ButtonDisabled from "./ui/button-disabled";
import ButtonGhost from "./ui/button-ghost";
import ButtonGroupActive from "./ui/button-group-active";
import ButtonGroupBasic from "./ui/button-group-basic";
import ButtonGroupIcons from "./ui/button-group-icons";
import ButtonIconLabel from "./ui/button-icon-label";
import ButtonOutline from "./ui/button-outline";
import ButtonPill from "./ui/button-pill";
import ButtonPrimary from "./ui/button-primary";
import CardBasic from "./ui/card-basic";
import CardGroupBasic from "./ui/card-group-basic";
import CardGroupTwoColumns from "./ui/card-group-two-columns";
import CardIcon from "./ui/card-icon";
import CardListAction from "./ui/card-list-action";
import CardListBasic from "./ui/card-list-basic";
import CheckboxBasic from "./ui/checkbox-basic";
import CheckboxChecked from "./ui/checkbox-checked";
import CheckboxDescriptive from "./ui/checkbox-descriptive";
import CheckboxDisabled from "./ui/checkbox-disabled";
import ComparisonListBasic from "./ui/comparison-list-basic";
import ComparisonListSideBySide from "./ui/comparison-list-side-by-side";
import ContactSectionBasic from "./ui/contact-section-basic";
import ContactSectionForm from "./ui/contact-section-form";
import CtaSectionBasic from "./ui/cta-section-basic";
import CtaSectionColored from "./ui/cta-section-colored";
import CtaSectionIcons from "./ui/cta-section-icons";
import DropdownBasic from "./ui/dropdown-basic";
import DropdownIcons from "./ui/dropdown-icons";
import DropdownShortcuts from "./ui/dropdown-shortcuts";
import FeatureSectionBasic from "./ui/feature-section-basic";
import FeatureSectionCentered from "./ui/feature-section-centered";
import FooterBasic from "./ui/footer-basic";
import FooterColumns from "./ui/footer-columns";
import FooterColumnsWithLogo from "./ui/footer-columns-with-logo";
import HeaderSectionBasic from "./ui/header-section-basic";
import HeaderSectionCentered from "./ui/header-section-centered";
import HeaderSectionLabel from "./ui/header-section-label";
import HeroSectionBadgeOnTop from "./ui/hero-section-badge-on-top";
import HeroSectionBasic from "./ui/hero-section-basic";
import InputBasic from "./ui/input-basic";
import InputDisabled from "./ui/input-disabled";
import InputError from "./ui/input-error";
import InputIcon from "./ui/input-icon";
import InputLabel from "./ui/input-label";
import LogoSectionBasic from "./ui/logo-section-basic";
import LogoSectionHeading from "./ui/logo-section-heading";
import NavbarBasic from "./ui/navbar-basic";
import NavbarCenterAlignedLinks from "./ui/navbar-center-aligned-links";
import NewsletterSectionBasic from "./ui/newsletter-section-basic";
import NewsletterSectionCentered from "./ui/newsletter-section-centered";
import PaginationBasic from "./ui/pagination-basic";
import PaginationEllipsis from "./ui/pagination-ellipsis";
import PaginationOutline from "./ui/pagination-outline";
import PricingSectionBasic from "./ui/pricing-section-basic";
import StatisticsSectionBasic from "./ui/statistics-section-basic";
import StatisticsSectionIcons from "./ui/statistics-section-icons";
import TableBasic from "./ui/table-basic";
import TabsBasic from "./ui/tabs-basic";
import TabsIcons from "./ui/tabs-icons";
import TeamSectionGrid from "./ui/team-section-grid";
import TestimonialSectionBasic from "./ui/testimonial-section-basic";
import TextareaBasic from "./ui/textarea-basic";
import TextareaDescriptive from "./ui/textarea-descriptive";
import TextareaDisabled from "./ui/textarea-disabled";
import TextareaError from "./ui/textarea-error";
import TextareaLabel from "./ui/textarea-label";
import TimelineBasic from "./ui/timeline-basic";
import TimelineIcons from "./ui/timeline-icons";

// Registry of preview components
// Each key maps to a component
export const registry: Record<string, ComponentType> = {
  // Accordion
  "accordion-basic": AccordionBasic,
  "accordion-separated": AccordionSeparated,
  "accordion-ghost": AccordionGhost,
  "accordion-icons": AccordionIcons,
  // Auth Form
  "auth-form-basic-sign-in": AuthFormBasicSignIn,
  "auth-form-basic-sign-up": AuthFormBasicSignUp,
  // Avatar
  "avatar-circle": AvatarCircle,
  "avatar-initials": AvatarInitials,
  "avatar-indicator": AvatarIndicator,
  "avatar-label": AvatarLabel,
  // Badge
  "badge-basic": BadgeBasic,
  "badge-icon": BadgeIcon,
  "badge-colors": BadgeColors,
  // Banner
  "banner-basic": BannerBasic,
  "banner-floating": BannerFloating,
  "banner-action": BannerAction,
  "banner-link": BannerLink,
  // Breadcrumb
  "breadcrumb-chevrons": BreadcrumbChevrons,
  "breadcrumb-collapsed": BreadcrumbCollapsed,
  // Button
  "button-primary": ButtonPrimary,
  "button-outline": ButtonOutline,
  "button-ghost": ButtonGhost,
  "button-pill": ButtonPill,
  "button-disabled": ButtonDisabled,
  "button-destructive": ButtonDestructive,
  "button-icon-label": ButtonIconLabel,
  // Button Group
  "button-group-basic": ButtonGroupBasic,
  "button-group-icons": ButtonGroupIcons,
  "button-group-active": ButtonGroupActive,
  // Card
  "card-basic": CardBasic,
  "card-icon": CardIcon,
  "card-group-basic": CardGroupBasic,
  "card-group-two-columns": CardGroupTwoColumns,
  "card-list-basic": CardListBasic,
  "card-list-action": CardListAction,
  // Checkbox
  "checkbox-basic": CheckboxBasic,
  "checkbox-checked": CheckboxChecked,
  "checkbox-disabled": CheckboxDisabled,
  "checkbox-descriptive": CheckboxDescriptive,
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
  // Dropdown
  "dropdown-basic": DropdownBasic,
  "dropdown-icons": DropdownIcons,
  "dropdown-shortcuts": DropdownShortcuts,
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
  "header-section-label": HeaderSectionLabel,
  // Hero Section
  "hero-section-basic": HeroSectionBasic,
  "hero-section-badge-on-top": HeroSectionBadgeOnTop,
  // Input
  "input-basic": InputBasic,
  "input-icon": InputIcon,
  "input-label": InputLabel,
  "input-disabled": InputDisabled,
  "input-error": InputError,
  // Pagination
  "pagination-basic": PaginationBasic,
  "pagination-ellipsis": PaginationEllipsis,
  "pagination-outline": PaginationOutline,
  // Textarea
  "textarea-basic": TextareaBasic,
  "textarea-label": TextareaLabel,
  "textarea-descriptive": TextareaDescriptive,
  "textarea-disabled": TextareaDisabled,
  "textarea-error": TextareaError,
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
  // Table
  "table-basic": TableBasic,
  // Tabs
  "tabs-basic": TabsBasic,
  "tabs-icons": TabsIcons,
  // Team Section
  "team-section-grid": TeamSectionGrid,
  // Testimonial Section
  "testimonial-section-basic": TestimonialSectionBasic,
  // Timeline
  "timeline-basic": TimelineBasic,
  "timeline-icons": TimelineIcons,
};

import type { ComponentType } from "react";

// Import all preview components
import AccordionBasic from "./ui/accordion-basic";
import AccordionIcons from "./ui/accordion-icons";
import AlertDialogBasic from "./ui/alert-dialog-basic";
import AuthFormBasicSignIn from "./ui/auth-form-basic-sign-in";
import AuthFormBasicSignUp from "./ui/auth-form-basic-sign-up";
import AvatarCircle from "./ui/avatar-circle";
import AvatarIndicator from "./ui/avatar-indicator";
import AvatarInitials from "./ui/avatar-initials";
import AvatarLabel from "./ui/avatar-label";
import ButtonBasic from "./ui/button-basic";
import ButtonDestructive from "./ui/button-destructive";
import ButtonOutline from "./ui/button-outline";
import CheckboxBasic from "./ui/checkbox-basic";
import ComparisonListBasic from "./ui/comparison-list-basic";
import ComparisonListSideBySide from "./ui/comparison-list-side-by-side";
import ContactSectionBasic from "./ui/contact-section-basic";
import ContactSectionForm from "./ui/contact-section-form";
import CtaSectionBasic from "./ui/cta-section-basic";
import CtaSectionColored from "./ui/cta-section-colored";
import CtaSectionIcons from "./ui/cta-section-icons";
import DialogBasic from "./ui/dialog-basic";
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
import LogoSectionBasic from "./ui/logo-section-basic";
import LogoSectionHeading from "./ui/logo-section-heading";
import MenuBasic from "./ui/menu-basic";
import NavbarBasic from "./ui/navbar-basic";
import NavbarCenterAlignedLinks from "./ui/navbar-center-aligned-links";
import NewsletterSectionBasic from "./ui/newsletter-section-basic";
import NewsletterSectionCentered from "./ui/newsletter-section-centered";
import PricingSectionBasic from "./ui/pricing-section-basic";
import StatisticsSectionBasic from "./ui/statistics-section-basic";
import StatisticsSectionIcons from "./ui/statistics-section-icons";
import TabsBasic from "./ui/tabs-basic";
import TeamSectionGrid from "./ui/team-section-grid";
import TestimonialSectionBasic from "./ui/testimonial-section-basic";
import TimelineBasic from "./ui/timeline-basic";
import TimelineIcons from "./ui/timeline-icons";

// Registry of preview components
// Each key maps to a component
export const registry: Record<string, ComponentType> = {
  // Accordion
  "accordion-basic": AccordionBasic,
  "accordion-icons": AccordionIcons,
  // Alert Dialog
  "alert-dialog-basic": AlertDialogBasic,
  // Auth Form
  "auth-form-basic-sign-in": AuthFormBasicSignIn,
  "auth-form-basic-sign-up": AuthFormBasicSignUp,
  // Avatar
  "avatar-circle": AvatarCircle,
  "avatar-initials": AvatarInitials,
  "avatar-indicator": AvatarIndicator,
  "avatar-label": AvatarLabel,
  // Button
  "button-basic": ButtonBasic,
  "button-outline": ButtonOutline,
  "button-destructive": ButtonDestructive,
  // Checkbox
  "checkbox-basic": CheckboxBasic,
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
  // Dialog
  "dialog-basic": DialogBasic,
  // Menu
  "menu-basic": MenuBasic,
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
  // Tabs
  "tabs-basic": TabsBasic,
  // Team Section
  "team-section-grid": TeamSectionGrid,
  // Testimonial Section
  "testimonial-section-basic": TestimonialSectionBasic,
  // Timeline
  "timeline-basic": TimelineBasic,
  "timeline-icons": TimelineIcons,
};

# Icon Migration Report — Phosphor + Lucide → Iconoir

**Date:** 2026-05-26

This report documents all icon imports across the project for comparison against
[Iconoir](https://iconoir.com) (`iconoir-react@7.11.0` — already a dependency).

---

## Phosphor Icons (`@phosphor-icons/react`)
**30 unique icons** — used in docs site infrastructure (`src/components/`, `src/app/`)

| # | Icon | Files |
|---|------|-------|
| 1 | `ArrowDownIcon` | `search-dialog.tsx` |
| 2 | `ArrowElbowDownLeftIcon` | `search-dialog.tsx` |
| 3 | `ArrowUpIcon` | `search-dialog.tsx` |
| 4 | `ArrowsHorizontalIcon` | `hint.tsx` |
| 5 | `ArrowsVerticalIcon` | `hint.tsx` |
| 6 | `BookOpenIcon` | `search-dialog.tsx` |
| 7 | `CaretLeftIcon` | `pagination.tsx` |
| 8 | `CaretRightIcon` | `pagination.tsx` |
| 9 | `CheckIcon` | `code.tsx` |
| 10 | `CopyIcon` | `code.tsx` |
| 11 | `CursorTextIcon` | `hint.tsx` |
| 12 | `DiamondsFourIcon` | `page.tsx`, `search-dialog.tsx` |
| 13 | `ExclamationMarkIcon` | `baseline.tsx`, `hint.tsx` |
| 14 | `EyedropperIcon` | `opacity-modifier.tsx` |
| 15 | `FileMdIcon` | `edit-page.tsx` |
| 16 | `HandPointingIcon` | `hover-state.tsx` |
| 17 | `HeartStraightIcon` | `hint.tsx` |
| 18 | `InfoIcon` | `hint.tsx` |
| 19 | `KeyboardIcon` | `hint.tsx` |
| 20 | `LinkIcon` | `api-reference.tsx` |
| 21 | `ListIcon` | `navbar.tsx` |
| 22 | `MagnifyingGlassIcon` | `reference.tsx`, `navbar.tsx`, `search-dialog.tsx` |
| 23 | `MouseLeftClickIcon` | `hint.tsx` |
| 24 | `PlusIcon` | `reference.tsx` |
| 25 | `SealCheckIcon` | `baseline.tsx` |
| 26 | `SignOutIcon` | `search-dialog.tsx` |
| 27 | `SparkleIcon` | `baseline.tsx` |
| 28 | `ThermometerColdIcon` | `negative-values.tsx` |
| 29 | `ThumbsUpIcon` | `hint.tsx` |
| 30 | `XIcon` | `mobile-dialog.tsx`, `navbar.tsx` |

---

## Lucide Icons (`lucide-react`)
**92 unique icons** — used in registry UI components (`src/registry/ui/`); ~160 files, ~550+ instances

| # | Icon | Notable usage files |
|---|------|---------------------|
| 1 | `Activity` | command-palette-* (6 files) |
| 2 | `Archive` | menubar-* (3 files) |
| 3 | `ArrowBigUp` | context-menu, menu, menubar shortcuts |
| 4 | `ArrowDownAZ` | toolbar-* (7 files) |
| 5 | `ArrowLeft` | onboarding-base.tsx |
| 6 | `ArrowRight` | onboarding-base.tsx |
| 7 | `BadgeCheck` | badge-* (4 files) |
| 8 | `Bell` | breadcrumb-icons.tsx |
| 9 | `BellDot` | autocomplete-*, popover-*, tooltip-* (11 files) |
| 10 | `Bold` | button-group-icon, toggle-group-base |
| 11 | `BookDashed` | command-palette-* (6 files) |
| 12 | `BookOpenCheck` | command-palette-* (6 files) |
| 13 | `BookSearch` | command-palette-* (6 files) |
| 14 | `Bookmark` | badge-icon-pill.tsx |
| 15 | `Bug` | tabs-* (3 files) |
| 16 | `Calendar` | menubar-* (3 files) |
| 17 | `CalendarClock` | popover-arrow, tooltip-arrow |
| 18 | `ChartColumn` | command-palette-* (6 files) |
| 19 | `Check` | checkbox-*, combobox-*, select-*, menu-*, dialog-* (35 files) |
| 20 | `CheckCheck` | collapsible-* (2 files), badge-icon-dot-pill |
| 21 | `ChevronDown` | accordion-*, menu-* (26 files) |
| 22 | `ChevronRight` | breadcrumb-*, collapsible-*, menu-* (14 files) |
| 23 | `ChevronsUpDown` | combobox-*, select-*, dialog-* (15 files) |
| 24 | `Circle` | collapsible, context-menu, menu, menubar radios |
| 25 | `CircleCheck` | avatar-* (4 files) |
| 26 | `CirclePlus` | menubar-icons.tsx |
| 27 | `CircleQuestionMark` | autocomplete-*, menu-account (5 files) |
| 28 | `ClipboardCheck` | menu-account (2 files) |
| 29 | `ClipboardList` | tabs-* (3 files) |
| 30 | `Clock` | preview-card-compact, toolbar-link |
| 31 | `CloudUpload` | file-upload-* (7 files) |
| 32 | `Cog` | command-palette-*, toolbar-*, menu-* (15 files) |
| 33 | `Command` | context-menu, command-palette, menu, menubar shortcuts |
| 34 | `Copy` | menubar-* (3 files) |
| 35 | `Delete` | context-menu, menu shortcuts |
| 36 | `Ellipsis` | breadcrumb-collapse.tsx |
| 37 | `EllipsisVertical` | menu-icon-only.tsx |
| 38 | `Eye` | context-menu, field-password, menu-icons (8 files) |
| 39 | `EyeOff` | field-password.tsx |
| 40 | `File` | breadcrumb-icon-trailing, menubar-icons |
| 41 | `FilePenLine` | tooltip-color.tsx |
| 42 | `FilePlusCorner` | command-palette-* (6 files), tooltip-color |
| 43 | `FileText` | command-palette-* (6 files), tooltip-color |
| 44 | `Flag` | tooltip-hover.tsx |
| 45 | `Folder` | breadcrumb-icons, menu-account |
| 46 | `FolderInput` | menubar-* (2 files) |
| 47 | `FolderOutput` | menubar-* (2 files) |
| 48 | `FolderPlus` | menubar-* (3 files) |
| 49 | `FolderX` | empty-state-icon.tsx |
| 50 | `Globe` | autocomplete-* (3 files) |
| 51 | `Grip` | menubar-* (3 files) |
| 52 | `Info` | popover-close.tsx |
| 53 | `Italic` | button-group-icon, toggle-group-base |
| 54 | `Kanban` | toolbar-* (8 files) |
| 55 | `Key` | autocomplete-icon.tsx |
| 56 | `KeyRound` | autocomplete-icon-leading/trailing |
| 57 | `LayoutDashboard` | breadcrumb-icon-leading, breadcrumb-icons |
| 58 | `LayoutList` | toolbar-* (8 files) |
| 59 | `Link` | context-menu, menu, menubar (8 files) |
| 60 | `List` | menubar-* (3 files) |
| 61 | `Loader` | button-loading, collapsible-* |
| 62 | `Lock` | accordion-disabled, collapsible-disabled, menu-disabled |
| 63 | `LockOpen` | badge-icon-right-dot-pill |
| 64 | `LogOut` | menu-account (3 files) |
| 65 | `Minus` | accordion, number-field, toolbar-input (7 files) |
| 66 | `Moon` | toggle-* (4 files) |
| 67 | `NotepadTextDashed` | command-palette-* (6 files) |
| 68 | `Paperclip` | button-icon-only.tsx |
| 69 | `PartyPopper` | onboarding-base.tsx |
| 70 | `Pencil` | avatar-edit, dialog-edit-profile |
| 71 | `Pin` | button-secondary-icon, context-menu, menu-icons (8 files) |
| 72 | `Plus` | accordion, avatar, button, empty-state, toolbar (25 files) |
| 73 | `Rocket` | onboarding-base, tabs-* |
| 74 | `Search` | autocomplete, combobox, command-palette, field (14 files) |
| 75 | `Shredder` | tooltip-close, tooltip-color |
| 76 | `Sparkles` | badge-icon-right-dot, badge-icon-right |
| 77 | `SquareArrowRightExit` | menubar-icons.tsx |
| 78 | `Star` | button-favorite, rating-* |
| 79 | `Sun` | toggle-* (4 files) |
| 80 | `Table` | toolbar-* (8 files) |
| 81 | `TextCursor` | menubar-* (3 files) |
| 82 | `Timeline` | menubar-* (3 files) |
| 83 | `TriangleAlert` | badge, field-error, textarea-error |
| 84 | `Underline` | button-group-icon, toggle-group-base |
| 85 | `UserPlus` | context-menu, menu-icons (6 files) |
| 86 | `UserRound` | avatar, button, menu, menubar (11 files) |
| 87 | `UserRoundCog` | autocomplete-* (3 files) |
| 88 | `UserRoundKey` | autocomplete-icon.tsx |
| 89 | `UserRoundPlus` | button-icon-leading/trailing, empty-state-base |
| 90 | `UserRoundX` | alert-dialog, autocomplete-* |
| 91 | `UsersRound` | breadcrumb-icons, command-palette-*, onboarding (8 files) |
| 92 | `X` | badge, combobox, command-palette, dialog, onboarding, popover (29 files) |

---

## Summary

| Library | Icons | Files | ~Instances |
|---------|-------|-------|-----------|
| `@phosphor-icons/react` | 30 | 13 | ~40 |
| `lucide-react` | 92 | ~118 | ~550 |
| **Total** | **122** | **~131** | **~590** |

`iconoir-react@7.11.0` is already in `package.json` — no install needed.

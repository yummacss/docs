"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "@base-ui/react/button";
import { Field } from "@base-ui/react/field";
import { Input } from "@base-ui/react/input";
import { Separator } from "@base-ui/react/separator";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { Toolbar } from "@base-ui/react/toolbar";
import { Tooltip } from "@base-ui/react/tooltip";
import {
  ImageIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  PaletteIcon,
  PaperclipIcon,
  PaperPlaneTiltIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBolderIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TrashIcon,
  XIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleAlertDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        render={
          <Button className="bg-white c-slate-10 br-2 px-3 py-2 fw-600 bs-o-xs bw-1 bc-silver-2 us-none tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0" />
        }
      >
        Compose
      </AlertDialog.Trigger>
      <AnimatePresence>
        {open && (
          <AlertDialog.Portal keepMounted>
            <AlertDialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              }
              className="p-f i-0 min-h-dvh bg-black/20"
            />
            <div className="p-f i-0 d-f ai-c jc-c">
              <AlertDialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                }
                className="w-full br-2 bg-white c-slate-12 bs-o-lg bw-1 bc-silver-2 o-h"
                style={{ maxWidth: "600px" }}
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <AlertDialog.Title className="fs-sm fw-600 m-0">
                    New message
                  </AlertDialog.Title>
                  <AlertDialog.Close
                    render={
                      <Button className="d-f ai-c jc-c w-7 h-7 br-2 bg-transparent b-0 c-p c-slate-6 h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    <XIcon size={16} weight="bold" aria-hidden />
                  </AlertDialog.Close>
                </div>
                <div className="bbw-1 bc-silver-2" />
                <div className="d-f ai-c g-3 px-4 py-3 bg-indigo-1/50">
                  <span className="d-f ai-c jc-c w-10 h-10 fs-0 br-2 bg-white bs-o-xs bw-1 bc-silver-2 c-indigo">
                    <PaperPlaneTiltIcon size={20} weight="bold" />
                  </span>
                  <div>
                    <h3 className="m-0 mb-1 fs-sm fw-600 c-slate-10">
                      Compose email
                    </h3>
                    <p className="m-0 fs-xs c-slate-8 lh-4">
                      Send a message to your recipient
                    </p>
                  </div>
                </div>
                <div className="bbw-1 bc-silver-2" />
                <div className="px-4 py-5">
                  <div className="d-f fd-c g-3">
                    <Field.Root className="d-f fd-c g-2">
                      <label
                        htmlFor="mail-to"
                        className="fs-xs fw-600 c-slate-8"
                      >
                        To
                      </label>
                      <Input
                        id="mail-to"
                        type="email"
                        placeholder="recipient@example.com"
                        className="h-10 w-full br-2 bw-1 bc-silver-3 pl-3 fs-sm c-slate-10 bg-white fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                      />
                    </Field.Root>
                    <Field.Root className="d-f fd-c g-2">
                      <label
                        htmlFor="mail-subject"
                        className="fs-xs fw-600 c-slate-8"
                      >
                        Subject
                      </label>
                      <Input
                        id="mail-subject"
                        placeholder="Enter subject"
                        className="h-10 w-full br-2 bw-1 bc-silver-3 pl-3 fs-sm c-slate-10 bg-white fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                      />
                    </Field.Root>
                    <Field.Root className="d-f fd-c g-2">
                      <label
                        htmlFor="mail-message"
                        className="fs-xs fw-600 c-slate-8"
                      >
                        Message
                      </label>
                      <div className="p-r br-2 bw-1 bc-silver-3 bg-white fv-w:os-s fv-w:ow-2 fv-w:oo-2 fv-w:oc-indigo-6">
                        <textarea
                          id="mail-message"
                          placeholder="Write your message..."
                          rows={12}
                          className="w-full px-3 pt-3 pb-12 br-2 bw-0 fs-sm c-slate-10 bg-transparent r-none o-n"
                        />
                        <Toolbar.Root className="p-a b-0 l-0 r-0 d-f ai-c fw-w g-1 btw-1 bc-silver-3 bg-white p-1">
                          <ToggleGroup className="d-f g-1">
                            <Tooltip.Provider closeDelay={0}>
                              <Tooltip.Root>
                                <Tooltip.Trigger
                                  render={
                                    <Toggle
                                      value="bold"
                                      className={(state) =>
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <TextBolderIcon size={16} weight="bold" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                      Bold
                                    </Tooltip.Popup>
                                  </Tooltip.Positioner>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                            <Tooltip.Provider closeDelay={0}>
                              <Tooltip.Root>
                                <Tooltip.Trigger
                                  render={
                                    <Toggle
                                      value="italic"
                                      className={(state) =>
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <TextItalicIcon size={16} weight="bold" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                      Italic
                                    </Tooltip.Popup>
                                  </Tooltip.Positioner>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                            <Tooltip.Provider closeDelay={0}>
                              <Tooltip.Root>
                                <Tooltip.Trigger
                                  render={
                                    <Toggle
                                      value="underline"
                                      className={(state) =>
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <TextUnderlineIcon size={16} weight="bold" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                      Underline
                                    </Tooltip.Popup>
                                  </Tooltip.Positioner>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                          </ToggleGroup>
                          <Separator
                            orientation="vertical"
                            className="w-px h-5 bg-silver-3"
                          />
                          <Tooltip.Provider closeDelay={0}>
                            <Tooltip.Root>
                              <Tooltip.Trigger
                                render={
                                  <Toolbar.Button className="d-f w-8 h-8 ai-c jc-c bw-0 br-1 us-none c-p bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                                }
                              >
                                <PaletteIcon size={16} weight="bold" />
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Positioner sideOffset={8}>
                                  <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                    Text color
                                  </Tooltip.Popup>
                                </Tooltip.Positioner>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
                          <Separator
                            orientation="vertical"
                            className="w-px h-5 bg-silver-3"
                          />
                          <ToggleGroup className="d-f g-1">
                            <Tooltip.Provider closeDelay={0}>
                              <Tooltip.Root>
                                <Tooltip.Trigger
                                  render={
                                    <Toggle
                                      value="left"
                                      className={(state) =>
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <TextAlignLeftIcon size={16} weight="bold" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                      Align left
                                    </Tooltip.Popup>
                                  </Tooltip.Positioner>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                            <Tooltip.Provider closeDelay={0}>
                              <Tooltip.Root>
                                <Tooltip.Trigger
                                  render={
                                    <Toggle
                                      value="center"
                                      className={(state) =>
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <TextAlignCenterIcon
                                    size={16}
                                    weight="bold"
                                  />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                      Align center
                                    </Tooltip.Popup>
                                  </Tooltip.Positioner>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                            <Tooltip.Provider closeDelay={0}>
                              <Tooltip.Root>
                                <Tooltip.Trigger
                                  render={
                                    <Toggle
                                      value="right"
                                      className={(state) =>
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <TextAlignRightIcon size={16} weight="bold" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                      Align right
                                    </Tooltip.Popup>
                                  </Tooltip.Positioner>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                          </ToggleGroup>
                          <Separator
                            orientation="vertical"
                            className="w-px h-5 bg-silver-3"
                          />
                          <ToggleGroup className="d-f g-1">
                            <Tooltip.Provider closeDelay={0}>
                              <Tooltip.Root>
                                <Tooltip.Trigger
                                  render={
                                    <Toggle
                                      value="bullets"
                                      className={(state) =>
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <ListBulletsIcon size={16} weight="bold" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                      Bullet list
                                    </Tooltip.Popup>
                                  </Tooltip.Positioner>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                            <Tooltip.Provider closeDelay={0}>
                              <Tooltip.Root>
                                <Tooltip.Trigger
                                  render={
                                    <Toggle
                                      value="numbers"
                                      className={(state) =>
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-1 us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <ListNumbersIcon size={16} weight="bold" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                      Numbered list
                                    </Tooltip.Popup>
                                  </Tooltip.Positioner>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                          </ToggleGroup>
                          <Separator
                            orientation="vertical"
                            className="w-px h-5 bg-silver-3"
                          />
                          <Tooltip.Provider closeDelay={0}>
                            <Tooltip.Root>
                              <Tooltip.Trigger
                                render={
                                  <Toolbar.Button className="d-f w-8 h-8 ai-c jc-c bw-0 br-1 us-none c-p bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                                }
                              >
                                <TrashIcon size={16} weight="bold" />
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Positioner sideOffset={8}>
                                  <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                    Remove formatting
                                  </Tooltip.Popup>
                                </Tooltip.Positioner>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
                          <Separator
                            orientation="vertical"
                            className="w-px h-5 bg-silver-3"
                          />
                          <Tooltip.Provider closeDelay={0}>
                            <Tooltip.Root>
                              <Tooltip.Trigger
                                render={
                                  <Toolbar.Button className="d-f ai-c g-2 h-8 px-2 br-1 bw-0 fs-xs fw-600 c-slate-8 us-none c-p bg-transparent h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                                }
                              >
                                <PaperclipIcon size={16} weight="bold" />
                                Attach
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Positioner sideOffset={8}>
                                  <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                    Attach files from your device
                                  </Tooltip.Popup>
                                </Tooltip.Positioner>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
                          <Tooltip.Provider closeDelay={0}>
                            <Tooltip.Root>
                              <Tooltip.Trigger
                                render={
                                  <Toolbar.Button className="d-f ai-c g-2 h-8 px-2 br-1 bw-0 fs-xs fw-600 c-slate-8 us-none c-p bg-transparent h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                                }
                              >
                                <ImageIcon size={16} weight="bold" />
                                Insert
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Positioner sideOffset={8}>
                                  <Tooltip.Popup className="bg-slate-12 c-white px-2 py-1 br-1 fs-xs us-none">
                                    Insert images into message
                                  </Tooltip.Popup>
                                </Tooltip.Positioner>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
                        </Toolbar.Root>
                      </div>
                    </Field.Root>
                  </div>
                </div>
                <div className="d-g gtc-2 g-3 px-4 py-3">
                  <AlertDialog.Close
                    render={
                      <Button className="bg-white c-slate-10 br-2 px-3 py-2 fw-600 bs-o-xs bw-1 bc-silver-2 us-none tp-c tdu-150 ttf-io h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 c-p b-0" />
                    }
                  >
                    Discard
                  </AlertDialog.Close>
                  <AlertDialog.Close
                    render={
                      <Button className="bg-indigo c-white br-2 px-3 py-2 fw-600 bs-o-md bw-1 bc-indigo-7 fv:oc-indigo-6 us-none tp-c tdu-150 ttf-io h:bg-indigo-8 fv:ow-2 fv:oo-2 c-p b-0" />
                    }
                  >
                    Send
                  </AlertDialog.Close>
                </div>
              </AlertDialog.Popup>
            </div>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}

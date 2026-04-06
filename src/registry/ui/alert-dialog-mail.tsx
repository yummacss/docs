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
  Bold,
  Italic,
  ListOl,
  ListUl,
  Palette,
  Paperclip,
  PaperPlane,
  Picture,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  TrashBin,
  Underline,
  Xmark,
} from "@gravity-ui/icons";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

export default function ExampleAlertDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger
        render={
          <Button className="px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
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
            <div className="d-f p-f i-0 ai-c jc-c">
              <AlertDialog.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                }
                className="o-h w-full max-w-sm bg-white bc-silver-2 c-slate-12 br-md bw-1 bs-o-lg"
              >
                <div className="d-f jc-sb ai-c px-4 py-2 bg-silver-1/50">
                  <AlertDialog.Title className="fs-md fw-600">
                    New message
                  </AlertDialog.Title>
                  <AlertDialog.Close
                    render={
                      <Button className="d-f b-0 ai-c jc-c w-7 h-7 bg-transparent c-slate-6 br-md h:bg-silver-2 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    <Xmark aria-hidden className="w-4 h-4" />
                  </AlertDialog.Close>
                </div>
                <div className="bc-silver-2 bbw-1" />
                <div className="d-f ai-c g-3 px-4 py-3 bg-indigo-1/50">
                  <span className="d-f ai-c jc-c fs-0 w-10 h-10 bg-white bc-silver-2 c-indigo br-md bw-1 bs-o-xs">
                    <PaperPlane className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="mb-1 c-slate-10 fs-md fw-600">
                      Compose email
                    </h3>
                    <p className="c-slate-8 fs-xs lh-4">
                      Send a message to your recipient
                    </p>
                  </div>
                </div>
                <div className="bc-silver-2 bbw-1" />
                <div className="px-4 py-5">
                  <div className="d-f fd-c g-3">
                    <Field.Root className="d-f fd-c g-2">
                      <label
                        htmlFor="mail-to"
                        className="c-slate-8 fs-xs fw-600"
                      >
                        To
                      </label>
                      <Input
                        id="mail-to"
                        type="email"
                        placeholder="recipient@example.com"
                        className="h-10 w-full pl-3 bg-white bc-silver-3 c-slate-10 br-md bw-1 fs-md fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                      />
                    </Field.Root>
                    <Field.Root className="d-f fd-c g-2">
                      <label
                        htmlFor="mail-subject"
                        className="c-slate-8 fs-xs fw-600"
                      >
                        Subject
                      </label>
                      <Input
                        id="mail-subject"
                        placeholder="Enter subject"
                        className="h-10 w-full pl-3 bg-white bc-silver-3 c-slate-10 br-md bw-1 fs-md fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6"
                      />
                    </Field.Root>
                    <Field.Root className="d-f fd-c g-2">
                      <label
                        htmlFor="mail-message"
                        className="c-slate-8 fs-xs fw-600"
                      >
                        Message
                      </label>
                      <div className="p-r o-h bg-white bc-silver-3 br-md bw-1 fv-w:os-s fv-w:ow-2 fv-w:oo-2 fv-w:oc-indigo-6">
                        <textarea
                          id="mail-message"
                          rows={12}
                          className="w-full px-3 pt-3 pb-12 bg-transparent c-slate-10 os-none br-md bw-0 fs-md r-none"
                        />
                        <Toolbar.Root className="d-f p-a b-0 l-0 r-0 ai-c fw-w g-1 p-1 bg-white bc-silver-3 btw-1">
                          <ToggleGroup className="d-f g-1">
                            <Tooltip.Provider closeDelay={0}>
                              <Tooltip.Root>
                                <Tooltip.Trigger
                                  render={
                                    <Toggle
                                      value="bold"
                                      className={(state) =>
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-sm us-none fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <Bold className="w-4 h-4" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-sm us-none fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <Italic className="w-4 h-4" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-sm us-none fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <Underline className="w-4 h-4" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                  <Toolbar.Button className="d-f ai-c jc-c w-8 h-8 bg-transparent c-slate-8 bw-0 br-sm us-none h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                                }
                              >
                                <Palette className="w-4 h-4" />
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Positioner sideOffset={8}>
                                  <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-sm us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <TextAlignLeft className="w-4 h-4" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-sm us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <TextAlignCenter className="w-4 h-4" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-sm us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <TextAlignRight className="w-4 h-4" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-sm us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <ListUl className="w-4 h-4" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                        `d-f w-8 h-8 ai-c jc-c bw-0 br-sm us-none c-p fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6 ${
                                          state.pressed
                                            ? "bg-indigo c-white"
                                            : "bg-transparent c-slate-8 h:bg-silver-1 h:c-slate-10"
                                        }`
                                      }
                                    />
                                  }
                                >
                                  <ListOl className="w-4 h-4" />
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Positioner sideOffset={8}>
                                    <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                  <Toolbar.Button className="d-f ai-c jc-c w-8 h-8 bg-transparent c-slate-8 bw-0 br-sm us-none h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                                }
                              >
                                <TrashBin className="w-4 h-4" />
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Positioner sideOffset={8}>
                                  <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                  <Toolbar.Button className="d-f ai-c g-2 h-8 px-2 bg-transparent c-slate-8 br-sm bw-0 fs-xs fw-600 us-none h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                                }
                              >
                                <Paperclip className="w-4 h-4" />
                                Attach
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Positioner sideOffset={8}>
                                  <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                                  <Toolbar.Button className="d-f ai-c g-2 h-8 px-2 bg-transparent c-slate-8 br-sm bw-0 fs-xs fw-600 us-none h:bg-silver-1 h:c-slate-10 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                                }
                              >
                                <Picture className="w-4 h-4" />
                                Insert
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Positioner sideOffset={8}>
                                  <Tooltip.Popup className="px-2 py-1 bg-slate-12 c-white br-sm fs-xs us-none">
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
                      <Button className="px-3 py-2 bg-white bc-silver-2 c-slate-10 br-md bw-1 fw-600 bs-o-xs tp-c tdu-150 ttf-io us-none h:bg-silver-1/50 fv:os-s fv:ow-2 fv:oo-2 fv:oc-indigo-6" />
                    }
                  >
                    Discard
                  </AlertDialog.Close>
                  <AlertDialog.Close
                    render={
                      <Button className="px-3 py-2 bg-indigo h:bg-indigo-8 bc-indigo-7 c-white br-md bw-1 fw-600 bs-o-md tp-c tdu-150 ttf-io us-none fv:oc-indigo-6 fv:ow-2 fv:oo-2" />
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

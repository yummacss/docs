"use client";

import { useEffect, useRef, useState } from "react";

const MIN_ANGLE = -135;
const MAX_ANGLE = 135;
const SWEEP = MAX_ANGLE - MIN_ANGLE;
const TICK_COUNT = 9;
const MIN_VALUE = 0;
const MAX_VALUE = 100;

function valueToAngle(value: number) {
  return MIN_ANGLE + ((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * SWEEP;
}

function pointerToValue(clientX: number, clientY: number, rect: DOMRect) {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  let angle = Math.atan2(clientX - cx, -(clientY - cy)) * (180 / Math.PI);
  if (angle > MAX_ANGLE) {
    angle = angle < MAX_ANGLE + 90 ? MAX_ANGLE : MIN_ANGLE;
  } else if (angle < MIN_ANGLE) {
    angle = angle > MIN_ANGLE - 90 ? MIN_ANGLE : MAX_ANGLE;
  }
  const ratio = (angle - MIN_ANGLE) / SWEEP;
  return Math.round(MIN_VALUE + ratio * (MAX_VALUE - MIN_VALUE));
}

export default function SliderKnob() {
  const [value, setValue] = useState(50);
  const discRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!draggingRef.current || !discRef.current) return;
      setValue(
        pointerToValue(
          e.clientX,
          e.clientY,
          discRef.current.getBoundingClientRect(),
        ),
      );
    };
    const handleUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    if (discRef.current) {
      setValue(
        pointerToValue(
          e.clientX,
          e.clientY,
          discRef.current.getBoundingClientRect(),
        ),
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next = value;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = Math.min(MAX_VALUE, value + 1);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = Math.max(MIN_VALUE, value - 1);
        break;
      case "PageUp":
        next = Math.min(MAX_VALUE, value + 10);
        break;
      case "PageDown":
        next = Math.max(MIN_VALUE, value - 10);
        break;
      case "Home":
        next = MIN_VALUE;
        break;
      case "End":
        next = MAX_VALUE;
        break;
      default:
        return;
    }
    e.preventDefault();
    setValue(next);
  };

  const angle = valueToAngle(value);

  return (
    <div className="d-f fd-c ai-c g-3 us-none">
      <div className="d-f p-r ai-c jc-c w-20 h-20">
        {Array.from({ length: TICK_COUNT }).map((_, i) => {
          const tickAngle = MIN_ANGLE + (i / (TICK_COUNT - 1)) * SWEEP;
          const filled = tickAngle <= angle + 0.001;
          const distRatio = filled ? (angle - tickAngle) / SWEEP : 0;
          const tickClass = !filled
            ? "bg-silver-2"
            : distRatio < 0.05
              ? "bg-indigo"
              : distRatio < 0.2
                ? "bg-indigo/70"
                : distRatio < 0.4
                  ? "bg-indigo/50"
                  : distRatio < 0.6
                    ? "bg-indigo/30"
                    : "bg-indigo/15";
          return (
            <div
              key={tickAngle}
              className="d-f p-a i-0 jc-c ai-fs"
              style={{ transform: `rotate(${tickAngle}deg)` }}
            >
              <div className={`w-2 h-2 br-pill ${tickClass}`} />
            </div>
          );
        })}
        <div
          ref={discRef}
          role="slider"
          tabIndex={0}
          aria-label="Volume"
          aria-valuemin={MIN_VALUE}
          aria-valuemax={MAX_VALUE}
          aria-valuenow={value}
          aria-valuetext={`${value}%`}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          className="d-f p-r ai-c jc-c w-9 h-9 bg-silver-1 br-pill c-g ta-none a:c-gr fv:ow-2 fv:oo-2 fv:oc-indigo-5"
        >
          <div
            className="d-f p-a i-0 jc-c ai-fs pt-1"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div className="w-2 h-3 bg-indigo br-pill" />
          </div>
        </div>
      </div>
      <span className="c-slate-8 fs-sm">{value}%</span>
    </div>
  );
}

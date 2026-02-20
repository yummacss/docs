import { Button } from "@base-ui/react/button";
import { SpinnerIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button
        disabled
        className="d-f ai-c g-2 bg-indigo c-white br-2 px-2 py-1 fw-600 fs-sm bs-o-xs bw-1 bc-indigo-7 us-none c-p b-0 o-60"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <SpinnerIcon size={14} weight="bold" />
        </motion.div>
        Button sm
      </Button>
      <Button
        disabled
        className="d-f ai-c g-2 bg-indigo c-white br-2 px-3 py-2 fw-600 bs-o-md bw-1 bc-indigo-7 us-none c-p b-0 o-60"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <SpinnerIcon size={16} weight="bold" />
        </motion.div>
        Button md
      </Button>
      <Button
        disabled
        className="d-f ai-c g-2 bg-indigo c-white br-2 px-4 py-3 fw-600 fs-lg bs-o-md bw-1 bc-indigo-7 us-none c-p b-0 o-60"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <SpinnerIcon size={18} weight="bold" />
        </motion.div>
        Button lg
      </Button>
    </div>
  );
}

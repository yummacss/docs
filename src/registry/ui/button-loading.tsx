import { Button } from "@base-ui/react/button";
import { SpinnerIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

export default function ExampleButton() {
  return (
    <div className="d-f ai-c g-3">
      <Button
        disabled
        className="d-f b-0 ai-c g-2 px-2 py-1 bg-indigo bc-indigo-7 c-white br-2 bw-1 fw-600 fs-sm bs-o-xs o-60 us-none c-p"
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
        className="d-f b-0 ai-c g-2 px-3 py-2 bg-indigo bc-indigo-7 c-white br-2 bw-1 fw-600 bs-o-md o-60 us-none c-p"
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
        className="d-f b-0 ai-c g-2 px-4 py-3 bg-indigo bc-indigo-7 c-white br-2 bw-1 fw-600 fs-lg bs-o-md o-60 us-none c-p"
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

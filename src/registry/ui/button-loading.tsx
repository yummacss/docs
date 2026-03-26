import { Button } from "@base-ui/react/button";
import { CircleDashed } from "@gravity-ui/icons";
import { motion } from "motion/react";

export default function ExampleButton() {
  return (
    <Button
      disabled
      className="d-f b-0 ai-c g-2 px-3 py-2 bg-indigo bc-indigo-7 c-white br-md bw-1 fw-600 bs-o-md o-60 us-none c-p"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <CircleDashed className="w-4 h-4" />
      </motion.div>
      Please wait
    </Button>
  );
}

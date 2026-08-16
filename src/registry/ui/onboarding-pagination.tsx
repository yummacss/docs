import { BoxIso, Community, PeaceHand, SparksSolid } from "iconoir-react";
import Onboarding, { type OnboardingStep } from "./onboarding";

export default function OnboardingPagination() {
  return (
    <Onboarding trigger="Start your journey" indicator="dots" steps={steps} />
  );
}

const steps: OnboardingStep[] = [
  {
    icon: <PeaceHand className="w-6 h-6 c-black" />,
    title: "Welcome to the team",
    description:
      "Great to have you on board! Have a look at your projects, work with your team and make your ideas real.",
  },
  {
    icon: <Community className="w-6 h-6 c-black" />,
    title: "Connect with your team",
    description:
      "Browse member directories, join channels, and see what everyone's working on in real time.",
  },
  {
    icon: <BoxIso className="w-6 h-6 c-black" />,
    title: "Launch your first project",
    description:
      "Create a board, assign tasks, and set milestones. Everything you need to ship faster.",
  },
  {
    icon: <SparksSolid className="w-6 h-6 c-black" />,
    title: "You're ready to go!",
    description:
      "Your workspace is all set. Start collaborating with your team and make your ideas real.",
  },
];

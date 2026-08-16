import { BoxIso, Community, PeaceHand, SparksSolid } from "iconoir-react";
import Onboarding, { type OnboardingStep } from "./onboarding";

export default function OnboardingChecklist() {
  return <Onboarding trigger="Start your journey" steps={steps} />;
}

const steps: OnboardingStep[] = [
  {
    icon: <PeaceHand className="w-6 h-6 c-black" />,
    title: "Welcome to the team",
    description:
      "Great to have you on board! Complete a few setup steps to get started.",
    tasks: [
      { id: "profile", label: "Set up your profile" },
      { id: "preferences", label: "Configure workspace preferences" },
    ],
  },
  {
    icon: <Community className="w-6 h-6 c-black" />,
    title: "Connect with your team",
    description: "Invite your colleagues and start collaborating right away.",
    tasks: [
      { id: "invite", label: "Invite team members" },
      { id: "channels", label: "Join project channels" },
      { id: "role", label: "Assign team roles" },
    ],
  },
  {
    icon: <BoxIso className="w-6 h-6 c-black" />,
    title: "Launch your first project",
    description:
      "Create a board, assign tasks, and set milestones. Everything you need to ship faster.",
    tasks: [
      { id: "board", label: "Create a project board" },
      { id: "milestone", label: "Set a milestone" },
    ],
  },
  {
    icon: <SparksSolid className="w-6 h-6 c-black" />,
    title: "You're ready to go!",
    description:
      "Your workspace is all set. Start collaborating with your team and make your ideas real.",
    tasks: [],
  },
];

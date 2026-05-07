import { Avatar } from "@base-ui/react/avatar";
import { CircleCheckFill, PersonFill } from "@gravity-ui/icons";

export default function AvatarSizes() {
  return (
    <div className="d-f fd-c g-6 ai-c o-s">
      {sizes.map((s) => (
        <div key={s.id} className="d-f ai-c g-6 fw-w">
          <div className="p-r">
            <Avatar.Root
              className={`d-if o-h ai-c jc-c ${s.size} bg-silver-1 bc-white br-pill bw-1 va-m us-none`}
            >
              <Avatar.Image
                src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Sarah&backgroundColor=DAF0B9"
                alt="Sarah"
                className="of-c w-full h-full"
              />
            </Avatar.Root>
            <span
              className={`p-a b-0 r-0 ${s.status} bc-white br-pill bw-1 bg-green-6`}
            />
          </div>

          <div className="p-r">
            <Avatar.Root
              className={`d-if o-h ai-c jc-c ${s.size} bg-silver-1 bc-white br-pill bw-1 va-m us-none`}
            >
              <Avatar.Image
                src="https://api.dicebear.com/9.x/open-peeps/svg?seed=John&backgroundColor=B4E9F2"
                alt="John"
                className="of-c w-full h-full"
              />
            </Avatar.Root>
            <span
              className={`d-f p-a b-0 r-0 ai-c jc-c ${s.status} bg-white bc-white br-pill bw-1`}
            >
              <CircleCheckFill className="w-full h-full c-indigo" />
            </span>
          </div>

          <Avatar.Root
            className={`d-if o-h ai-c jc-c ${s.size} bg-indigo-1 br-pill va-m us-none`}
          >
            <Avatar.Fallback className="d-f ai-c jc-c w-full h-full c-indigo">
              <PersonFill className={`${s.icon}`} />
            </Avatar.Fallback>
          </Avatar.Root>

          <Avatar.Root
            className={`d-if o-h ai-c jc-c ${s.size} bg-indigo-1 bc-indigo-3 br-pill bw-1 va-m us-none`}
          >
            <Avatar.Fallback
              className={`d-f ai-c jc-c w-full h-full c-indigo ${s.text} fw-500`}
            >
              {s.initial}
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      ))}
    </div>
  );
}

const sizes = [
  {
    id: "xl",
    size: "w-16 h-16",
    status: "w-5 h-5",
    icon: "w-8 h-8",
    text: "fs-xl",
    initial: "S",
  },
  {
    id: "lg",
    size: "w-14 h-14",
    status: "w-4 h-4",
    icon: "w-7 h-7",
    text: "fs-lg",
    initial: "A",
  },
  {
    id: "md",
    size: "w-12 h-12",
    status: "w-4 h-4",
    icon: "w-6 h-6",
    text: "fs-md",
    initial: "J",
  },
  {
    id: "sm",
    size: "w-10 h-10",
    status: "w-3 h-3",
    icon: "w-5 h-5",
    text: "fs-sm",
    initial: "L",
  },
  {
    id: "xs",
    size: "w-8 h-8",
    status: "w-3 h-3",
    icon: "w-4 h-4",
    text: "fs-xs",
    initial: "R",
  },
];

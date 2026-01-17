import { StarIcon } from "@phosphor-icons/react";

export default function TestimonialSectionBasic() {
  return (
    <section className="py-12 px-6 ta-c max-w-3xl m-auto d-f fd-c ai-c">
      <blockquote>
        <p className="fs-xl fw-500 c-slate-8 lh-4 mb-6">
          Suddenly, we can ship and scale multiple high-quality projects in no
          time. I can't believe how much time I wasted without this library!
        </p>
      </blockquote>
      <div className="d-12 br-pill o-h mb-2">
        {/** biome-ignore lint/performance/noImgElement: This is just a demo */}
        <img
          src="https://untitledui.com/images/avatars/jordan-burgess"
          alt="Jordan Burgess"
          className="w-full h-full of-c"
        />
      </div>
      <div className="fs-md fw-500 c-black fs-n mb-1">Jordan Burgess</div>
      <div className="fs-sm c-silver-10 mb-4">Chief Technology Officer</div>
      <div className="d-f ai-c g-1 c-orange">
        <StarIcon size={20} weight="fill" />
        <StarIcon size={20} weight="fill" />
        <StarIcon size={20} weight="fill" />
        <StarIcon size={20} weight="fill" />
        <StarIcon size={20} weight="fill" />
      </div>
    </section>
  );
}

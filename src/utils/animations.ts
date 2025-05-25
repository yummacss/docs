import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const scrollReveal = (elements: NodeListOf<Element>) => {
  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        visibility: "visible",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  });
};

export const splitTextReveal = () => {
  document.fonts.ready.then(() => {
    gsap.set(".o-0", { opacity: 1 });
    let split = new SplitText("#reveal", {
      type: "words",
      wordsClass: "d-ib",
    });

    gsap.from(split.words, {
      opacity: 0,
      duration: 1,
      ease: "sine.out",
      stagger: 0.1,
    });
  });
};

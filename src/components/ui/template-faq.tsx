import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/accordion";
import Link from "next/link";

export default function TemplateFAQ() {
  return (
    <div className="my-8">
      <Accordion>
        {/* Template Contents */}
        <p className="fs-xs c-white/40 tt-u ls-8 mb-2 mt-4">
          Template Contents
        </p>

        <AccordionItem value="what-included">
          <AccordionTrigger>What's included in the template?</AccordionTrigger>
          <AccordionPanel>
            This template includes the complete source code, all pages shown in
            the preview, responsive design, and any components used. You'll get
            everything you need to launch your project.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="get-everything">
          <AccordionTrigger>
            What does "Get everything" really mean?
          </AccordionTrigger>
          <AccordionPanel>
            It means that every time we release a new template, you'll get
            access to it for free with no additional cost. You can find more
            info about licensing{" "}
            <Link href="/ui/license" className="c-white h:td-u">
              here
            </Link>
            .
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="updates">
          <AccordionTrigger>Are updates included?</AccordionTrigger>
          <AccordionPanel>
            Yes! All licenses include lifetime updates. You'll receive all
            future improvements, bug fixes, and new features for the template
            you purchased.
          </AccordionPanel>
        </AccordionItem>

        {/* Licensing */}
        <p className="fs-xs c-white/40 tt-u ls-8 mb-2 mt-6">Licensing</p>

        <AccordionItem value="license-difference">
          <AccordionTrigger>
            What's the difference between Personal and Commercial?
          </AccordionTrigger>
          <AccordionPanel>
            The Personal license allows one end product. The Commercial license
            allows unlimited end products for you or your clients. You can find
            more info about licensing{" "}
            <Link href="/ui/license" className="c-white h:td-u">
              here
            </Link>
            .
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="open-source">
          <AccordionTrigger>
            Can I use the template in open source projects?
          </AccordionTrigger>
          <AccordionPanel>
            Yes, as long as the template is part of a larger project and not
            redistributed as a template, starter, or UI kit on its own. You can
            find more info about licensing{" "}
            <Link href="/ui/license" className="c-white h:td-u">
              here
            </Link>
            .
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="team-usage">
          <AccordionTrigger>Can my team use the template?</AccordionTrigger>
          <AccordionPanel>
            Team members directly involved in the project can access the
            template files. However, the template should not be shared as a
            general-purpose library or redistributed internally. You can find
            more info about licensing{" "}
            <Link href="/ui/license" className="c-white h:td-u">
              here
            </Link>
            .
          </AccordionPanel>
        </AccordionItem>

        {/* Purchases & Support */}
        <p className="fs-xs c-white/40 tt-u ls-8 mb-2 mt-6">
          Purchases & Support
        </p>

        <AccordionItem value="refunds">
          <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
          <AccordionPanel>
            Due to the nature of digital products, all sales are final. However,
            we may consider refunds in exceptional cases such as duplicate
            purchases or technical access issues. Please contact us if you have
            any problems. You can find more info about licensing{" "}
            <Link href="/ui/license" className="c-white h:td-u">
              here
            </Link>
            .
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="payment-methods">
          <AccordionTrigger>
            What payment methods do you accept?
          </AccordionTrigger>
          <AccordionPanel>
            We process payments securely through{" "}
            <Link
              href="https://polar.sh"
              className="c-white h:td-u"
              target="_blank"
            >
              Polar
            </Link>
            , which accepts major credit cards and other payment methods.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="support">
          <AccordionTrigger>How do I get support?</AccordionTrigger>
          <AccordionPanel>
            You can reach out to us via{" "}
            <Link
              href="https://discord.gg/yummacss"
              className="c-white h:td-u"
              target="_blank"
            >
              Discord
            </Link>{" "}
            or{" "}
            <Link
              href="https://x.com/yummacss"
              className="c-white h:td-u"
              target="_blank"
            >
              Twitter
            </Link>{" "}
            in case you find any issues or have questions.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

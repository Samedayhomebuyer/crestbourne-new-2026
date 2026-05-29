import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";
import AnimateIn from "@/components/AnimateIn";

const companies = [
  "Bluesky Properties Estates Ltd",
  "Crestbourne Ltd",
  "Crestbourne Estates Ltd",
  "Crestbourne Properties Ltd",
  "Crestsky Ltd",
  "Family Assets Investments Ltd",
  "Family Assets Ltd",
  "Family Assets Trading Ltd",
  "Fast Homes Investments Ltd",
  "Fast Homes UK Ltd",
  "Fineland Investments Ltd",
  "Fineland Properties Ltd",
  "Hillcrest Estates Ltd",
  "Home and Countries UK Ltd",
  "Land and Homes Estates Ltd",
  "London Properties & Regional Ltd",
  "Newstone Land and Properties Ltd",
  "Property and Fields UK Ltd",
  "Property UK Estates Ltd",
  "Rencrown Ltd",
  "Rosesky Properties Ltd",
  "Same Day Home Buyer Ltd",
  "Sky Land Property Estates Ltd",
  "Tbaum Holdings Ltd",
  "Tdrive Properties Ltd",
];

const stats = [
  { value: "39", label: "Group Companies" },
  { value: "6", label: "Specialist Sectors" },
  { value: "25+", label: "Years Experience" },
];

export default function GroupStructure() {
  return (
    <section id="group" className="py-24 bg-bg-2">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[60px] items-end mb-14">
          <AnimateIn>
            <div className="font-mono text-[11px] tracking-widest2 uppercase text-muted flex items-center">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-[10px] translate-y-[1px]" />
              The Group
            </div>
            <h2 className="font-serif font-normal text-[clamp(48px,5.5vw,80px)] leading-[0.98] tracking-[-0.02em] mt-4">
              39 Companies,<br /><em className="italic text-accent">One Vision.</em>
            </h2>
          </AnimateIn>
          <AnimateIn as="p" delay={150} className="text-[17px] leading-[1.6] text-ink-2 max-w-[50ch] pb-[6px]">
            A comprehensive network of specialised property companies working together to deliver exceptional value across every aspect of UK real estate investment and development.
          </AnimateIn>
        </div>

        <AnimateIn stagger className="grid grid-cols-3 gap-px border border-rule bg-rule mb-16">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper px-8 py-10">
              <div className="font-serif text-[clamp(40px,4vw,64px)] leading-[1] tracking-[-0.02em] text-ink mb-2">
                {s.value}
              </div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">{s.label}</div>
            </div>
          ))}
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          <div>
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-6">
              Group Companies
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-rule bg-rule">
              {companies.map((name) => (
                <div
                  key={name}
                  className="bg-paper px-5 py-4 font-serif text-[15px] leading-[1.3] tracking-[-0.01em] text-ink"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-10">
            <p className="font-serif text-[28px] leading-[1.25] tracking-[-0.01em] text-ink mb-7">
              Each company specialises in a specific aspect of property investment, development, and management — creating a comprehensive ecosystem of real estate expertise.
            </p>
            <p className="text-[16px] text-ink-2 leading-[1.7] mb-7 max-w-[52ch]">
              With 39 specialised companies across 6 key sectors, the Crestbourne Group offers unparalleled expertise and comprehensive solutions for all your property investment needs.
            </p>
            <Button variant="ghost" asChild>
              <a href="/contact">Get in touch <ArrowIcon /></a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

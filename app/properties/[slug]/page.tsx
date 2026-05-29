import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";
import PropertyDetailHero from "@/components/property/PropertyDetailHero";
import PropertyImageGallery from "@/components/property/PropertyImageGallery";
import RelatedProperties from "@/components/property/RelatedProperties";
import PropertySubscribeCta from "@/components/property/PropertySubscribeCta";
import MobileActionBar from "@/components/property/MobileActionBar";
import { getPropertyBySlug, getRelatedProperties } from "@/lib/data/properties";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return {};
  return {
    title: `${property.title} | Crestbourne`,
    description: property.description ?? undefined,
  };
}

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug);
  if (!property || !property.isPublished) notFound();

  const related = await getRelatedProperties(property.slug, property.category, 3);
  const statLine = [property.units ? `${property.units} units` : null, property.type]
    .filter(Boolean).join(" · ");

  return (
    <>
      <Nav />

      <PropertyDetailHero property={property} />

      {/* Overview + sticky sidebar */}
      <section className="py-24 bg-[#f3efe6]">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_392px] gap-[64px] items-start">
            {/* Description */}
            <AnimateIn>
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted flex items-center mb-0">
                <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-[10px] translate-y-[1px]" />
                About this holding
              </div>
              <p className="text-[19px] leading-[1.7] text-ink-2 max-w-[60ch] mt-[22px] mb-0" style={{ textWrap: "pretty" } as React.CSSProperties}>
                {property.description}
              </p>
              <div className="flex gap-4 items-start mt-[28px] pt-6 border-t border-rule-soft max-w-[60ch]">
                <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-gold whitespace-nowrap pt-[3px]">
                  House view
                </span>
                <p className="text-[14.5px] leading-[1.65] text-muted m-0">
                  Held within our core thesis: undervalued, income-producing property bought below replacement
                  cost and held for the long term. Every Crestbourne asset is operated by our own team — leasing,
                  maintenance, capex and compliance, with no outsourcing.
                </p>
              </div>
            </AnimateIn>

            {/* Sticky details sidebar */}
            <AnimateIn delay={120} className="lg:sticky lg:top-24">
              <div className="bg-paper border border-rule relative rounded-[2px] overflow-visible">
                <div
                  className="absolute inset-x-[-1px] top-[-1px] h-[6px] rounded-t-[2px]"
                  style={{ background: "linear-gradient(90deg,#2f4a36 0 33%,#8a6d3a 33% 66%,#171612 66%)" }}
                />
                <div className="p-[32px_30px_30px]">
                  <div className="flex justify-between items-baseline mb-5">
                    <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Property details</span>
                    {property.refCode && (
                      <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-gold">{property.refCode}</span>
                    )}
                  </div>

                  <dl className="m-0">
                    {[
                      { label: "Location", value: property.location },
                      property.address ? { label: "Address", value: property.address } : null,
                      { label: "Type", value: property.type },
                      { label: "Category", value: property.category },
                      property.units ? { label: "Units", value: property.units } : null,
                      property.acquisitionDate ? { label: "Acquired", value: new Date(property.acquisitionDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) } : null,
                    ].filter(Boolean).map((d, i) => (
                      <div key={d!.label}
                        className={`flex justify-between items-baseline gap-4 py-3 ${i > 0 ? "border-t border-rule-soft" : ""}`}>
                        <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted flex-shrink-0 m-0">{d!.label}</dt>
                        <dd className="text-[14px] text-ink font-medium text-right m-0">{d!.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-[26px] flex flex-col gap-3 border-t border-rule pt-6">
                    <Button variant="default" className="w-full justify-between" asChild>
                      <a href="#register">
                        Enquire about this deal <ArrowIcon className="w-[14px] h-[14px]" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between" asChild>
                      <a href="/#contact">
                        Submit a property <ArrowIcon className="w-[14px] h-[14px]" />
                      </a>
                    </Button>
                  </div>

                  <ul className="list-none m-0 p-0 mt-[18px] flex flex-col gap-[10px]">
                    {["Direct, principal-to-principal", "We respond personally within 2 days"].map((item) => (
                      <li key={item} className="flex items-center gap-[9px] text-[12.5px] text-muted">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-accent flex-shrink-0">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <PropertyImageGallery images={property.images} />

      {/* Related holdings */}
      <RelatedProperties properties={related} />

      {/* Investor register */}
      <PropertySubscribeCta />

      <Footer />

      <MobileActionBar name={property.title} ref={property.refCode ?? undefined} statLine={statLine} />
    </>
  );
}

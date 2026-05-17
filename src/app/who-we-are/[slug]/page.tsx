import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings, getPageBySlug } from "@/lib/actions";

export default async function WhoWeArePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const settings = await getSettings();
  const page = await getPageBySlug(slug);

  const title = page?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Data templates
  const isFounder = page?.template_type === 'founder';
  const isModular = page?.template_type === 'modular';
  const contentArray = Array.isArray(page?.content) ? page.content : [];

  return (
    <main className="bg-white min-h-screen">
      <Navbar logo={settings?.logo_url} />

      {/* Hero Section */}
      <section className="relative h-[50vh] w-full bg-black">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover brightness-[0.3]" 
          alt={title}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl md:text-5xl font-light font-serif tracking-[0.2em] uppercase">{title}</h1>
          <div className="w-16 h-px bg-primary mt-8" />
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          {isModular ? (
            <div className="flex flex-col gap-24">
              {contentArray.map((section: any, idx: number) => {
                if (section.type === 'hero') {
                  return (
                    <section key={idx} className="relative w-full h-[50vh] overflow-hidden rounded-[2rem] shadow-xl">
                      <img src={section.image} alt={section.title} className="w-full h-full object-cover brightness-[0.4]" />
                      <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">
                        <h2 className="text-white text-3xl font-light font-serif tracking-[0.2em] uppercase mb-4">{section.title}</h2>
                        <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">{section.subtitle}</p>
                      </div>
                    </section>
                  );
                }

                if (section.type === 'text') {
                  return (
                    <section key={idx} className="max-w-3xl mx-auto">
                      {section.title && (
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-serif tracking-widest text-black uppercase">{section.title}</h3>
                          <div className="w-12 h-px bg-primary mx-auto mt-4" />
                        </div>
                      )}
                      <p className="text-black/70 text-lg leading-relaxed text-justify md:text-center font-light">
                        {section.body}
                      </p>
                    </section>
                  );
                }

                if (section.type === 'image_text') {
                  const isLeft = section.image_align !== 'right';
                  return (
                    <section key={idx} className={`flex flex-col lg:flex-row gap-16 items-center ${!isLeft ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="flex-1 w-full relative">
                        <div className="aspect-[16/10] w-full overflow-hidden shadow-2xl rounded-2xl">
                          <img src={section.image} alt={section.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-widest text-black mb-6">{section.title}</h3>
                        <p className="text-black/60 text-base leading-relaxed text-justify">
                          {section.body}
                        </p>
                      </div>
                    </section>
                  );
                }

                if (section.type === 'features') {
                  return (
                    <section key={idx} className="bg-gray-50/50 rounded-[2rem] p-10 border border-gray-100">
                      {section.title && (
                        <div className="text-center mb-10">
                          <h3 className="text-2xl font-serif tracking-widest text-black uppercase">{section.title}</h3>
                          <div className="w-12 h-px bg-primary mx-auto mt-4" />
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {(section.items || []).map((item: any, fIdx: number) => (
                          <div key={fIdx} className="space-y-2 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
                            <h4 className="text-base font-bold text-black uppercase tracking-wider">{item.title}</h4>
                            <p className="text-black/60 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                }

                if (section.type === 'founder_list') {
                  return (
                    <section key={idx} className="py-8">
                      {section.title && (
                        <div className="text-center mb-16">
                          <h3 className="text-2xl font-serif tracking-widest text-black uppercase">{section.title}</h3>
                          <div className="w-12 h-px bg-primary mx-auto mt-4" />
                        </div>
                      )}
                      <div className="flex flex-col gap-24">
                        {(section.items || []).map((founder: any, fIdx: number) => (
                          <div key={fIdx} className={`flex flex-col lg:flex-row gap-16 items-center ${fIdx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="flex-1 w-full relative">
                              <div className="aspect-[4/5] w-full overflow-hidden shadow-2xl rounded-2xl">
                                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="mb-6">
                                <h4 className="text-3xl font-serif uppercase tracking-widest text-black mb-2">{founder.name}</h4>
                                <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">{founder.designation}</p>
                              </div>
                              <blockquote className="text-lg md:text-xl leading-relaxed text-black/70 italic font-serif border-l-[3px] border-primary pl-6 py-2 bg-gray-50/50">
                                "{founder.quote}"
                              </blockquote>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                }

                return null;
              })}
            </div>
          ) : isFounder ? (
            <div className="flex flex-col gap-24">
              <div className="text-center mb-12">
                <h2 className="text-black text-sm font-bold tracking-[0.3em] mb-4 uppercase">Leadership</h2>
                <p className="text-black/60 text-lg max-w-2xl mx-auto">
                  Meet the visionaries behind {settings?.company_name || 'AR Creative Homes'}, shaping the future of premium real estate.
                </p>
              </div>
              
              {contentArray.map((founder: any, index: number) => (
                <div key={index} className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full relative">
                    <div className="aspect-[4/5] w-full overflow-hidden shadow-2xl">
                      <img src={founder.image} alt={founder.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                    {/* Decorative element */}
                    <div className={`absolute -bottom-8 ${index % 2 !== 0 ? '-left-8' : '-right-8'} w-32 h-32 bg-[#f4f4f4] -z-10 hidden md:block`} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-8">
                      <h3 className="text-3xl md:text-4xl font-serif uppercase tracking-widest text-black mb-3">{founder.name}</h3>
                      <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase">{founder.designation}</p>
                    </div>
                    <blockquote className="text-xl md:text-2xl leading-relaxed text-black/70 italic font-serif border-l-[3px] border-primary pl-8 py-4 bg-gray-50/50">
                      "{founder.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto text-center py-12">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                <span className="text-primary text-xl font-serif italic">AR</span>
              </div>
              <h2 className="text-2xl font-serif uppercase tracking-widest text-black mb-6">Coming Soon</h2>
              <p className="text-black/60 text-lg leading-relaxed text-justify md:text-center">
                This is the placeholder content for the <strong className="text-black uppercase">{title}</strong> page. 
                {settings?.company_name || 'AR Creative Homes'} continues to strive for excellence in all its endeavors. 
                Please update the content for this page in the CMS or the codebase as required.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

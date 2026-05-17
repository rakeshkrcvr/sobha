import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings, getPageBySlug } from "@/lib/actions";

export default async function WhoWeArePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const settings = await getSettings();
  const page = await getPageBySlug(slug);

  const title = page?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Data for Our Founder page
  const isFounder = page?.template_type === 'founder';
  const founders = Array.isArray(page?.content) ? page.content : [];

  return (
    <main className="bg-white min-h-screen">
      <Navbar logo={settings?.logo_url} />

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full bg-black">
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
          {isFounder ? (
            <div className="flex flex-col gap-24">
              <div className="text-center mb-12">
                <h2 className="text-black text-sm font-bold tracking-[0.3em] mb-4 uppercase">Leadership</h2>
                <p className="text-black/60 text-lg max-w-2xl mx-auto">
                  Meet the visionaries behind {settings?.company_name || 'AR Creative Homes'}, shaping the future of premium real estate.
                </p>
              </div>
              
              {founders.map((founder, index) => (
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

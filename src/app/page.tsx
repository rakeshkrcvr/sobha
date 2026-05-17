import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CityGrid from "@/components/CityGrid";
import BrandSection from "@/components/BrandSection";
import MoreAboutAR from "@/components/MoreAboutAR";
import Footer from "@/components/Footer";

import { getLocations, getSettings, getPageBySlug } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await getSettings();
  const locations = await getLocations();
  const homePage = await getPageBySlug('home');

  // Parse modular content array
  const contentArray = Array.isArray(homePage?.content) ? homePage.content : [];

  // Fallback default sections if page hasn't been created or is empty
  const finalSections = contentArray.length > 0 ? contentArray : [
    {
      type: 'home_slider',
      items: [
        {
          src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
          type: "image",
          title: "Luxury Redefined",
          subtitle: "AR Creative Homes"
        }
      ]
    },
    {
      type: 'cities_grid',
      title: 'Choose Your Lifestyle City'
    },
    {
      type: 'brand_philosophy',
      title: 'Our Philosophy',
      subtitle: 'Crafting Timeless Lifestyles',
      description: 'At AR Creative Homes, our philosophy is anchored in transparency, luxury finishes, and highly reliable structural designs.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80'
    },
    {
      type: 'more_about_ar'
    }
  ];

  return (
    <main className="min-h-screen bg-black">
      <Navbar logo={settings?.logo_url} />

      {finalSections.map((section: any, idx: number) => {
        // 1. Homepage Hero Slider
        if (section.type === 'home_slider') {
          return (
            <Hero key={idx} slides={section.items || []} />
          );
        }

        // 2. Cities Navigation Grid
        if (section.type === 'cities_grid') {
          return (
            <CityGrid key={idx} locations={locations} title={section.title || 'LOCATIONS'} />
          );
        }

        // 3. Brand Philosophy
        if (section.type === 'brand_philosophy') {
          const brandData = {
            title: section.title,
            subtitle: section.subtitle,
            description: section.description,
            image_url: section.image
          };
          return (
            <BrandSection key={idx} data={brandData} />
          );
        }

        // 4. More About AR Grid
        if (section.type === 'more_about_ar') {
          return (
            <MoreAboutAR 
              key={idx} 
              title={section.title} 
              subtitle={section.subtitle} 
              items={section.items} 
            />
          );
        }

        // 5. Standard Pages Visual Sections (Text, Features, Image & Text, Team Grids)
        // This lets the admin dynamically insert other visual components directly to the homepage!
        if (section.type === 'hero') {
          return (
            <section key={idx} className="relative w-full h-[50vh] overflow-hidden">
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
            <section key={idx} className="py-20 bg-white">
              <div className="max-w-3xl mx-auto px-6">
                {section.title && (
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-serif tracking-widest text-black uppercase">{section.title}</h3>
                    <div className="w-12 h-px bg-primary mx-auto mt-4" />
                  </div>
                )}
                <p className="text-black/70 text-lg leading-relaxed text-justify md:text-center font-light">
                  {section.body}
                </p>
              </div>
            </section>
          );
        }

        if (section.type === 'image_text') {
          const isLeft = section.image_align !== 'right';
          return (
            <section key={idx} className="py-20 bg-white">
              <div className="container mx-auto px-6 max-w-6xl">
                <div className={`flex flex-col lg:flex-row gap-16 items-center ${!isLeft ? 'lg:flex-row-reverse' : ''}`}>
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
                </div>
              </div>
            </section>
          );
        }

        if (section.type === 'features') {
          return (
            <section key={idx} className="py-20 bg-white">
              <div className="container mx-auto px-6 max-w-6xl bg-gray-50/50 rounded-[2rem] p-10 border border-gray-100">
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
              </div>
            </section>
          );
        }

        if (section.type === 'founder_list') {
          return (
            <section key={idx} className="py-20 bg-white">
              <div className="container mx-auto px-6 max-w-6xl">
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
              </div>
            </section>
          );
        }

        return null;
      })}

      <Footer />
    </main>
  );
}

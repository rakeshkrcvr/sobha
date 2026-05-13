import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityGrid from "@/components/CityGrid";
import Link from "next/link";

import { getProjects, getSettings, getLocations } from "@/lib/actions";

export default async function ResidentialPage() {
  const projects = await getProjects();
  const settings = await getSettings();
  const locations = await getLocations(); // I'll need to import this

  const stats = [
    { label: "PREMIUM", value: "LIFESTYLE" },
    { label: "SMART", value: "INVESTMENTS" },
    { label: "TRUSTED", value: "PARTNERS" },
    { label: "EXPERT", value: "GUIDANCE" },
  ];

  return (
    <main className="bg-white">
      <Navbar logo={settings.logo_url} />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-black">
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover brightness-50" 
          alt="Residential Hero"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl md:text-4xl font-light font-serif tracking-[0.2em] uppercase">{settings.company_name || "AR CREATIVE HOMES"}</h1>
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center border-r last:border-none border-white/20 px-4">
                  <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1">{stat.label}</p>
                  <p className="text-white text-xs md:text-sm font-bold tracking-widest">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <h2 className="text-black text-sm font-bold tracking-[0.2em] mb-8 border-b border-black/10 pb-4 uppercase">LOCATIONS</h2>
            <div className="flex flex-col gap-4">
              {locations.map((city: any) => (
                <Link 
                  key={city.id} 
                  href="#" 
                  className="text-black/60 text-[13px] hover:text-primary transition-colors tracking-wide uppercase"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <div className="max-w-4xl">
              <p className="text-black/60 text-[15px] leading-relaxed mb-20 text-justify">
                {settings.company_name || "AR Creative Homes"} is a modern real estate brand committed to creating premium lifestyles and smart investment opportunities for the next generation. 
                With a perfect blend of luxury, innovation, and trust, we specialize in delivering high-quality residential and commercial properties 
                that redefine urban living. Our team of experienced real estate professionals works closely with every client to understand their 
                needs and recommend the best property options based on lifestyle preferences and investment objectives.
              </p>

              <div className="flex items-center gap-8 mb-20">
                <div className="flex-1 h-px bg-black/10" />
                <div className="text-center">
                  <p className="text-black/40 text-xs tracking-[0.3em] uppercase mb-2">THERE'S NO PLACE</p>
                  <p className="text-black text-2xl font-serif uppercase">LIKE AN {settings.company_name?.split(' ')[0] || "AR"} HOME</p>
                </div>
                <div className="flex-1 h-px bg-black/10" />
              </div>

              <h3 className="text-black text-[13px] font-bold tracking-[0.3em] mb-12 uppercase">OUR PROJECTS</h3>
              
              <div className="grid md:grid-cols-2 gap-12 mb-32">
                {projects.map((project: any) => (
                  <div key={project.id} className="group cursor-pointer">
                    <div className="aspect-[16/10] overflow-hidden mb-6">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h4 className="text-center text-black/60 text-[13px] tracking-widest uppercase">{project.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CityGrid locations={locations} />
      <Footer />
    </main>
  );
}

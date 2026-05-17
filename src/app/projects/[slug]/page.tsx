import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";
import { getSettings, getProjectBySlug } from "@/lib/actions";
import { MapPin, Building2, Calendar, ShieldCheck, Compass, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AMENITIES, getAmenityIcon } from "@/lib/amenities";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: "Project Not Found | AR Creative Homes",
      description: "The requested project listing could not be found.",
    };
  }

  return {
    title: `${project.title} | AR Creative Homes`,
    description: project.description || `Explore ${project.title} located in ${project.location_name} - premium real estate by AR Creative Homes.`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const settings = await getSettings();
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Generate some realistic premium features based on category/location
  const isResidential = project.category?.toLowerCase() === "residential";
  const features = isResidential 
    ? [
        { title: "24/7 Premium Security", desc: "Multi-tier security with state-of-the-art surveillance." },
        { title: "Clubhouse & Spa", desc: "Exclusive membership access to luxury spa, salon, and lounge." },
        { title: "Vastu Compliant Design", desc: "Beautifully balanced architecture designed for harmony." },
        { title: "Modern Gymnasium", desc: "Fully equipped athletic center with professional trainers." }
      ]
    : [
        { title: "High-Speed Elevators", desc: "Smart destination control passenger & service elevators." },
        { title: "Premium Retail Spaces", desc: "Prime visual frontage on the lower floors for high footfall." },
        { title: "Advanced Fire Systems", desc: "Modern safety, smoke detection and fire suppression systems." },
        { title: "Fiber Optic Backbone", desc: "Dedicated high-bandwidth IT infrastructure and dual power feeds." }
      ];

  const highlights = [
    { icon: Building2, label: "Type", value: project.category || "Residential" },
    { icon: MapPin, label: "Location", value: project.location_name || "NCR region" },
    { icon: Calendar, label: "Possession", value: "Ready to Move" },
    { icon: ShieldCheck, label: "RERA Status", value: "Registered" },
  ];

  return (
    <main className="bg-white min-h-screen">
      <Navbar logo={settings?.logo_url} />

      {/* Hero Banner Section */}
      <section className="relative h-[65vh] w-full bg-black overflow-hidden">
        <img 
          src={project.image} 
          className="w-full h-full object-cover brightness-[0.45] scale-100 hover:scale-105 transition-transform duration-10000" 
          alt={project.title}
        />
        
        {/* Subtle radial overlay for premium deepness */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
          <div className="container mx-auto px-6 max-w-6xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-white/60 text-[10px] tracking-[0.2em] uppercase mb-4">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link href="/residential" className="hover:text-primary transition-colors">Projects</Link>
              <ChevronRight size={10} />
              <span className="text-white font-bold">{project.title}</span>
            </div>
            
            <div className="inline-flex gap-2 mb-4">
              <span className="bg-primary text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {project.category}
              </span>
              {project.is_featured && (
                <span className="bg-white text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  ★ Featured Listing
                </span>
              )}
            </div>
            
            <h1 className="text-white text-3xl md:text-5xl font-light font-serif tracking-wider uppercase mb-3 max-w-4xl leading-tight">
              {project.title}
            </h1>
            
            <div className="flex items-center gap-2 text-white/80">
              <MapPin size={16} className="text-primary animate-pulse" />
              <span className="uppercase tracking-[0.2em] text-[11px] font-bold">{project.location_name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 md:py-24 bg-white relative">
        {/* Decorative dynamic background blur circle */}
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          {/* Top Quick Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 p-8 md:p-12 mb-20 shadow-sm">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center p-2 border-r last:border-none border-black/5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-gray-400 text-[10px] tracking-widest uppercase mb-1">{item.label}</span>
                  <span className="text-black text-xs md:text-sm font-bold tracking-wider uppercase">{item.value}</span>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-12 gap-16 md:gap-20 items-start">
            
            {/* Left: Project Story & Details */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <span className="w-6 h-px bg-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">Exclusive Overview</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-black uppercase tracking-wide">
                  Architectural Grandeur & Modern Craftsmanship
                </h2>
                <div className="text-gray-600 text-sm md:text-base leading-relaxed text-justify space-y-6">
                  {project.description ? (
                    project.description.split('\n\n').map((paragraph: string, pIdx: number) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))
                  ) : (
                    <p>
                      Welcome to {project.title}, a premium lifestyle destination curated by AR Creative Homes. Located strategically in the highly sought-after zone of {project.location_name}, this remarkable project stands as a testament to exceptional architectural aesthetics, modern build techniques, and timeless elegance. Every square foot is conceptualized to maximize functional layout, natural light flow, and exquisite comfort.
                    </p>
                  )}
                  
                  {!project.description && (
                    <p>
                      Each space within {project.title} has been sculpted with premium materials and custom finishes to guarantee a majestic atmosphere. From high ceiling corridors to breathtaking views, these homes and commercial layouts cater to corporate clients and discerning buyers who appreciate fine luxury and intelligent value creation.
                    </p>
                  )}
                </div>
              </div>

              {/* Signature Project Features (Always Visible) */}
              <div className="space-y-8 pt-6 border-t border-black/5">
                <h3 className="text-sm font-bold text-black uppercase tracking-[0.2em] mb-6">Signature Project Features</h3>
                <div className="grid sm:grid-cols-2 gap-8">
                  {features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                        <CheckCircle2 size={14} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-black uppercase tracking-wider mb-1.5">{feature.title}</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Location Value Card */}
              <div className="relative bg-black text-white p-10 rounded-[2rem] overflow-hidden shadow-xl shadow-black/5 mt-10">
                <div className="absolute top-[-30%] right-[-10%] w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                <Compass className="absolute right-8 bottom-8 text-white/[0.03] w-36 h-36 rotate-12 pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <span className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase">Premium Location Value</span>
                  <p className="text-sm md:text-base italic font-serif leading-relaxed text-white/80">
                    "{project.title} represents a curated synthesis of location advantage, robust structural integrity, and contemporary elegance, offering you unparalleled capital appreciation and premium living standard."
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">— AR Creative Homes Advisory</p>
                </div>
              </div>

              {/* World-Class Selected Amenities Section (Renders right below Premium Location Value Card) */}
              {project.amenities && Array.isArray(project.amenities) && project.amenities.length > 0 && (
                <div className="space-y-8 pt-10 border-t border-black/5 mt-10">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="w-6 h-px bg-primary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">World-class Amenities</span>
                  </div>
                  <h3 className="text-sm font-bold text-black uppercase tracking-[0.2em] mb-6">Premium Project Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {project.amenities.map((amenityId: string) => {
                      const amenity = AMENITIES.find(a => a.id === amenityId);
                      if (!amenity) return null;
                      const IconComponent = getAmenityIcon(amenity.iconName);
                      return (
                        <div 
                          key={amenityId} 
                          className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md hover:border-primary/10 transition-all duration-300 group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
                            <IconComponent size={16} strokeWidth={2} />
                          </div>
                          <span className="text-[10px] font-bold text-black uppercase tracking-wider truncate leading-none">{amenity.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Premium Dynamic Inquiry Sidebar */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ProjectInquiryForm 
                projectTitle={project.title} 
                projectLocation={project.location_name || "NCR"} 
              />
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

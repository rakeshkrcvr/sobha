"use client";

import React from "react";
import { MapPin, Navigation, Compass, Route, Train, GraduationCap, HeartPulse, ShoppingBag, Plane } from "lucide-react";

interface AdvantageItem {
  iconName: string;
  title: string;
  desc: string;
  time: string;
}

interface ProjectLocationProps {
  projectTitle: string;
  locationName: string;
  mapIframe?: string;
  locationAdvantages?: any;
}

const getAdvantageIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case "route": return Route;
    case "train": return Train;
    case "education":
    case "graduationcap": return GraduationCap;
    case "healthcare":
    case "heartpulse": return HeartPulse;
    case "shopping":
    case "shoppingbag": return ShoppingBag;
    case "plane":
    case "airport": return Plane;
    default: return MapPin;
  }
};

export default function ProjectLocation({ projectTitle, locationName, mapIframe, locationAdvantages }: ProjectLocationProps) {
  const city = locationName || "NCR";
  const isMeerut = city.toLowerCase().includes("meerut");
  const isGhaziabad = city.toLowerCase().includes("ghaziabad");
  const isNoida = city.toLowerCase().includes("noida");

  // Dynamic configuration based on project location
  let mapQuery = `${projectTitle}, ${city}, Uttar Pradesh`;
  let defaultAdvantages = [
    {
      icon: Route,
      title: "Excellent Connectivity",
      desc: `Just 5 mins from Noida-Greater Noida Expressway and DND Flyway.`,
      time: "5 min"
    },
    {
      icon: Train,
      title: "Metro Station",
      desc: "Noida Sector 18 and Sector 52 metro hubs are within a 5 mins drive.",
      time: "3-5 min"
    },
    {
      icon: GraduationCap,
      title: "Education",
      desc: "Close to Amity University, Shiv Nadar School, and Pathways.",
      time: "10 min"
    },
    {
      icon: HeartPulse,
      title: "Healthcare",
      desc: "Fortis Hospital and Felix Hospital within immediate reach.",
      time: "8 min"
    },
    {
      icon: ShoppingBag,
      title: "Shopping & Entertainment",
      desc: "DLF Mall of India, Great India Place, and Sector 18 market.",
      time: "5 min"
    },
    {
      icon: Plane,
      title: "Airport",
      desc: "Upcoming Jewar Noida International Airport is a 45 mins drive.",
      time: "45 min"
    }
  ];

  let defaultBottomHighlights = [
    { icon: Route, title: "Noida Expressway", value: "5 min" },
    { icon: Train, title: "Sector 18 Metro Station", value: "3 min" },
    { icon: HeartPulse, title: "Fortis Hospital Noida", value: "8 min" },
    { icon: ShoppingBag, title: "DLF Mall of India", value: "5 min" }
  ];

  // Resolve advantages list
  let resolvedAdvantages = defaultAdvantages;
  let resolvedBottomHighlights = defaultBottomHighlights;

  if (isMeerut) {
    mapQuery = `Meerut Bypass Road, Meerut, Uttar Pradesh`;
    resolvedAdvantages = [
      {
        icon: Route,
        title: "Excellent Connectivity",
        desc: "Just 2 mins from Delhi-Meerut Expressway and Bypass Road.",
        time: "2 min"
      },
      {
        icon: Train,
        title: "Railway Station",
        desc: "Meerut City Railway Station is just a 15 mins drive.",
        time: "15 min"
      },
      {
        icon: GraduationCap,
        title: "Education",
        desc: "Close to top schools, colleges and coaching institutes.",
        time: "5-10 min"
      },
      {
        icon: HeartPulse,
        title: "Healthcare",
        desc: "Multispeciality hospitals and clinics within easy reach.",
        time: "5 min"
      },
      {
        icon: ShoppingBag,
        title: "Shopping & Entertainment",
        desc: "Nearby shopping malls, markets and entertainment zones.",
        time: "5-12 min"
      },
      {
        icon: Plane,
        title: "Airport",
        desc: "Hindon Airport (Ghaziabad) is just 45 mins drive.",
        time: "45 min"
      }
    ];
    resolvedBottomHighlights = [
      { icon: Route, title: "Delhi-Meerut Expressway", value: "2 min" },
      { icon: Train, title: "Meerut City Railway Station", value: "15 min" },
      { icon: HeartPulse, title: "Max Super Speciality Hospital", value: "5 min" },
      { icon: ShoppingBag, title: "Shopprix Mall", value: "7 min" }
    ];
  } else if (isGhaziabad) {
    mapQuery = `Ghaziabad, Uttar Pradesh`;
    resolvedAdvantages = [
      {
        icon: Route,
        title: "Excellent Connectivity",
        desc: "Just 5 mins from NH-24 and Eastern Peripheral Expressway.",
        time: "5 min"
      },
      {
        icon: Train,
        title: "Railway Station",
        desc: "Ghaziabad Junction Railway Station is just 10 mins away.",
        time: "10 min"
      },
      {
        icon: GraduationCap,
        title: "Education",
        desc: "Close to DPS Ghaziabad, IMS, and other top educational hubs.",
        time: "5-10 min"
      },
      {
        icon: HeartPulse,
        title: "Healthcare",
        desc: "Max Super Speciality Hospital Vaishali is within easy reach.",
        time: "5 min"
      },
      {
        icon: ShoppingBag,
        title: "Shopping & Entertainment",
        desc: "Nearby Shipra Mall, Pacific Mall, and local high streets.",
        time: "5 min"
      },
      {
        icon: Plane,
        title: "Airport",
        desc: "Hindon Airport is just a 35 mins drive.",
        time: "35 min"
      }
    ];
    resolvedBottomHighlights = [
      { icon: Route, title: "NH-24 Expressway", value: "5 min" },
      { icon: Train, title: "Ghaziabad Junction", value: "10 min" },
      { icon: HeartPulse, title: "Max Hospital Vaishali", value: "5 min" },
      { icon: ShoppingBag, title: "Pacific Mall", value: "8 min" }
    ];
  }

  // Parse custom location data from props if supplied
  let customAdvList: AdvantageItem[] = [];
  if (locationAdvantages) {
    if (Array.isArray(locationAdvantages)) {
      customAdvList = locationAdvantages;
    } else if (typeof locationAdvantages === 'string') {
      try {
        customAdvList = JSON.parse(locationAdvantages);
      } catch (e) {
        console.error("Failed to parse custom location advantages:", e);
      }
    }
  }

  if (customAdvList && customAdvList.length > 0) {
    resolvedAdvantages = customAdvList.map((adv) => ({
      icon: getAdvantageIcon(adv.iconName),
      title: adv.title,
      desc: adv.desc,
      time: adv.time
    }));

    resolvedBottomHighlights = customAdvList.slice(0, 4).map((adv) => ({
      icon: getAdvantageIcon(adv.iconName),
      title: adv.title,
      value: adv.time
    }));
  }

  // Resolve map URL
  let mapUrl = "";
  if (mapIframe && mapIframe.trim().startsWith("http")) {
    mapUrl = mapIframe;
  } else {
    const encodedQuery = encodeURIComponent(mapQuery);
    mapUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  }
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <section className="pt-20 md:pt-24 border-t border-gray-100 w-full">
      {/* Title Header */}
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2">
          <MapPin size={14} className="text-primary animate-pulse" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">Location</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif text-black uppercase tracking-wide">
          Prime Location, Perfect Connectivity
        </h2>
        <p className="text-gray-500 text-xs md:text-sm max-w-4xl leading-relaxed">
          {projectTitle} is strategically located in the heart of {city}, offering excellent connectivity 
          to major landmarks, schools, hospitals, shopping hubs and transport networks.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-12">
        {/* Left Column: Interactive Map Mockup */}
        <div className="lg:col-span-7 flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="relative flex-1 min-h-[350px] md:min-h-[400px] bg-gray-100">
            <iframe
              src={mapUrl}
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen={false}
              loading="lazy"
              title={`${projectTitle} location map`}
            />
          </div>
          {/* Map details bar */}
          <div className="p-5 border-t border-gray-50 bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-black tracking-wider uppercase">{projectTitle}</h4>
                <p className="text-[10px] text-gray-500 font-semibold mt-1">Near By-Pass Road, {city}, Uttar Pradesh</p>
              </div>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Compass size={14} /> Get Directions
            </a>
          </div>
        </div>

        {/* Right Column: Location Advantages */}
        <div className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-sm font-bold text-black uppercase tracking-[0.2em] relative inline-block">
                Location Advantages
                <span className="absolute bottom-[-17px] left-0 w-8 h-0.5 bg-primary" />
              </h3>
            </div>

            <div className="space-y-5">
              {resolvedAdvantages.map((adv, idx) => {
                const Icon = adv.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-black uppercase tracking-wider">{adv.title}</h4>
                        <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap">{adv.time}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-semibold mt-1 leading-relaxed">
                        {adv.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Quick highlights row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/50 border border-gray-100 rounded-3xl p-6">
        {resolvedBottomHighlights.map((hl, idx) => {
          const Icon = hl.icon;
          return (
            <div key={idx} className="flex items-center gap-4 p-2 border-r last:border-none border-gray-200/50">
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <h5 className="text-[10px] font-bold text-black uppercase tracking-wider truncate">{hl.title}</h5>
                <p className="text-xs font-bold text-primary mt-0.5">{hl.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

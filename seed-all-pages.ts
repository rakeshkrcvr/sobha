import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

// Extract DATABASE_URL from .env
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/DATABASE_URL=["']?([^"'\n]+)["']?/);
if (match && match[1]) {
  process.env.DATABASE_URL = match[1];
}

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

const pagesToSeed = [
  // --- WHO WE ARE ---
  // Philosophy
  {
    slug: 'our-vision',
    title: 'Our Vision',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Our Vision',
        subtitle: 'Shaping the future of luxury architectures.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Vision Statement',
        body: 'To be the most trusted and premium real-estate brand, pioneering smart home integrations, eco-friendly structural designs, and exquisite premium lifestyles that elevate community living for generations.'
      }
    ]
  },
  {
    slug: 'core-values',
    title: 'Core Values',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Core Values',
        subtitle: 'The pillars of our dedication.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
      },
      {
        type: 'features',
        title: 'Our Core Pillars',
        items: [
          { title: 'Integrity', desc: 'Absolute transparency in transactions and legal clearances. We deliver exactly what we promise.' },
          { title: 'Excellence', desc: 'Uncompromising engineering quality and premium material selections for a robust foundation.' },
          { title: 'Innovation', desc: 'Integrating modern automation, high-speed amenities, and sustainable energy configurations.' },
          { title: 'Customer First', desc: 'An outstanding home-buying experience supported by our legal and property experts.' }
        ]
      }
    ]
  },
  {
    slug: 'mission-statement',
    title: 'Mission Statement',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Mission Statement',
        subtitle: 'Crafting homes that inspire.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Our Everyday Commitment',
        body: 'To consistently conceptualize and execute state-of-the-art living and commercial structures, ensuring fast delivery timelines, premium aesthetics, and remarkable investment returns for all our stakeholders.'
      }
    ]
  },
  // Leadership
  {
    slug: 'about-us',
    title: 'About Us',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'About Us',
        subtitle: 'AR Creative Homes - Innovators in Premium Real Estate.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
      },
      {
        type: 'image_text',
        title: 'Delivering Premium Spaces',
        body: 'AR Creative Homes represents a forward-thinking real estate development brand based in NCR. By combining timeless architectural aesthetics with highly reliable engineering standards, we create addresses that evoke pride, confidence, and smart luxury.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
        image_align: 'left'
      }
    ]
  },
  {
    slug: 'management-team',
    title: 'Management Team',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Management Team',
        subtitle: 'Meet our board of directors.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
      },
      {
        type: 'founder_list',
        title: 'The Directors of Success',
        items: [
          {
            name: 'Amit Kumar Chaudhary',
            designation: 'Managing Director - Operation & Sales',
            quote: 'We do not just construct walls, we create trusted environments where life is lived to the absolute premium.',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80'
          },
          {
            name: 'Ravi Kumar',
            designation: 'Managing Director - Marketing & Sales',
            quote: 'Transparent commitments and architectural marvels are the absolute standard of our brand.',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80'
          }
        ]
      }
    ]
  },
  // Showcase
  {
    slug: 'our-journey',
    title: 'Our Journey',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Our Journey',
        subtitle: 'An evolution of luxury and structural marvels.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'How It All Began',
        body: 'Starting as a boutique consultation firm, our vision for smart design and elite customer values pushed us to build residential masterworks. Today, AR Creative Homes stands tall as a recognized symbol of real estate quality across NCR.'
      }
    ]
  },
  {
    slug: 'milestones',
    title: 'Milestones',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Milestones',
        subtitle: 'A chronological legacy of success.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
      },
      {
        type: 'features',
        title: 'Moments of Pride',
        items: [
          { title: '2020: Foundation', desc: 'AR Creative Homes brand launched with a vision to build premium high-rise spaces.' },
          { title: '2022: Quick Delivery', desc: 'Successfully handed over our first signature tower, earning customer appreciation.' },
          { title: '2024: Area Expansion', desc: 'Opened grand multi-phase operations across Greater Noida West and high-growth NCR zones.' }
        ]
      }
    ]
  },
  {
    slug: 'awards-and-recognition',
    title: 'Awards & Recognition',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Awards & Recognition',
        subtitle: 'Celebrated benchmarks of premium real estate.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Elite Honors',
        body: 'Our structural works have been celebrated with prestigious real estate design awards for green engineering, layout aesthetics, and customer-first practices in NCR.'
      }
    ]
  },

  // --- WHAT WE DO ---
  // Residential
  {
    slug: 'luxury-apartments',
    title: 'Luxury Apartments',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Luxury Apartments',
        subtitle: 'Grand heights and contemporary designs.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80'
      },
      {
        type: 'image_text',
        title: 'Elevate Your Standards',
        body: 'Featuring beautifully curated double-height ceilings, smart VRV automated cooling systems, private sky deck access, and expansive panoramic views of the city greens.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
        image_align: 'right'
      }
    ]
  },
  {
    slug: 'studio-spaces',
    title: 'Studio Spaces',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Studio Spaces',
        subtitle: 'Smart space layouts for high-speed urban lifestyles.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Modern and Efficient',
        body: 'Combining premium design layouts, upscale kitchen fittings, energy-efficient automation, and highly accessible locations for modern working individuals.'
      }
    ]
  },
  {
    slug: 'investment-plots',
    title: 'Investment Plots',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Investment Plots',
        subtitle: 'Build a customized home legacy.',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Premium Freehold Plots',
        body: 'Secure standard gated plotting in high-yield growth corridors of NCR. Perfectly matched for building luxurious family villas or achieving amazing long-term appreciation.'
      }
    ]
  },
  {
    slug: 'greater-noida-west',
    title: 'Greater Noida West',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Greater Noida West',
        subtitle: 'The epicenter of modern lifestyle infrastructure.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
      },
      {
        type: 'image_text',
        title: 'Premium Connectivity',
        body: 'With dynamic metro developments, high-speed expressways, multi-acre green parks, and modern school zones, this remains NCRs top choice for families.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
        image_align: 'left'
      }
    ]
  },
  {
    slug: 'ncr-projects',
    title: 'NCR Projects',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'NCR Projects',
        subtitle: 'Iconic architectures across major growth corridors.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Exquisite Luxury Footprint',
        body: 'Spanning Noida, Greater Noida, and Gurugram growth zones, our properties define sophisticated modern lifestyles and provide maximum asset values.'
      }
    ]
  },
  // Commercial
  {
    slug: 'business-centres',
    title: 'Business Centres',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Business Centres',
        subtitle: 'Dynamic collaborative corporate hubs.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Intelligent Corporate Workspaces',
        body: 'Outfitted with high-speed fiber lines, fully equipped boardrooms, double-height executive lounges, and ample multi-level parking blocks.'
      }
    ]
  },
  {
    slug: 'retail-spaces',
    title: 'Retail Spaces',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Retail Spaces',
        subtitle: 'Highly visible plazas for elite commercial brands.',
        image: 'https://images.unsplash.com/photo-1567401893930-7bec752b4d89?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Premium Footfall Hubs',
        body: 'Double-height anchor stores, central open-air luxury food courts, secure escalators, and strategic premium main road visibility.'
      }
    ]
  },
  // Services
  {
    slug: 'property-consultation',
    title: 'Property Consultation',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Property Consultation',
        subtitle: 'Certified guidance for premium real estate investments.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Strategic Asset Selection',
        body: 'Our senior real estate advisors perform detailed yield evaluations, micro-market analytics, and structure layout matches to give you the perfect home selection.'
      }
    ]
  },
  {
    slug: 'legal-assistance',
    title: 'Legal Assistance',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Legal Assistance',
        subtitle: '100% stress-free, transparent title ownership.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Worry-Free Paperwork Check',
        body: 'From in-depth land title validations and builder-buyer contract checkups to quick registries, our expert legal team verifies every detail for absolute peace of mind.'
      }
    ]
  },
  {
    slug: 'home-loan-guidance',
    title: 'Home Loan Guidance',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'Home Loan Guidance',
        subtitle: 'Fast bank clearances and competitive rates.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Hassle-Free Approvals',
        body: 'Through our partner banking networks, we manage all paperwork, verify standard eligibility criteria, and help secure rapid home loan approvals at lowest market rates.'
      }
    ]
  },
  {
    slug: 'after-sales-support',
    title: 'After-Sales Support',
    template_type: 'modular',
    content: [
      {
        type: 'hero',
        title: 'After-Sales Support',
        subtitle: 'An ongoing lifetime relationship of trust.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
      },
      {
        type: 'text',
        title: 'Always There For You',
        body: 'From initial design alterations and key handovers to immediate maintenance calls and community building, our after-sales help keeps your life smooth.'
      }
    ]
  }
];

async function seedAllPages() {
  console.log('Starting custom database page seeding...');
  
  for (const page of pagesToSeed) {
    console.log(`Seeding dynamic page: ${page.title} (slug: ${page.slug})`);
    await sql`
      INSERT INTO pages (slug, title, content, template_type)
      VALUES (${page.slug}, ${page.title}, ${sql.json(page.content)}, ${page.template_type})
      ON CONFLICT (slug) DO NOTHING
    `;
  }
  
  console.log('Seeding completed successfully!');
  process.exit(0);
}

seedAllPages().catch((err) => {
  console.error('Seeding crashed:', err);
  process.exit(1);
});

import { allSensors } from '@/data/products';
import Link from 'next/link';

export async function generateStaticParams() {
  return allSensors.map((sensor) => {
    const fullTitle = `${sensor.title.trim()} ${sensor.highlightText.trim()}`.replace(/\s+/g, ' ');
    const slug = fullTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { slug };
  });
}

export default function ProductDetailsPage({ params }: { params: { slug: string } }) {
  const sensor = allSensors.find((s) => {
    const fullTitle = `${s.title.trim()} ${s.highlightText.trim()}`.replace(/\s+/g, ' ');
    const productSlug = fullTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return productSlug === params.slug;
  });

  if (!sensor) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center flex-col gap-6 relative">
         <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] ambient-glow-2 opacity-50"></div>
        </div>
        <h1 className="text-4xl text-white font-headline font-bold relative z-10">Product not found</h1>
        <Link href="/products" className="text-primary hover:text-white transition-colors relative z-10">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface pt-32 pb-24 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] ambient-glow-1 opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] ambient-glow-2 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <Link href="/products" className="inline-flex items-center text-on-surface-variant hover:text-white transition-colors mb-12 font-label text-sm uppercase tracking-widest gap-2 group">
          <span className="material-symbols-outlined transform group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Products
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
          <div className="w-full lg:w-1/2 bg-white rounded-3xl p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
             <img 
               src={`/${sensor.imagePath}`} 
               alt={sensor.title + " " + sensor.highlightText}
               className="w-full h-auto object-contain max-h-[500px] transform group-hover:scale-105 transition-transform duration-700"
             />
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="font-headline text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tighter">
              {sensor.title} <span className="text-primary">{sensor.highlightText}</span>
            </h1>
            <h2 className="font-body text-xl md:text-2xl text-on-surface-variant font-medium mb-10 leading-relaxed">
              {sensor.subtitle}
            </h2>
            
            <div className="flex flex-col gap-4 mb-10">
              {sensor.bannerPoints.map((point: string, i: number) => (
                <div key={i} className="flex items-start gap-4 bg-surface-container py-3 px-5 rounded-2xl border border-white/5">
                  <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">check_circle</span>
                  <p className="font-body text-white/90">{point}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
               <a href={`mailto:${sensor.email}`} className="bg-primary hover:bg-primary-light text-white font-bold py-4 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-2">
                 <span className="material-symbols-outlined">mail</span>
                 Request Access
               </a>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Features */}
          <div className="bg-surface-container rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-colors">
             <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
               <span className="material-symbols-outlined text-primary text-3xl">star</span>
             </div>
             <h3 className="font-headline text-2xl font-bold text-white mb-6">Key Features</h3>
             <ul className="flex flex-col gap-4">
               {sensor.features.map((feature: string, i: number) => (
                 <li key={i} className="flex gap-3 text-on-surface-variant font-body">
                   <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2.5"></span>
                   <span>{feature}</span>
                 </li>
               ))}
             </ul>
          </div>

          {/* Applications */}
          <div className="bg-surface-container rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-colors">
             <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
               <span className="material-symbols-outlined text-primary text-3xl">build</span>
             </div>
             <h3 className="font-headline text-2xl font-bold text-white mb-6">Applications</h3>
             <ul className="flex flex-col gap-4">
               {sensor.applications.map((app: string, i: number) => (
                 <li key={i} className="flex gap-3 text-on-surface-variant font-body">
                   <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2.5"></span>
                   <span>{app}</span>
                 </li>
               ))}
             </ul>
          </div>

          {/* Specifications */}
          <div className="bg-surface-container rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-colors">
             <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
               <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
             </div>
             <h3 className="font-headline text-2xl font-bold text-white mb-6">Specifications</h3>
             <ul className="flex flex-col gap-4">
               {sensor.specifications.map((spec: string, i: number) => (
                 <li key={i} className="flex gap-3 text-on-surface-variant font-body">
                   <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2.5"></span>
                   <span>{spec}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Heart } from 'lucide-react';

interface FooterLink {
  text: string;
  url: string;
}

interface FooterData {
  names: string;
  date: string;
  hashtag?: string;
  links?: FooterLink[];
}

interface FooterProps {
  data: FooterData;
  variant: string;
}

export const FooterClassic: React.FC<FooterProps> = ({ data }) => (
  <footer className="py-16 px-4 bg-neutral-900 text-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-serif mb-4">{data.names}</h2>
      <p className="text-neutral-400 mb-6">{data.date}</p>
      {data.hashtag && (
        <p className="text-lg text-neutral-300 mb-8">{data.hashtag}</p>
      )}
      {data.links && data.links.length > 0 && (
        <div className="flex justify-center gap-8 mb-8">
          {data.links.map((link, idx) => (
            <a key={idx} href={link.url} className="text-neutral-300 hover:text-white transition-colors">
              {link.text}
            </a>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center gap-2 text-neutral-400">
        <span>Made with</span>
        <Heart className="w-4 h-4 fill-current text-red-500" />
        <span>by Dayof</span>
      </div>
    </div>
  </footer>
);

export const FooterMinimal: React.FC<FooterProps> = ({ data }) => (
  <footer className="py-12 px-4 bg-neutral-50 border-t border-neutral-200">
    <div className="max-w-3xl mx-auto text-center">
      <p className="text-sm text-neutral-600 mb-2">{data.names}</p>
      <p className="text-xs text-neutral-500">{data.date}</p>
      {data.hashtag && (
        <p className="text-sm text-neutral-600 mt-4">{data.hashtag}</p>
      )}
    </div>
  </footer>
);

export const FooterElegant: React.FC<FooterProps> = ({ data }) => (
  <footer className="py-20 px-4 bg-gradient-to-b from-white to-neutral-100">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block">
          <h2 className="text-4xl font-serif mb-2">{data.names}</h2>
          <div className="h-px bg-neutral-300 mb-4" />
          <p className="text-neutral-600">{data.date}</p>
        </div>
      </div>
      {data.hashtag && (
        <p className="text-center text-xl text-neutral-700 mb-8">{data.hashtag}</p>
      )}
      {data.links && data.links.length > 0 && (
        <div className="flex justify-center gap-12 mb-12">
          {data.links.map((link, idx) => (
            <a key={idx} href={link.url} className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm uppercase tracking-wider">
              {link.text}
            </a>
          ))}
        </div>
      )}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-neutral-500 text-sm">
          <Heart className="w-3 h-3 fill-current" />
          <span>Powered by Dayof</span>
        </div>
      </div>
    </div>
  </footer>
);

export const FooterSection: React.FC<FooterProps> = ({ variant, data }) => {
  switch (variant) {
    case 'minimal': return <FooterMinimal data={data} variant={variant} />;
    case 'elegant': return <FooterElegant data={data} variant={variant} />;
    default: return <FooterClassic data={data} variant={variant} />;
  }
};

import { SectionType } from './builder';

export interface MockDataGenerator {
  (sectionType: SectionType): Record<string, unknown>;
}

export const mockDataGenerators: Record<SectionType, () => Record<string, unknown>> = {
  hero: () => ({
    names: 'Emma & James',
    date: 'June 15, 2026',
    location: 'Napa Valley, California',
    tagline: 'Join us as we celebrate our love',
    backgroundImage: 'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg',
  }),

  story: () => ({
    title: 'Our Story',
    couples: [
      {
        name: 'Emma',
        story: 'From the first moment I saw James at that coffee shop, I knew there was something special about him.',
        image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
      },
      {
        name: 'James',
        story: 'Emma walked in and everything just clicked. We talked for hours and haven\'t stopped since.',
        image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      },
    ],
  }),

  timeline: () => ({
    title: 'Our Journey',
    events: [
      { date: 'May 2020', title: 'First Met', description: 'At a mutual friend\'s coffee shop gathering' },
      { date: 'August 2020', title: 'First Date', description: 'Dinner under the stars at a rooftop restaurant' },
      { date: 'December 2022', title: 'Moved In Together', description: 'Started our life together in San Francisco' },
      { date: 'March 2024', title: 'The Proposal', description: 'James proposed during a sunset hike in Big Sur' },
      { date: 'June 2026', title: 'Wedding Day', description: 'Celebrating with family and friends in Napa Valley' },
    ],
  }),

  gallery: () => ({
    title: 'Our Memories',
    images: [
      { url: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg', caption: 'First trip together' },
      { url: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg', caption: 'Beach sunset' },
      { url: 'https://images.pexels.com/photos/1024969/pexels-photo-1024969.jpeg', caption: 'Mountain adventure' },
      { url: 'https://images.pexels.com/photos/1488310/pexels-photo-1488310.jpeg', caption: 'City nights' },
      { url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg', caption: 'Proposal day' },
      { url: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg', caption: 'Engagement party' },
    ],
  }),

  location: () => ({
    title: 'Venue',
    venueName: 'Meadowood Napa Valley',
    address: '900 Meadowood Lane, St. Helena, CA 94574',
    description: 'A beautiful estate nestled among the vineyards of Napa Valley',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.1!2d-122.4194!3d37.7749',
    image: 'https://images.pexels.com/photos/2306203/pexels-photo-2306203.jpeg',
  }),

  rsvp: () => ({
    title: 'RSVP',
    deadline: 'May 15, 2026',
    message: 'Please let us know if you can join us by May 15th',
    fields: ['name', 'email', 'guests', 'dietary_restrictions', 'message'],
  }),

  registry: () => ({
    title: 'Registry',
    message: 'Your presence is the greatest gift, but if you wish to honor us with a gift, we\'ve registered at the following stores',
    registries: [
      { name: 'Crate & Barrel', url: '#', icon: 'store' },
      { name: 'Zola', url: '#', icon: 'gift' },
      { name: 'Honeymoon Fund', url: '#', icon: 'plane' },
    ],
  }),

  schedule: () => ({
    title: 'Schedule',
    date: 'June 15, 2026',
    events: [
      { time: '3:00 PM', title: 'Ceremony', location: 'Garden Pavilion', description: 'Join us for the ceremony' },
      { time: '4:30 PM', title: 'Cocktail Hour', location: 'Terrace', description: 'Drinks and hors d\'oeuvres' },
      { time: '6:00 PM', title: 'Reception', location: 'Grand Ballroom', description: 'Dinner, dancing, and celebration' },
      { time: '11:00 PM', title: 'Send Off', location: 'Front Entrance', description: 'Sparkler exit' },
    ],
  }),

  travel: () => ({
    title: 'Travel Information',
    airports: [
      { name: 'San Francisco International (SFO)', distance: '1.5 hours', code: 'SFO' },
      { name: 'Oakland International (OAK)', distance: '1.5 hours', code: 'OAK' },
      { name: 'Sacramento International (SMF)', distance: '1 hour', code: 'SMF' },
    ],
    transportation: 'We recommend renting a car for flexibility in exploring Napa Valley',
  }),

  accommodations: () => ({
    title: 'Where to Stay',
    hotels: [
      {
        name: 'Meadowood Napa Valley',
        address: '900 Meadowood Lane, St. Helena',
        phone: '(707) 963-3646',
        rate: '$650/night',
        note: 'Venue hotel with special rate for wedding guests',
        image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      },
      {
        name: 'Harvest Inn',
        address: '1 Main Street, St. Helena',
        phone: '(707) 963-9463',
        rate: '$350/night',
        note: 'Charming boutique hotel, 5 minutes from venue',
        image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
      },
    ],
  }),

  faq: () => ({
    title: 'Frequently Asked Questions',
    questions: [
      { question: 'What should I wear?', answer: 'Formal attire. The ceremony and reception will be outdoors and indoors.' },
      { question: 'Can I bring a plus one?', answer: 'Please refer to your invitation for the number of guests.' },
      { question: 'Will there be transportation?', answer: 'Shuttle service will be provided from selected hotels.' },
      { question: 'What time should I arrive?', answer: 'Please arrive by 2:45 PM for the 3:00 PM ceremony.' },
      { question: 'Is the wedding kid-friendly?', answer: 'We love your little ones, but this will be an adults-only celebration.' },
    ],
  }),

  footer: () => ({
    names: 'Emma & James',
    date: 'June 15, 2026',
    hashtag: '#EmmaAndJames2026',
    links: [
      { text: 'RSVP', url: '#rsvp' },
      { text: 'Registry', url: '#registry' },
      { text: 'Travel', url: '#travel' },
    ],
  }),
};

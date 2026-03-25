// Automatically list photos named photo1.jpg, photo2.jpg, ..., photoN.jpg
// Adjust 'length' to your photo count (N)
export const PHOTOS = Array.from({ length: 24 }, (_, i) => `photos/photo${i + 1}.jpg`);

// Optional: captions by filename (case-insensitive; keys are matched in lowercase)
export const CAPTIONS = {
  "photo1.jpg": "Montara State Park in the evening (2026)",
  "photo2.jpg": "Fireflies and a waterfall in upstate NY (2025)",
  "photo3.jpg": "Montara State Park (2026)",
  "photo4.jpg": "Fireflies in a field in CT (2025)",
  "photo5.jpg": "Street artist at night in Paris (2015)",
  "photo6.jpg": "Twins on a beach in Santa Barbara, CA (2013)",
  "photo7.jpg": "Northern lights performing in Saariselkä, Finland (2023)",
  "photo7.jpeg": "Northern lights performing in Saariselkä, Finland (2023)",
  "photo8.jpg": "Raphaël in Acadia National Park, ME (2024)",
  "photo9.jpg": "Pacifica, CA (2026)",
  "photo10.jpg": "Sophie, 2021",
  "photo11.jpg": "Sleeping in the grass, 2012",
  "photo12.jpg": "Wengen, Switzerland (2012)",
  "photo13.jpg": "Dinosaur National Monument, CO (2025)",
  "photo13.jpeg": "Dinosaur National Monument, CO (2025)",
  "photo14.jpg": "Me by my father (2023)",
  "photo15.jpg": "A fountain at night in Rome (2013)",
  "photo16.jpg": "Nostalgia (2015)",
  "photo16.JPG": "Nostalgia (2015)",
  "photo17.jpg": "Winter in PA (2014)",
  "photo17.JPG": "Winter in PA (2014)",
  "photo18.jpg": "Twins, 2009",
  "photo18.JPG": "Twins, 2009",
  "photo19.jpg": "Philadelphia (2020)",
  "photo19.JPG": "Philadelphia (2020)",
  "photo20.jpg": "A smile bigger than the Alps (2011)",
  "photo20.JPG": "A smile bigger than the Alps (2011)",
  "photo21.jpg": "Dinosaur Monument, CO (2025)",
  "photo21.JPG": "Dinosaur Monument, CO (2025)",
  "photo22.jpg": "Girly & Auggie (2011)",
  "photo22.JPG": "Girly & Auggie (2011)",
  "photo23.jpg": "What did you just say? (2014)",
  "photo23.JPG": "What did you just say? (2014)",
  "photo24.jpg": "He got pink ice cream (2012)",
  "photo24.JPG": "He got pink ice cream (2012)",
  // Add more like:
  // "photo2.jpg": "Some caption here",
  // "photo10.jpg": "Another caption",
};


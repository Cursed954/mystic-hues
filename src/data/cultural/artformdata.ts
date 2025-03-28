// Art forms detailed information with descriptions, history and images
import { stateData } from '../stateData';

// Map of state IDs to specific art form details
export type ArtFormDetails = {
  id: string;
  name: string;
  description: string;
  history: {
    started: string;
    goldenPeriod: string;
    currentStatus: string;
  };
  image: string;
  additionalImages: string[];
};

// Mapping art forms to specific information
export const artFormDetailsMap: Record<string, ArtFormDetails> = {
  "kathputli": {
    id: "kathputli",
    name: "Kathputli",
    description: "Kathputli (puppetry) is a traditional folk art from Rajasthan, where colorful wooden puppets are manipulated with strings to narrate folk tales, myths, and social stories.",
    history: {
      started: "Ancient times",
      goldenPeriod: "16th-19th century during Rajput rule",
      currentStatus: "Facing challenges but preserved through cultural troupes"
    },
    image: "https://5.imimg.com/data5/MV/FG/XE/SELLER-5333512/rajasthani-puppet-kathputli.jpg",
    additionalImages: [
      "https://s7ap1.scene7.com/is/image/incredibleindia/kathputli-ka-khel-jaipur-rajasthan-1-craft-hero?qlt=82&ts=1726641305694",
      "https://thumbs.dreamstime.com/b/rajasthani-puppets-sale-3956219.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJLrNAoUejJj-JNRXOUjm54BQz0x39XrgXmkvRCnt423i_8sh5vLo7dNDoPrVWCde33vI&usqp=CAU"
    ]
  },
  "ghoomar": {
    id: "ghoomar",
    name: "Ghoomar",
    description: "Ghoomar is a traditional folk dance from Rajasthan performed by women, characterized by swirling movements and vibrant costumes.",
    history: {
      started: "Medieval period",
      goldenPeriod: "16th-18th century during Rajput rule",
      currentStatus: "Popular at weddings and cultural festivals"
    },
    image: "https://www.unnatisilks.com/cdn/shop/articles/c58573035b584798c80b5e7f2cfdeb89-scaled.jpg?v=1655289712&width=2560",
    additionalImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Ghoomar_dancers_%28Rajasthan%2C_India%2C_2023%29.jpg/473px-Ghoomar_dancers_%28Rajasthan%2C_India%2C_2023%29.jpg",
      "https://cdn.shopify.com/s/files/1/0562/8792/0217/t/7/assets/27464776076_6152cf2606_z.jpg?v=1655289702",
      "https://i0.wp.com/www.sayeridiary.com/wp-content/uploads/2018/04/Original-Rajasthani-Ghoomar-Dance-Song-660x330.jpg?fit=660%2C330&ssl=1"
    ]
  },
  "kalbeliya": {
    id: "kalbeliya",
    name: "Kalbeliya",
    description: "Kalbeliya is a sensuous folk dance from Rajasthan performed by the Kalbeliya community, known for its snake-like movements and vibrant attire.",
    history: {
      started: "Medieval period",
      goldenPeriod: "17th-19th century",
      currentStatus: "Recognized as a UNESCO Intangible Cultural Heritage"
    },
    image: "https://blackhattalent.com/wp-content/uploads/2024/10/Kalbeliya.jpeg",
    additionalImages: [
      "https://www.swantour.com/blogs/wp-content/uploads/2019/02/Kalbelia-Dance-Festival-Rajasthan.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_BjCYnKbW-VqGa8jlj2vU5-FNQwUL-rIsiISuWehiyEwsTjzYfNBSIT3JhJD_G6EZUU&usqp=CAU",
      "https://i.pinimg.com/736x/85/a0/69/85a069edcb956f85470429cf8d01d6f7.jpg"
    ]
  },
  "kathakali": {
    id: "kathakali",
    name: "Kathakali",
    description: "Kathakali is a classical dance form from Kerala, featuring elaborate costumes, makeup, and stylized gestures to portray stories from Hindu epics. Performers train rigorously to master the precise facial expressions and body movements essential to this art form.",
    history: {
      started: "17th century",
      goldenPeriod: "18th to 19th century",
      currentStatus: "Actively preserved through dedicated schools and cultural institutions"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Kathakali_-Play_with_Kaurava.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQC2F5oRbr4pdqsRlZRGA38Y5JsmiepDoqKVIQM7nfRYjpG10pxLaa0JnebAF1jaPSWw&usqp=CAU",
      "https://mapacademy.io/wp-content/uploads/2022/04/kathakali-1m.jpg",
      "https://mediaim.expedia.com/localexpert/213788/532e75b6-04d7-4b01-9a0c-0a41fcd3094c.jpg"
    ]
  },
  "mohiniyattam": {
    id: "mohiniyattam",
    name: "Mohiniyattam",
    description: "Mohiniyattam is a classical dance form from Kerala, characterized by graceful movements and expressions, often depicting themes of love and devotion.",
    history: {
      started: "16th century",
      goldenPeriod: "18th-19th century",
      currentStatus: "Revived and promoted through cultural programs"
    },
    image: "https://iccr.gov.in/sites/default/files/Ms.Anita%20peter%20%26%20her%20group%2C%20Mohiniyattam%20Dance%20from%20Hyderabad.jpeg",
    additionalImages: [
      "https://www.natyasutraonline.com/uploads/category/share_img/mohiniyattam.jpg",
      "https://www.civilsdaily.com/wp-content/uploads/2024/06/mohini.jpg",
      "https://www.insightsonindia.com/wp-content/uploads/2021/09/Mohiniattam.jpg"
    ]
  },
  "kalaripayattu": {
    id: "kalaripayattu",
    name: "Kalaripayattu",
    description: "Kalaripayattu is an ancient martial art from Kerala, combining combat techniques, physical exercises, and healing practices.",
    history: {
      started: "3rd century BCE",
      goldenPeriod: "12th-16th century",
      currentStatus: "Thriving as a martial art and fitness practice"
    },
    image: "https://images.mid-day.com/images/images/2014/jun/05kalaripayattu.jpg",
    additionalImages: [
      "https://storage.karmagroup.com/assets/karmagroup.com/blog/2018/03/KALARIPAYATTU-940x671.jpg",
      "https://www.keralatourism.org/images/kalari/static-banner/large/Vadivu_-12022020151336.jpg",
      "https://www.rishikulyogshala.org/assets/images/kalaripayattu/kalaripayattu-img1.jpg"
    ]
  },
  "bharatanatyam": {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    description: "Bharatanatyam is one of India's oldest classical dance forms, originating from Tamil Nadu, featuring precise footwork and hand gestures.",
    history: {
      started: "2000 BCE",
      goldenPeriod: "Chola Dynasty (9th-13th century)",
      currentStatus: "Widely practiced across India and internationally"
    },
    image: "https://karnatakatourism.org/wp-content/uploads/2020/05/Dane.jpg",
    additionalImages: [
      "https://natyalaya.org/wp-content/uploads/2019/02/barathanatyam-dance-classes-in-bangalore-1024x535.jpg",
      "https://karnatakatourism.org/wp-content/uploads/2020/05/Dane.jpg",
      "https://images.squarespace-cdn.com/content/v1/60c7105b70fe8d18bb55fa5c/1624000918568-56FS9SI40BU7HCROUYO0/13123030_993619280706392_1702075096596948457_o.jpg"
    ]
  },
  "carnatic-music": {
    id: "carnatic-music",
    name: "Carnatic Music",
    description: "Carnatic music is a classical music tradition from South India, focusing on vocal and instrumental performances with intricate ragas and talas.",
    history: {
      started: "5th century CE",
      goldenPeriod: "16th-18th century",
      currentStatus: "Thriving in concerts and educational institutions"
    },
    image: "https://lh3.googleusercontent.com/eQnHNBkq2tFOAqbJASMX_GFeVCutcBsv8ZOHu1JfU6svp_CCBZqEhb7UKPSaHFkFVptumYxPTDeybDOzU_Een7btHg=w1200-h630-pp",
    additionalImages: [
      "https://fl-i.thgim.com/public/incoming/vn7gxw/article67119307.ece/alternates/LANDSCAPE_1200/1693_10-12-2018_11-29-47_1_RANJANI_GAYATRI_CARNATIC_VOCAL.JPG",
      "https://media.licdn.com/dms/image/v2/C5112AQESeCzBXl8Y7A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1572354781329?e=2147483647&v=beta&t=58Nls7E8hHHKHUmyiWaFKEWTgJngNcwL82WaQgpLkDA",
      "https://images.livemint.com/img/2024/01/19/original/carnatic_1705643562430.jpg"
    ]
  },
  "tanjore-paintings": {
    id: "tanjore-paintings",
    name: "Tanjore Paintings",
    description: "Tanjore paintings are traditional South Indian artworks known for rich colors and gold foil detailing, often depicting Hindu deities.",
    history: {
      started: "16th century",
      goldenPeriod: "17th-19th century",
      currentStatus: "Continues to be popular among collectors and religious patrons"
    },
    image: "https://img1.wsimg.com/isteam/ip/bd95d888-15fd-4e22-9514-3b3e7856faa7/d1fc0d4d-12eb-4019-a7aa-f00566d84891.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6-xyju65m1ey0EMV1KPn2m46q8mlIZUaz3Q&s",
      "https://4.imimg.com/data4/KY/YL/MY-3723800/tanjore-paintings.jpg",
      "https://c9admin.cottage9.com/uploads/1945/tanjore-paintings_1.jpg"
    ]
  },
  "nati-dance": {
    id: "nati-dance",
    name: "Nati Dance",
    description: "Nati is a traditional folk dance from Himachal Pradesh, performed during festivals and celebrations, characterized by rhythmic footwork and vibrant costumes.",
    history: {
      started: "Ancient times",
      goldenPeriod: "Medieval period",
      currentStatus: "Preserved through local festivals and cultural programs"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Kinnauri_Nati_dance.jpg",
    additionalImages: [
      "https://64.media.tumblr.com/9d1e08fa4412961b000e0eb96219b498/9b69d77883e821ae-2b/s1280x1920/7ec773d8d848b9d9a753e50af7c504a9f63f5c40.jpg",
      "https://64.media.tumblr.com/e8c0250f9677e6f85cd1bf7b8b70131f/9b69d77883e821ae-c9/s1280x1920/063171053d2b926d236f8364c3e7ab1561aa2cd4.jpg",
      "https://thumbs.dreamstime.com/z/kullu-himachal-pradesh-india-st-july-group-himachali-women-dancing-nati-dance-traditional-folk-dance-upper-himachal-259961182.jpg"
    ]
  },
  "thangka-paintings": {
    id: "thangka-paintings",
    name: "Thangka Paintings",
    description: "Thangka paintings are traditional Tibetan Buddhist scroll paintings, depicting deities, mandalas, and religious narratives.",
    history: {
      started: "7th century CE",
      goldenPeriod: "11th-15th century",
      currentStatus: "Preserved by monasteries and artisans"
    },
    image: "https://v.greattibettour.com/photos/201904/tibetan-thangka--44339.jpg",
    additionalImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdWBzsM75fK9MK-DFkdM5a5v_S0y-T5SnWg&s",
      "https://i1.himalayas.life/c/u/f67894297b6134a6b759b3a9ec15b6cb/2018/04/26054954/26-e1522558104714.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVX92htoKwCc4tDToVkM1jB4uN3Fym2-8zAA&s"
    ]
  },
  "chamba-rumal": {
    id: "chamba-rumal",
    name: "Chamba Rumal",
    description: "Chamba Rumal is a traditional embroidery art from Himachal Pradesh, featuring intricate hand-stitched designs on handkerchiefs and textiles.",
    history: {
      started: "17th century",
      goldenPeriod: "18th-19th century",
      currentStatus: "Preserved through cultural initiatives and museums"
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Chamba_Rumal_with_the_Mahavidyas_LACMA_M.80.4.jpg",
    additionalImages: [
      "https://amounee.com/cdn/shop/products/16571829871953209506_fa0d1252-0065-4d39-862b-d3ed3f85326c.jpg?v=1700035335",
      "https://indiacurrents.com/wp-content/uploads/2021/05/Chamba-Rumal-art-work-1.jpg",
      "https://www.bridgebharat.com/cdn/shop/files/BBP0050SCR00008_1_533x.jpg?v=1707767544"
    ]
  },
  "fado-music": {
    id: "fado-music",
    name: "Fado Music",
    description: "Fado is a soulful music genre from Goa, influenced by Portuguese traditions, expressing themes of longing and nostalgia.",
    history: {
      started: "16th century",
      goldenPeriod: "18th-19th century",
      currentStatus: "Revived through cultural programs and festivals"
    },
    image: "https://i.ytimg.com/vi/sFjeMZomano/maxresdefault.jpg",
    additionalImages: [
      "https://lisbongo.com/wp-content/uploads/2020/04/Fado-Music-in-Lisbon-scaled.jpg",
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/15/55/58/2a.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfkxKBlFqUttS-obx47fBtysj9tSqS2xuuWE67cbznchHn97aIwlYzicSp884zYcHITqI&usqp=CAU"
    ]
  },
  "goan-carnival": {
    id: "goan-carnival",
    name: "Goan Carnival",
    description: "The Goan Carnival is a vibrant festival celebrated in Goa, featuring parades, music, dance, and colorful floats, reflecting Portuguese influence.",
    history: {
      started: "18th century",
      goldenPeriod: "19th-20th century",
      currentStatus: "A major tourist attraction and cultural event"
    },
    image: "https://images.deccanherald.com/deccanherald%2F2025-02-18%2Fexz5zstu%2Fgoa_20carnival_20parade_1582412402.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&q=70&w=400&dpr=2",
    additionalImages: [
      "https://static.toiimg.com/photo/89864714.cms",
      "https://i0.wp.com/www.easeindiatrip.com/blog/wp-content/uploads/2025/02/Goa-Goa-Carnival-festival.jpg?fit=1024%2C630&ssl=1",
      "https://traveltradejournal.com/wp-content/uploads/2023/02/Goa-Carnival.jpg"
    ]
  },
  "traditional-pottery": {
    id: "traditional-pottery",
    name: "Traditional Pottery",
    description: "Traditional pottery is an ancient craft practiced across India, creating functional and decorative items using clay.",
    history: {
      started: "Indus Valley Civilization (3000 BCE)",
      goldenPeriod: "Medieval period",
      currentStatus: "Still widely practiced and appreciated"
    },
    image: "https://originalhandicraft.org/wp-content/uploads/IMG_1683.jpg",
    additionalImages: [
      "https://decodemalayalam.com/wp-content/uploads/2024/07/3-4-1024x576.jpg",
      "https://poothali.com/wp-content/uploads/2023/08/Traditional-Pottery-in-Erikkulam.jpg",
      "https://images.indianexpress.com/2019/11/pottery759.jpeg"
    ]
  }
};

// Default art form details when specific information is not available
export const defaultArtFormDetails: ArtFormDetails = {
  id: "default",
  name: "Traditional Art Form",
  description: "This traditional art form represents the rich cultural heritage of its region.",
  history: {
    started: "Ancient times",
    goldenPeriod: "17th to 19th century",
    currentStatus: "Practiced by dedicated artists and being preserved through cultural programs"
  },
  image: "https://images.unsplash.com/photo-1576487236230-eaa4afe68192?q=80&w=1170",
  additionalImages: [
    "https://images.unsplash.com/photo-1594026112334-d8040bd05749?q=80&w=1170",
    "https://images.unsplash.com/photo-1540122995631-7c74c46c0b8f?q=80&w=1170",
    "https://images.unsplash.com/photo-1584806749948-697891c67821?q=80&w=1170"
  ]
};

// Get details for a specific art form, falling back to default if not found
export const getArtFormDetails = (artFormName: string): ArtFormDetails => {
  const key = artFormName.toLowerCase().replace(/\s+/g, '-');
  return artFormDetailsMap[key] || {
    ...defaultArtFormDetails,
    id: key,
    name: artFormName
  };
};
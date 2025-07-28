import { 
  HomePage, 
  SchoolInfo, 
  TeamMember, 
  AcademicProgram, 
  IslamicLife, 
  NewsEvent, 
  Admissions, 
  DonationPage, 
  ContactDetails,
  Product,
  Expansion
} from '../types';

export const mockHomePage: HomePage = {
  _id: 'home-page',
  title: {
    en: 'Budda Islamic Junior School',
    ar: 'مدرسة بودا الإسلامية الابتدائية',
    fr: 'École Primaire Islamique Budda',
    lg: 'Essomero lya Budda Islamic Junior'
  },
  heroTitle: {
    en: 'Restoring Hope, Building Futures.',
    ar: 'استعادة الأمل، بناء المستقبل.',
    fr: 'Restaurer l\'espoir, construire l\'avenir.',
    lg: 'Okuzzaamu essuubi, okuzimba ebiseera eby\'omu maaso.'
  },
  heroSubtitle: {
    en: 'Join the mission to rebuild Budda Islamic Junior School and empower a generation through knowledge and faith.',
    ar: 'انضم إلى مهمة إعادة بناء مدرسة بودا الإسلامية الابتدائية وتمكين جيل من خلال المعرفة والإيمان.',
    fr: 'Rejoignez la mission de reconstruction de l\'École Primaire Islamique Budda et d\'autonomisation d\'une génération par la connaissance et la foi.',
    lg: 'Weegatte ku mulimu gw\'okuzzaawo Essomero lya Budda Islamic Junior n\'okuwa amaanyi omuzadde okuyita mu magezi n\'okukkiriza.'
  },
  missionTitle: {
    en: 'Our Mission',
    ar: 'مهمتنا',
    fr: 'Notre Mission',
    lg: 'Omugaso Gwaffe'
  },
  missionDescription: {
    en: 'To provide quality Islamic education that nurtures both academic excellence and spiritual growth, preparing students to become responsible global citizens.',
    ar: 'تقديم تعليم إسلامي عالي الجودة يغذي التميز الأكاديمي والنمو الروحي، وإعداد الطلاب ليصبحوا مواطنين عالميين مسؤولين.',
    fr: 'Fournir une éducation islamique de qualité qui nourrit à la fois l\'excellence académique et la croissance spirituelle, préparant les étudiants à devenir des citoyens mondiaux responsables.',
    lg: 'Okuwa ebyenjigiriza bya kisilamu ebisinga obulungi ebikuza obukugu mu masomo n\'okukula mu mwoyo, okutegeka abayizi okufuuka bannansi b\'ensi yonna abeesigwa.'
  },
  principlesTitle: {
    en: 'Our Guiding Principles',
    ar: 'مبادئنا التوجيهية',
    fr: 'Nos Principes Directeurs',
    lg: 'Empisa Zaffe Ezikulembera'
  },
  principles: [
    {
      title: {
        en: 'Academic Excellence',
        ar: 'التميز الأكاديمي',
        fr: 'Excellence Académique',
        lg: 'Obukugu mu Masomo'
      },
      description: {
        en: 'Striving for the highest standards in education and learning.',
        ar: 'السعي لتحقيق أعلى المعايير في التعليم والتعلم.',
        fr: 'Viser les plus hauts standards en éducation et apprentissage.',
        lg: 'Okufuba okutuuka ku mutindo ogw\'amaanyi mu byenjigiriza n\'okuyiga.'
      },
      icon: 'academic-cap'
    },
    {
      title: {
        en: 'Islamic Values',
        ar: 'القيم الإسلامية',
        fr: 'Valeurs Islamiques',
        lg: 'Empisa za Kisilamu'
      },
      description: {
        en: 'Integrating Islamic teachings and values into all aspects of education.',
        ar: 'دمج التعاليم والقيم الإسلامية في جميع جوانب التعليم.',
        fr: 'Intégrer les enseignements et valeurs islamiques dans tous les aspects de l\'éducation.',
        lg: 'Okugatta ebyenjigiriza n\'empisa za kisilamu mu bitundu byonna eby\'ebyenjigiriza.'
      },
      icon: 'heart'
    },
    {
      title: {
        en: 'Community Service',
        ar: 'خدمة المجتمع',
        fr: 'Service Communautaire',
        lg: 'Okuweereza Ekitundu'
      },
      description: {
        en: 'Encouraging students to give back to their communities.',
        ar: 'تشجيع الطلاب على رد الجميل لمجتمعاتهم.',
        fr: 'Encourager les étudiants à redonner à leurs communautés.',
        lg: 'Okukubiriza abayizi okuddiza ekitundu kyabwe.'
      },
      icon: 'users'
    }
  ],
  callToActionTitle: {
    en: 'Support Our Mission',
    ar: 'ادعم مهمتنا',
    fr: 'Soutenez Notre Mission',
    lg: 'Weereze Omugaso Gwaffe'
  },
  callToActionDescription: {
    en: 'Your support helps us provide quality education and build a brighter future for our students.',
    ar: 'دعمكم يساعدنا في تقديم تعليم عالي الجودة وبناء مستقبل أكثر إشراقاً لطلابنا.',
    fr: 'Votre soutien nous aide à fournir une éducation de qualité et à construire un avenir plus brillant pour nos étudiants.',
    lg: 'Obuyambi bwammwe butuyamba okuwa ebyenjigiriza ebisinga obulungi n\'okuzimba ebiseera eby\'omu maaso ebirungi eri abayizi baffe.'
  }
};

export const mockSchoolInfo: SchoolInfo = {
  _id: 'school-info',
  name: {
    en: 'Budda Islamic Junior School',
    ar: 'مدرسة بودا الإسلامية الابتدائية',
    fr: 'École Primaire Islamique Budda',
    lg: 'Essomero lya Budda Islamic Junior'
  },
  mission: {
    en: 'To provide quality Islamic education that nurtures both academic excellence and spiritual growth.',
    ar: 'تقديم تعليم إسلامي عالي الجودة يغذي التميز الأكاديمي والنمو الروحي.',
    fr: 'Fournir une éducation islamique de qualité qui nourrit l\'excellence académique et la croissance spirituelle.',
    lg: 'Okuwa ebyenjigiriza bya kisilamu ebisinga obulungi ebikuza obukugu mu masomo n\'okukula mu mwoyo.'
  },
  vision: {
    en: 'To be a leading Islamic educational institution that produces well-rounded, God-fearing, and academically excellent students.',
    ar: 'أن نكون مؤسسة تعليمية إسلامية رائدة تنتج طلاباً متكاملين وأتقياء ومتميزين أكاديمياً.',
    fr: 'Être une institution éducative islamique de premier plan qui produit des étudiants bien équilibrés, craignant Dieu et excellents académiquement.',
    lg: 'Okuba ekitongole ky\'ebyenjigiriza ekya kisilamu ekikulembera ekizaala abayizi abalina obukugu obwetooloovu, abatya Katonda era abasinga obulungi mu masomo.'
  },
  story: {
    en: 'Founded with the vision of providing quality Islamic education, Budda Islamic Junior School has been serving the community for years, combining academic excellence with Islamic values.',
    ar: 'تأسست برؤية تقديم تعليم إسلامي عالي الجودة، وقد خدمت مدرسة بودا الإسلامية الابتدائية المجتمع لسنوات، مدمجة التميز الأكاديمي مع القيم الإسلامية.',
    fr: 'Fondée avec la vision de fournir une éducation islamique de qualité, l\'École Primaire Islamique Budda sert la communauté depuis des années, combinant l\'excellence académique avec les valeurs islamiques.',
    lg: 'Essomero lya Budda Islamic Junior lyatandikibwa n\'ekiruubirirwa eky\'okuwa ebyenjigiriza bya kisilamu ebisinga obulungi, era libadde liweereza ekitundu okumala emyaka, nga ligatta obukugu mu masomo n\'empisa za kisilamu.'
  },
  address: {
    en: 'Budda, Wakiso District, Uganda',
    ar: 'بودا، مقاطعة واكيسو، أوغندا',
    fr: 'Budda, District de Wakiso, Ouganda',
    lg: 'Budda, Disitulikiti ya Wakiso, Uganda'
  },
  phone: '+256 700 123 456',
  email: 'info@buddaislamic.ac.ug'
};

export const mockTeamMembers: TeamMember[] = [
  {
    _id: 'director',
    name: {
      en: 'Sheikh Ahmed Hassan',
      ar: 'الشيخ أحمد حسن',
      fr: 'Sheikh Ahmed Hassan',
      lg: 'Sheikh Ahmed Hassan'
    },
    position: {
      en: 'School Director',
      ar: 'مدير المدرسة',
      fr: 'Directeur de l\'École',
      lg: 'Omukulembeze w\'Essomero'
    },
    bio: {
      en: 'Sheikh Ahmed Hassan brings over 15 years of experience in Islamic education and school administration.',
      ar: 'يجلب الشيخ أحمد حسن أكثر من 15 عاماً من الخبرة في التعليم الإسلامي وإدارة المدارس.',
      fr: 'Sheikh Ahmed Hassan apporte plus de 15 ans d\'expérience en éducation islamique et administration scolaire.',
      lg: 'Sheikh Ahmed Hassan aleese obumanyirivu obw\'emyaka egisukka 15 mu byenjigiriza bya kisilamu n\'okukulembera amasomero.'
    },
    image: '/images/director.jpg',
    order: 1
  },
  {
    _id: 'headteacher',
    name: {
      en: 'Mrs. Fatima Nakato',
      ar: 'السيدة فاطمة ناكاتو',
      fr: 'Mme Fatima Nakato',
      lg: 'Nnyabo Fatima Nakato'
    },
    position: {
      en: 'Head Teacher',
      ar: 'المعلمة الرئيسية',
      fr: 'Directrice Pédagogique',
      lg: 'Omukulembeze w\'Abasomesa'
    },
    bio: {
      en: 'Mrs. Fatima Nakato is a dedicated educator with a passion for nurturing young minds and fostering academic excellence.',
      ar: 'السيدة فاطمة ناكاتو مربية مخلصة لديها شغف لرعاية العقول الشابة وتعزيز التميز الأكاديمي.',
      fr: 'Mme Fatima Nakato est une éducatrice dévouée avec une passion pour nourrir les jeunes esprits et favoriser l\'excellence académique.',
      lg: 'Nnyabo Fatima Nakato musomesa omwegendereza alina okwagala okukuza emmeeme z\'abato n\'okutumbula obukugu mu masomo.'
    },
    image: '/images/headteacher.jpg',
    order: 2
  }
];

export const mockAcademicPrograms: AcademicProgram[] = [
  {
    _id: 'primary-program',
    name: {
      en: 'Primary Education Program',
      ar: 'برنامج التعليم الابتدائي',
      fr: 'Programme d\'Éducation Primaire',
      lg: 'Pulogulaamu y\'Ebyenjigiriza bya Pulayimale'
    },
    description: {
      en: 'Comprehensive primary education combining national curriculum with Islamic studies.',
      ar: 'تعليم ابتدائي شامل يجمع بين المنهج الوطني والدراسات الإسلامية.',
      fr: 'Éducation primaire complète combinant le curriculum national avec les études islamiques.',
      lg: 'Ebyenjigiriza bya pulayimale ebitonotono ebigatta entegeka y\'eggwanga n\'ebyenjigiriza bya kisilamu.'
    },
    ageRange: {
      en: '6-13 years',
      ar: '6-13 سنة',
      fr: '6-13 ans',
      lg: 'Emyaka 6-13'
    },
    subjects: [
      'Mathematics', 'English', 'Science', 'Social Studies', 
      'Islamic Studies', 'Arabic', 'Luganda', 'Physical Education'
    ],
    fees: {
      tuition: 450000,
      registration: 50000,
      uniform: 80000,
      books: 120000
    }
  }
];

export const mockIslamicLife: IslamicLife = {
  _id: 'islamic-life',
  title: {
    en: 'Islamic Life at Our School',
    ar: 'الحياة الإسلامية في مدرستنا',
    fr: 'Vie Islamique à Notre École',
    lg: 'Obulamu bwa Kisilamu mu Ssomero Lyaffe'
  },
  description: {
    en: 'We integrate Islamic values and practices into daily school life, creating an environment where students can grow spiritually while excelling academically.',
    ar: 'ندمج القيم والممارسات الإسلامية في الحياة المدرسية اليومية، مما يخلق بيئة يمكن للطلاب فيها النمو روحياً بينما يتفوقون أكاديمياً.',
    fr: 'Nous intégrons les valeurs et pratiques islamiques dans la vie scolaire quotidienne, créant un environnement où les étudiants peuvent grandir spirituellement tout en excellant académiquement.',
    lg: 'Tugatta empisa n\'enkola za kisilamu mu bulamu bwa buli lunaku obw\'essomero, nga tukola embeera abayizi mwe bayinza okukula mu mwoyo nga bwe basinga obulungi mu masomo.'
  },
  practices: [
    {
      name: {
        en: 'Daily Prayers',
        ar: 'الصلوات اليومية',
        fr: 'Prières Quotidiennes',
        lg: 'Okusaba kwa Buli Lunaku'
      },
      description: {
        en: 'Students participate in congregational prayers during school hours.',
        ar: 'يشارك الطلاب في الصلوات الجماعية خلال ساعات الدراسة.',
        fr: 'Les étudiants participent aux prières en congrégation pendant les heures d\'école.',
        lg: 'Abayizi beetaba mu kusaba okw\'ekibiina mu saawa z\'essomero.'
      },
      time: {
        en: 'Dhuhr and Asr prayers',
        ar: 'صلاة الظهر والعصر',
        fr: 'Prières de Dhuhr et Asr',
        lg: 'Okusaba kwa Dhuhr ne Asr'
      }
    }
  ]
};

export const mockNewsAndEvents: NewsEvent[] = [
  {
    _id: 'news-1',
    title: {
      en: 'New Academic Year Begins',
      ar: 'بداية العام الدراسي الجديد',
      fr: 'Nouvelle Année Académique Commence',
      lg: 'Omwaka Ogupya gw\'Ebyenjigiriza Gutandise'
    },
    description: {
      en: 'We welcome all students back for another exciting year of learning and growth.',
      ar: 'نرحب بجميع الطلاب للعودة لعام آخر مثير من التعلم والنمو.',
      fr: 'Nous accueillons tous les étudiants pour une autre année passionnante d\'apprentissage et de croissance.',
      lg: 'Tuyaniriza abayizi bonna okudda ku mwaka omulala ogw\'amaanyi ogw\'okuyiga n\'okukula.'
    },
    content: {
      en: 'The new academic year has begun with great enthusiasm...',
      ar: 'بدأ العام الدراسي الجديد بحماس كبير...',
      fr: 'La nouvelle année académique a commencé avec un grand enthousiasme...',
      lg: 'Omwaka ogupya gw\'ebyenjigiriza gutandise n\'amaanyi amangi...'
    },
    date: '2024-02-01',
    category: 'news'
  }
];

export const mockAdmissions: Admissions = {
  _id: 'admissions',
  title: {
    en: 'Admissions Information',
    ar: 'معلومات القبول',
    fr: 'Informations d\'Admission',
    lg: 'Amakuru g\'Okuyingizibwa'
  },
  description: {
    en: 'Join our school community and give your child the best Islamic education.',
    ar: 'انضم إلى مجتمع مدرستنا وامنح طفلك أفضل تعليم إسلامي.',
    fr: 'Rejoignez notre communauté scolaire et donnez à votre enfant la meilleure éducation islamique.',
    lg: 'Weegatte ku kitundu ky\'essomero lyaffe owe omwana wo ebyenjigiriza bya kisilamu ebisinga obulungi.'
  },
  requirements: [
    'Birth certificate',
    'Passport photos',
    'Previous school reports',
    'Medical certificate'
  ],
  process: [
    {
      step: 1,
      title: {
        en: 'Application Form',
        ar: 'استمارة التقديم',
        fr: 'Formulaire de Candidature',
        lg: 'Foomu y\'Okusaba'
      },
      description: {
        en: 'Complete and submit the application form with required documents.',
        ar: 'أكمل وقدم استمارة التقديم مع الوثائق المطلوبة.',
        fr: 'Complétez et soumettez le formulaire de candidature avec les documents requis.',
        lg: 'Jjuza era waayo foomu y\'okusaba n\'ebiwandiiko ebyetaagisa.'
      }
    }
  ],
  documents: [
    'Birth certificate',
    'Passport photos',
    'Previous school reports',
    'Medical certificate'
  ]
};

export const mockDonationPage: DonationPage = {
  _id: 'donation-page',
  title: {
    en: 'Support Our Mission',
    ar: 'ادعم مهمتنا',
    fr: 'Soutenez Notre Mission',
    lg: 'Weereze Omugaso Gwaffe'
  },
  appealMessage: {
    en: 'Your generous donations help us provide quality Islamic education and maintain our facilities. Every contribution makes a difference in the lives of our students.',
    ar: 'تبرعاتكم السخية تساعدنا في تقديم تعليم إسلامي عالي الجودة والحفاظ على مرافقنا. كل مساهمة تحدث فرقاً في حياة طلابنا.',
    fr: 'Vos généreux dons nous aident à fournir une éducation islamique de qualité et à maintenir nos installations. Chaque contribution fait une différence dans la vie de nos étudiants.',
    lg: 'Ebirabo byammwe eby\'obugabi bituyamba okuwa ebyenjigiriza bya kisilamu ebisinga obulungi n\'okulabirira ebizimbe byaffe. Buli kye muwaayo kikola enjawulo mu bulamu bw\'abayizi baffe.'
  },
  paymentInstructions: {
    en: 'You can support us through various payment methods listed below. All donations are greatly appreciated.',
    ar: 'يمكنكم دعمنا من خلال طرق الدفع المختلفة المدرجة أدناه. جميع التبرعات موضع تقدير كبير.',
    fr: 'Vous pouvez nous soutenir par diverses méthodes de paiement listées ci-dessous. Tous les dons sont grandement appréciés.',
    lg: 'Musobola okutuweereza okuyita mu ngeri ez\'enjawulo ez\'okusasula eziwandiikiddwa wammanga. Ebirabo byonna bisiimibwa nnyo.'
  },
  bankDetails: [
    {
      bankName: 'Absa Bank Uganda',
      accountName: 'Budda Islamic Junior School',
      accountNumber: '6008567890',
      swiftCode: 'BARCUGKX',
      branch: 'Kampala Road'
    },
    {
      bankName: 'Stanbic Bank Uganda',
      accountName: 'Budda Islamic Junior School',
      accountNumber: '9030012345678',
      swiftCode: 'SBICUGKX',
      branch: 'Kampala'
    }
  ],
  mobileMoneyNumbers: [
    {
      provider: 'MTN Mobile Money',
      number: '+256 700 123 456',
      name: 'Budda Islamic School'
    },
    {
      provider: 'Airtel Money',
      number: '+256 750 123 456',
      name: 'Budda Islamic School'
    }
  ],
  materialDonations: [
    'Books and stationery',
    'School uniforms',
    'Sports equipment',
    'Computer equipment',
    'Furniture'
  ]
};

export const mockContactDetails: ContactDetails = {
  _id: 'contact-details',
  address: {
    en: 'Budda, Wakiso District, Uganda',
    ar: 'بودا، مقاطعة واكيسو، أوغندا',
    fr: 'Budda, District de Wakiso, Ouganda',
    lg: 'Budda, Disitulikiti ya Wakiso, Uganda'
  },
  phone: '+256 700 123 456',
  email: 'buddaislamicjuniorschool@gmail.com',
  openingHours: {
    en: 'Monday - Friday: 7:00 AM - 5:00 PM',
    ar: 'الاثنين - الجمعة: 7:00 صباحاً - 5:00 مساءً',
    fr: 'Lundi - Vendredi: 7h00 - 17h00',
    lg: 'Balaza - Lwakutaano: 7:00 AM - 5:00 PM'
  },
  mapCoordinates: {
    lat: 0.2157,
    lng: 32.5804
  }
};

export const mockProducts: Product[] = [
  {
    _id: 'product-1',
    productName: {
      en: 'School Uniform Set',
      ar: 'طقم الزي المدرسي',
      fr: 'Ensemble d\'uniforme scolaire',
      lg: 'Engoye z\'essomero'
    },
    productImage: '/images/uniform.jpg',
    description: {
      en: 'Complete school uniform set including shirt, trousers/skirt, and tie',
      ar: 'طقم زي مدرسي كامل يشمل القميص والبنطلون/التنورة والربطة',
      fr: 'Ensemble d\'uniforme scolaire complet comprenant chemise, pantalon/jupe et cravate',
      lg: 'Engoye z\'essomero ezijjuvu nga zirimu ekkooti, esuuti/sikati, n\'ekkaamba'
    },
    price: 85000,
    category: {
      en: 'Uniforms',
      ar: 'الزي المدرسي',
      fr: 'Uniformes',
      lg: 'Engoye z\'essomero'
    },
    stockQuantity: 50,
    slug: 'school-uniform-set'
  },
  {
    _id: 'product-2',
    productName: {
      en: 'Exercise Books Pack',
      ar: 'حزمة كتب التمارين',
      fr: 'Pack de cahiers d\'exercices',
      lg: 'Ebitabo by\'okuwandiikamu'
    },
    productImage: '/images/books.jpg',
    description: {
      en: 'Pack of 10 exercise books for different subjects',
      ar: 'حزمة من 10 كتب تمارين لمواد مختلفة',
      fr: 'Pack de 10 cahiers d\'exercices pour différentes matières',
      lg: 'Ebitabo 10 eby\'okuwandiikamu ebya masomo ag\'enjawulo'
    },
    price: 25000,
    category: {
      en: 'Stationery',
      ar: 'القرطاسية',
      fr: 'Papeterie',
      lg: 'Ebikozesebwa mu kuwandiika'
    },
    stockQuantity: 100,
    slug: 'exercise-books-pack'
  }
];

export const mockExpansion: Expansion = {
  _id: 'expansion-1',
  title: {
    en: 'Future Growth & Boarding Facilities',
    ar: 'النمو المستقبلي ومرافق الإقامة',
    fr: 'Croissance Future et Installations d\'Internat',
    lg: 'Okukula mu Biseera by\'omu Maaso n\'Ebifo by\'Okusula'
  },
  description: {
    en: 'Our vision for expanding Budda Islamic Junior School to serve more students and families',
    ar: 'رؤيتنا لتوسيع مدرسة بودا الإسلامية الابتدائية لخدمة المزيد من الطلاب والعائلات',
    fr: 'Notre vision pour l\'expansion de l\'École Primaire Islamique Budda pour servir plus d\'étudiants et de familles',
    lg: 'Ekiruubirirwa kyaffe ku kugaza Essomero lya Budda Islamic Junior okusobola okuweereza abayizi n\'amaka amangi'
  },
  boardingInfo: {
    en: 'We are planning to introduce boarding facilities to accommodate students from distant areas',
    ar: 'نحن نخطط لإدخال مرافق الإقامة لاستيعاب الطلاب من المناطق البعيدة',
    fr: 'Nous prévoyons d\'introduire des installations d\'internat pour accueillir les étudiants des régions éloignées',
    lg: 'Tuteekateeka okuleeta ebifo by\'okusula okusobola okutwala abayizi okuva mu bitundu eby\'ewala'
  },
  futureGrowthPlans: {
    en: 'Expansion plans include new classrooms, science laboratory, computer lab, and sports facilities',
    ar: 'تشمل خطط التوسع فصول دراسية جديدة ومختبر علوم ومختبر حاسوب ومرافق رياضية',
    fr: 'Les plans d\'expansion incluent de nouvelles salles de classe, un laboratoire de sciences, un laboratoire informatique et des installations sportives',
    lg: 'Enteekateeka z\'okugaza zirimu ebibiina ebipya, ekisenge ky\'ebyobugezi, ekisenge kya kompyuta, n\'ebifo by\'emizannyo'
  },
  timeline: {
    en: '2025-2027: Phase 1 construction and boarding facility development',
    ar: '2025-2027: البناء المرحلة الأولى وتطوير مرافق الإقامة',
    fr: '2025-2027: Construction de la Phase 1 et développement des installations d\'internat',
    lg: '2025-2027: Okuzimba ekitundu ekisooka n\'okukulaakulanya ebifo by\'okusula'
  },
  benefits: [
    {
      en: 'Increased student capacity',
      ar: 'زيادة قدرة استيعاب الطلاب',
      fr: 'Capacité d\'étudiants augmentée',
      lg: 'Okwongera obubaka bw\'abayizi'
    },
    {
      en: 'Better learning facilities',
      ar: 'مرافق تعليمية أفضل',
      fr: 'Meilleures installations d\'apprentissage',
      lg: 'Ebifo by\'okuyiga ebisinga obulungi'
    },
    {
      en: 'Boarding accommodation',
      ar: 'أماكن إقامة داخلية',
      fr: 'Hébergement en internat',
      lg: 'Ebifo by\'okusula'
    },
    {
      en: 'Enhanced sports programs',
      ar: 'برامج رياضية محسنة',
      fr: 'Programmes sportifs améliorés',
      lg: 'Pulogulaamu z\'emizannyo ezirongooseddwa'
    },
    {
      en: 'Modern technology integration',
      ar: 'دمج التكنولوجيا الحديثة',
      fr: 'Intégration de la technologie moderne',
      lg: 'Okugatta tekinologiya y\'omulembe'
    }
  ]
};

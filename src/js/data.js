const CAFE_MENU = {
  pizza: {
    title: "البيتزا والمكرونة",
    items: [
      {
        id: "p1",
        name: "بيتزا مارجريتا",
        desc: "صلصة طماطم غنية، جبنة موتزاريلا طبيعية، ريحان طازج وزيت زيتون",
        img: ".//src/imgs/pizza1.webp",
        hasSizes: true,
        prices: { small: 120, medium: 160, large: 210 },
      },
      {
        id: "p2",
        name: "بيتزا سوبر سوبيريم",
        desc: "ميكس لحوم مميز، فلفل ألوان، زيتون، صلصة كافيه بريس الخاصة وموتزاريلا",
        img: ".//src/imgs/pizza1.webp",
        hasSizes: true,
        prices: { small: 150, medium: 200, large: 260 },
      },
      {
        id: "p3",
        name: "مكرونة وايت صوص دجاج",
        desc: "باستا إيطالية بقطع الدجاج المشوي، الفطر الطازج، صوص الكريمة والبارميزان",
        img: ".//src/imgs/pizza1.webp",
        hasSizes: false,
        price: 140,
      },
      {
        id: "p3",
        name: "مكرونة وايت صوص ",
        desc: "باستا إيطالية بقطع الدجاج المشوي، الفطر الطازج، صوص الكريمة والبارميزان",
        img: ".//src/imgs/pizza1.webp",
        hasSizes: false,
        price: 140,
      },
    ],
  },
  grill: {
    title: "المشويات",
    items: [
      {
        id: "g1",
        name: "شيش طاووق فاخر",
        desc: "شيش طاووق متبل على طريقة بريس السرية، يقدم مع الأرز البسمتي والثومية",
        img: ".//src/imgs/grill.webp",
        hasSizes: false,
        price: 190,
      },
      {
        id: "g2",
        name: "كفتة مشوية على الفحم",
        desc: "كفتة بلدي مشوية، تقدم مع سلطة خضراء، طحينة، وعيش طازج",
        img: ".//src/imgs/grill.webp",
        hasSizes: true,
        prices: { small: 160, medium: 240, large: 320 },
      },
    ],
  },
  bakery: {
    title: "التحلية والمخبوزات",
    items: [
      {
        id: "b1",
        name: "مولتن كيك الشوكولاتة",
        desc: "كيكة الشوكولاتة الذائبة الفاخرة، تقدم مع بولة أيس كريم فانيليا",
        img: ".//src/imgs/dessert.webp",
        hasSizes: false,
        price: 85,
      },
      {
        id: "b2",
        name: "كرواسون زبدة فرنسي",
        desc: "مخبوز هش ومقرمش بالزبدة الطبيعية النيوزيلاندية",
        img: ".//src/imgs/dessert.webp",
        hasSizes: false,
        price: 45,
      },
    ],
  },
  drinks: {
    title: "المشروبات",
    items: [
      {
        id: "d1",
        name: "كولا بارد",
        desc: "كولا منعشة باردة، مثالية مع وجبتك أو كعلاج منعش في أي وقت",
        img: ".//src/imgs/cola.webp",
        hasSizes: false,
        price: 25,
      },
      {
        id: "d2",
        name: "كابوتشينو",
        desc: "إسبريسو مثالي مع رغوة حليب كريمية غنية",
        img: ".//src/imgs/pizza1.webp",
        hasSizes: true,
        prices: { small: 55, medium: 70, large: 85 },
      },
    ],
  },
};

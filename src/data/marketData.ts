import { Car, Smartphone, Package, Home, Scissors, Trophy } from "lucide-react";

export interface MarketApplicationDetail {
  id: string;
  title: string;
  en: string;
  heroImage: string;
  icon: any;
  overview: string;
  challenges: string[];
  solutions: {
    title: string;
    desc: string;
    products: string[];
  }[];
  benefits: string[];
  coreAdvantages: {
    title: string;
    desc: string;
  }[];
  gallery: string[];
}

export const marketApplicationsData: Record<string, MarketApplicationDetail> = {
  automotive: {
    id: "automotive",
    title: "汽车工业",
    en: "Automotive Industry",
    heroImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920",
    icon: Car,
    overview: "随着全球汽车工业向绿色、环保、低VOC方向转型，西顿新材料为汽车内饰、仪表盘及外饰件提供全方位的水性涂层解决方案。我们致力于提升驾驶舱的舒适度与美感，同时确保材料的耐用性与安全性。",
    challenges: [
      "严苛的VOC排放标准与气味控制",
      "极高的高低温循环耐受力要求",
      "对多种基材（ABS, PC, 皮革）的优异附着力",
      "卓越的耐刮擦与耐化学性能（防晒霜、汗液等）"
    ],
    solutions: [
      {
        title: "水性内饰革涂饰系统",
        desc: "采用高性能PUD树脂，赋予合成革与真皮细腻的触感与极佳的物理性能，满足汽车主机厂的严苛测试。",
        products: ["seapur-50a01", "seapur-50a02", "seapur-50g71", "seapur-50g75", "seapur-50g80", "seapur-50g72"]
      },
      {
        title: "触感涂料解决方案",
        desc: "为仪表盘、中控台提供极致的“肤感”体验，具有优异的消光效果与抗指纹性能。",
        products: ["seamatt-11m01", "seamatt-11m02"]
      }
    ],
    benefits: [
      "超低VOC排放，守护车内空气质量",
      "卓越的触觉美学设计",
      "长效的耐候性与物理防护",
      "符合全球主流主机厂标准"
    ],
    coreAdvantages: [
      { title: "自消光核心技术", desc: "无需添加消光粉即可实现极低光泽，漆膜透明度更高，避免白雾现象。" },
      { title: "卓越的耐化学性", desc: "通过严苛的防晒霜、汗液及酒精测试，确保内饰长久如新。" },
      { title: "低气味/低VOC", desc: "专为密闭车内环境设计，远优于国标及欧标排放要求。" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800"
    ]
  },
  electronics: {
    id: "electronics",
    title: "电子与家电",
    en: "Electronics & Appliances",
    heroImage: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1920",
    icon: Smartphone,
    overview: "在3C电子与智能家电领域，外观质感与表面防护是产品竞争力的核心。西顿提供的高性能水性树脂，在提升产品视觉档次的同时，赋予其卓越的表面硬度与耐磨性能。",
    challenges: [
      "复杂几何形状的均匀涂布",
      "对高光与哑光效果的精准控制",
      "极佳的耐酒精与耐化妆品性能",
      "快速固化以提升生产效率"
    ],
    solutions: [
      {
        title: "3C电子表面涂层",
        desc: "针对手机壳、笔记本电脑外壳，提供高硬度、抗刮伤的水性UV或双组份系统。",
        products: ["searays-uv101", "searays-uv107", "searays-uv214", "searays-uv300", "searays-uv100", "searays-uv101a", "searays-uv202", "searays-uv205", "searays-uv213"]
      },
      {
        title: "家电外观装饰",
        desc: "为冰箱、洗衣机面板提供丰富的色彩表现力与长效的防腐蚀保护。",
        products: ["seacryl-11a01", "seapur-50g85", "seacryl-11p22", "seacryl-11p28", "seacryl-11p27", "seacryl-11p58", "seacryl-11p51", "seacryl-13g29", "seacryl-23g24", "seacryl-20g04", "seacryl-20g05", "seacryl-12g37", "seacryl-23g27", "seapur-40g30", "seapur-40p35", "seapur-50g24"]
      }
    ],
    benefits: [
      "极致的表面平整度与光泽控制",
      "优异的耐化学介质性能",
      "高效的施工性能",
      "提升终端产品的科技感"
    ],
    coreAdvantages: [
      { title: "极佳的基材附着力", desc: "对PC、ABS、金属等多种电子基材具有卓越的附着性能。" },
      { title: "高硬度与耐磨性", desc: "漆膜硬度可达2H以上，有效抵抗日常使用中的划伤与磨损。" },
      { title: "精准的色彩还原", desc: "高透明度基料，确保金属粉或颜料呈现最真实的视觉效果。" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1526738549149-8e07eca03a47?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800"
    ]
  },
  packaging: {
    id: "packaging",
    title: "包装与印刷",
    en: "Packaging & Print",
    heroImage: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1920",
    icon: Package,
    overview: "西顿在包装印刷领域拥有深厚的技术积淀，特别是在高端烟酒包装、食品包装及薄膜印刷领域，我们的水性连接料以其卓越的展色性与转移性赢得了市场广泛认可。",
    challenges: [
      "高速印刷下的复溶性平衡",
      "对非极性薄膜（OPP, PET）的附着力",
      "环保法规对残留溶剂的严格限制",
      "高光泽与高透明度的视觉要求"
    ],
    solutions: [
      {
        title: "高端烟酒包装油墨",
        desc: "提供高复溶、高展色的水性丙烯酸乳液，确保印刷图案清晰、色彩鲜艳。",
        products: ["seacryl-11k20", "seacryl-11k38", "seacryl-11k40", "seacryl-11k10", "seacryl-11k12", "seacryl-11k16", "seacryl-11k37"]
      },
      {
        title: "薄膜印刷与喷墨",
        desc: "专为软包装与数码打印开发，具有优异的复合强度与展色性能。",
        products: ["seapur-50k06", "seacryl-11k50", "seadit-55a01", "seapur-50k76", "seapur-55x10", "seapur-50k12", "seapur-50k05", "seapur-50k09", "seapur-50k50a", "seapur-50k15"]
      }
    ],
    benefits: [
      "零溶剂残留，符合食品级安全",
      "卓越的印刷适应性",
      "色彩还原度极高",
      "助力包装行业绿色转型"
    ],
    coreAdvantages: [
      { title: "高展色与高转移", desc: "优异的颜料润湿性，确保印刷色彩饱和度高，网点清晰。" },
      { title: "优异的复溶性", desc: "在高速印刷过程中不塞版，停机后易清洗，提升生产效率。" },
      { title: "多基材适用性", desc: "广泛适用于纸张、PE、PET、BOPP等多种包装材料。" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800"
    ]
  },
  home: {
    id: "home",
    title: "家居与建筑",
    en: "Home & Architecture",
    heroImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1920",
    icon: Home,
    overview: "家居环境的健康与美观同等重要。西顿提供的水性木器漆与装饰涂料树脂，在彻底消除甲醛与VOC隐患的同时，保留了木材最自然的纹理与触感。",
    challenges: [
      "水性涂料引起的木材涨筋问题",
      "漆膜的透明度与丰满度平衡",
      "耐水、耐烫及耐家庭化学品性能",
      "施工过程中的干燥速度控制"
    ],
    solutions: [
      {
        title: "高端木器家具涂料",
        desc: "采用独特的防涨筋技术，提供媲美油性漆的透明度与硬度。",
        products: ["seacryl-11w01", "seacryl-11w18", "seacryl-11w19", "seacryl-11w08", "seapur-50g71", "seapur-30g01", "seapur-50g33", "seapua-51w02", "searays-uv210"]
      },
      {
        title: "室内装饰与地板",
        desc: "高耐磨、防滑的水性地板漆系统，为家庭提供持久保护。",
        products: ["高耐磨PUD", "自交联乳液"]
      }
    ],
    benefits: [
      "净味环保，即刷即住",
      "完美展现木材天然美感",
      "卓越的抗划伤与耐污渍性能",
      "长效保护家居表面"
    ],
    coreAdvantages: [
      { title: "专利防涨筋技术", desc: "有效解决水性漆引起的木材纤维吸水膨胀问题，漆膜平整细腻。" },
      { title: "高透明与高丰满度", desc: "深层润湿木材纹理，呈现如油性漆般的通透感与厚实感。" },
      { title: "极速干燥性能", desc: "优异的早期抗粘连性，缩短生产周期，提升工厂产能。" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800"
    ]
  },
  leather: {
    id: "leather",
    title: "皮革与时尚",
    en: "Leather & Fashion",
    heroImage: "https://images.unsplash.com/photo-1524290263334-92f5374171a6?auto=format&fit=crop&q=80&w=1920",
    icon: Scissors,
    overview: "西顿为时尚产业提供全套水性皮革涂饰方案。无论是追求极致柔软的服装革，还是强调耐磨耐用的鞋材革，我们都能提供精准的技术支持。",
    challenges: [
      "皮革天然纹理的保留与修饰",
      "涂层的柔软度与强韧度平衡",
      "优异的耐折牢度与干湿擦性能",
      "时尚色彩与特殊效应的实现"
    ],
    solutions: [
      {
        title: "水场加工 (Wet End)",
        desc: "提供从脱脂、浸灰到复鞣、加脂的全套水场助剂，优化皮革基础品质。",
        products: ["seaaid-88w01", "seaaid-88w02", "seaaid-88w04"]
      },
      {
        title: "皮革涂饰 (Finishing)",
        desc: "极致柔软的触感树脂与功能助剂，赋予皮革如真丝般的细腻质感与高光泽。",
        products: ["seapur-50g80", "seafin-99f01", "seafin-99f05", "seapur-50l02", "seapur-50l01", "seapur-50g90"]
      }
    ],
    benefits: [
      "提升皮革档次与附加值",
      "符合国际环保纺织标准",
      "丰富的表面效应选择",
      "优异的加工适应性"
    ],
    coreAdvantages: [
      { title: "极致的触感设计", desc: "从丝滑到肉感，提供多样化的表面触感调节方案。" },
      { title: "卓越的耐折牢度", desc: "漆膜具有极高的弹性与韧性，在数万次折叠测试后仍不龟裂。" },
      { title: "环保合规性", desc: "完全符合ZDHC、OEKO-TEX等国际主流环保认证要求。" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1590739225287-bd2a5d0bb5aa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1473187983305-f6150a1e7246?auto=format&fit=crop&q=80&w=800"
    ]
  },
  metal: {
    id: "metal",
    title: "金属与工业防护",
    en: "Metal & Industrial Protection",
    heroImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1920",
    icon: Trophy,
    overview: "应用于卷材、金属防腐及特种工业领域。西顿提供的特种功能树脂，为金属五金及工业设备提供坚不可摧的保护。",
    challenges: [
      "极高的金属附着力与防锈要求",
      "对金属基材的长效防腐蚀保护",
      "特殊功能性（如防滑、抗静电）的集成",
      "极端气候下的性能稳定性"
    ],
    solutions: [
      {
        title: "工业防护与金属",
        desc: "针对五金件、机械设备，提供快速干、高附着、高耐盐雾的水性防锈方案。",
        products: ["seapur-50m01", "seapur-50g85", "seacryl-11p28"]
      },
      {
        title: "动力电池与能源",
        desc: "专为新能源领域开发，提供电化学稳定性优异的粘结剂与隔膜涂层。",
        products: ["seapur-50b01", "seapur-50k01a"]
      }
    ],
    benefits: [
      "卓越的物理防护强度",
      "延长设备使用寿命",
      "多功能性集成方案",
      "高效环保的施工体验"
    ],
    coreAdvantages: [
      { title: "高韧性防护体系", desc: "漆膜在剧烈撞击下不剥离、不碎裂，为器材提供长效保护。" },
      { title: "优异的防腐性能", desc: "通过数百小时盐雾测试，有效阻隔水分与氧气对金属的侵蚀。" },
      { title: "多功能集成", desc: "可根据需求集成抗静电、防滑、耐高温等特殊功能。" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
    ]
  }
};

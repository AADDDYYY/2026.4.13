import { Sparkles, Atom, Sun, Shield } from "lucide-react";

export interface BusinessDetail {
  id: string;
  title: string;
  en: string;
  heroImage: string;
  icon: any;
  description: string;
  features: string[];
  applications: string[];
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  productSeries: {
    name: string;
    desc: string;
    image: string;
  }[];
}

export const businessData: Record<string, BusinessDetail> = {
  "self-matting": {
    id: "self-matting",
    title: "水性自消光树脂",
    en: "Waterborne Self-Matting Resin",
    heroImage: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1920",
    icon: Sparkles,
    description: "西顿核心专利产品，通过分子结构设计实现涂层自发消光。无需额外添加消光粉，彻底解决了传统消光粉带来的白雾、沉降及耐刮擦性差等痛点。",
    features: [
      "极致低光泽（可达0.5-2°）",
      "卓越的漆膜通透度，无白雾现象",
      "极佳的耐刮擦与抗指纹性能",
      "细腻柔和的肤感触觉体验"
    ],
    applications: [
      "高端汽车内饰涂料",
      "3C电子产品肤感漆",
      "高端木器家具涂装",
      "特种皮革顶层涂饰"
    ],
    technicalSpecs: [
      { label: "外观", value: "乳白色液体" },
      { label: "固含量", value: "35±1%" },
      { label: "pH值", value: "7.0 - 9.0" },
      { label: "粘度", value: "≤500 mPa.s" }
    ],
    productSeries: [
      {
        name: "SEAPUR 50G 系列",
        desc: "专为汽车内饰开发，具有极高的耐化学性与耐候性。",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: "SEACRYL 11W 系列",
        desc: "适用于塑胶基材，提供优异的附着力与硬度平衡。",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  "pud": {
    id: "pud",
    title: "水性聚氨酯 (PUD)",
    en: "Waterborne Polyurethane",
    heroImage: "https://images.unsplash.com/photo-1524292332709-b33366a7f141?auto=format&fit=crop&q=80&w=1920",
    icon: Atom,
    description: "西顿提供全系列脂肪族与芳香族水性聚氨酯分散体（PUD）。产品涵盖了从超软到极硬的不同性能梯度，广泛应用于皮革、纺织、木器及工业涂料。",
    features: [
      "卓越的柔韧性与断裂伸长率",
      "优异的耐磨性与抗冲击力",
      "极佳的耐水、耐溶剂性能",
      "良好的成膜性与基材附着力"
    ],
    applications: [
      "皮革涂饰剂与加脂剂",
      "纺织涂层与印花胶浆",
      "水性木器漆连接料",
      "工业与塑胶防护涂料"
    ],
    technicalSpecs: [
      { label: "离子型", value: "阴离子 / 非离子" },
      { label: "固含量", value: "30% - 50%" },
      { label: "100%模量", value: "1.0 - 20.0 MPa" },
      { label: "最低成膜温度", value: "0 - 50 ℃" }
    ],
    productSeries: [
      {
        name: "脂肪族肤感 PUD",
        desc: "提供如皮肤般细腻的触感，且具有极佳的抗黄变性能。",
        image: "https://images.unsplash.com/photo-1524290263334-92f5374171a6?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: "高耐磨工业 PUD",
        desc: "针对工业地坪与特种防护，提供极高的表面硬度。",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  "uv": {
    id: "uv",
    title: "水性UV固化树脂",
    en: "Waterborne UV Resin",
    heroImage: "https://images.unsplash.com/photo-1532187875605-2fe35851142b?auto=format&fit=crop&q=80&w=1920",
    icon: Sun,
    description: "结合了水性涂料的环保性与UV固化的高效性。西顿水性UV树脂具有极快的干燥速度与固化速度，能够显著提升生产效率，并提供极高的漆膜硬度。",
    features: [
      "极速固化，提升生产线产能",
      "极高的表面硬度与耐划伤性",
      "优异的耐化学介质性能",
      "低收缩率，良好的附着力"
    ],
    applications: [
      "手机、电脑等3C电子外壳",
      "高端木器地板涂装",
      "塑料薄膜印刷油墨",
      "特种纸张上光油"
    ],
    technicalSpecs: [
      { label: "官能团数", value: "3 / 6 / 9" },
      { label: "固化能量", value: "200 - 800 mJ/cm²" },
      { label: "铅笔硬度", value: "H - 4H" },
      { label: "固含量", value: "35% - 45%" }
    ],
    productSeries: [
      {
        name: "多官能团 UV 系列",
        desc: "提供极高的交联密度，适用于对硬度要求极高的场景。",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: "柔性水性 UV",
        desc: "在保持高硬度的同时兼顾柔韧性，防止漆膜脆裂。",
        image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  "anti-fingerprint": {
    id: "anti-fingerprint",
    title: "水性抗指纹树脂",
    en: "Waterborne Anti-fingerprint Resin",
    heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920",
    icon: Shield,
    description: "专为工业表面及电子产品表面设计。通过特殊的表面改性技术，有效降低表面能，使指纹残留不明显且极易擦拭，同时保持基材原有的质感。",
    features: [
      "卓越的抗指纹与易清洁性能",
      "保持基材的原始光泽与纹理",
      "优异的耐盐雾与防腐蚀性能",
      "极薄的涂层厚度，不影响装配"
    ],
    applications: [
      "高端家电面板",
      "电梯轿厢装饰板",
      "高端厨卫五金件",
      "电子产品金属底壳"
    ],
    technicalSpecs: [
      { label: "水接触角", value: "≥ 100°" },
      { label: "油接触角", value: "≥ 60°" },
      { label: "耐盐雾时间", value: "≥ 96h" },
      { label: "漆膜厚度", value: "1 - 3 μm" }
    ],
    productSeries: [
      {
        name: "纳米改性抗指纹系列",
        desc: "采用纳米杂化技术，提供持久的疏水疏油效果。",
        image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: "自交联抗指纹乳液",
        desc: "单组份系统，施工简便，具有极佳的性价比。",
        image: "https://images.unsplash.com/photo-1532187875605-2fe35851142b?auto=format&fit=crop&q=80&w=600"
      }
    ]
  }
};

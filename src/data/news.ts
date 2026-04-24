export interface NewsItem {
  id: string;
  title: string;
  category: string;
  type: 'press_release' | 'article';
  date: string;
  summary: string;
  image: string;
  status?: 'published' | 'draft';
}

export const newsData: NewsItem[] = [
  {
    id: "1",
    title: "西顿新材料荣获国家级专精特新“小巨人”企业称号",
    category: "corporate",
    type: "press_release",
    date: "2024-03-15",
    summary: "近日，国家工业和信息化部公布了第六批专精特新“小巨人”企业名单，广东西顿新材料科技有限公司凭借在水性树脂领域的深厚技术积淀与创新能力成功入选。",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    status: "published"
  },
  {
    id: "2",
    title: "水性自消光树脂在高端皮革涂饰中的应用研究",
    category: "leather",
    type: "article",
    date: "2024-02-28",
    summary: "本文深入探讨了水性自消光树脂的成膜机理及其在高端汽车皮革、家具皮革中的应用优势，为行业提供了全新的环保涂饰方案。",
    image: "https://images.unsplash.com/photo-1524292332407-d54ad0d1d769?auto=format&fit=crop&q=80&w=800",
    status: "published"
  },
  {
    id: "3",
    title: "西顿新材料参加2024中国国际涂料展 (China Coat)",
    category: "coatings",
    type: "press_release",
    date: "2024-02-10",
    summary: "西顿新材料携全系列水性树脂产品亮相2024中国国际涂料展，展示了公司在绿色化学与可持续发展方面的最新成果，吸引了众多国内外客商关注。",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    status: "published"
  },
  {
    id: "4",
    title: "绿色转型：水性UV技术如何助力包装行业减碳",
    category: "packaging",
    type: "article",
    date: "2024-01-20",
    summary: "随着全球碳中和目标的推进，包装行业正面临巨大的环保压力。水性UV技术作为一种高效、低VOC的解决方案，正逐渐成为行业主流。",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800",
    status: "published"
  },
  {
    id: "5",
    title: "西顿新材料博士后科研工作站正式挂牌",
    category: "corporate",
    type: "press_release",
    date: "2023-12-15",
    summary: "博士后科研工作站的建立，标志着西顿新材料在产学研结合、高层次人才培养方面迈上了新台阶，将进一步驱动公司的技术创新。",
    image: "https://images.unsplash.com/photo-1532187875605-1ef6c237ddc4?auto=format&fit=crop&q=80&w=800",
    status: "published"
  },
  {
    id: "6",
    title: "可持续发展的未来：生物基树脂的研发与应用",
    category: "sustainability",
    type: "article",
    date: "2023-11-05",
    summary: "西顿研发团队在生物基单体合成及树脂改性方面取得重大突破，成功开发出生物基含量超过40%的高性能水性聚氨酯产品。",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
    status: "published"
  },
  {
    id: "7",
    title: "2024年全球水性树脂市场趋势报告：环保法规驱动技术革新",
    category: "coatings",
    type: "article",
    date: "2024-03-20",
    summary: "随着各国环保法规的日益严苛，水性化已成为涂料行业不可逆转的趋势。本报告分析了未来五年全球水性树脂市场的增长点及技术演进方向。",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    status: "published"
  }
];

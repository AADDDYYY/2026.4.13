export interface CertificateItem {
  id: string;
  title: string;
  type: string;
  category: string;
  image: string;
  order: number;
}

export const certificatesData: CertificateItem[] = [
  // Static placeholder data. You might need to update this with your actual data from Firebase once accessible.
  {
    id: "cert_1",
    title: "高新技术企业证书",
    type: "资质认定",
    category: "政府认定",
    image: "",
    order: 0
  }
];

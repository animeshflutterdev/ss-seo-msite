export type NormalizedProduct = {
  productId: string;
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  shortDescription: string;
  description: string;
  manufacturer: string;
  composition: string;
  price: number | null;
  mrp: number | null;
  imageUrl: string | null;
  imageAlt: string;
  inStock: boolean;
  categoryName: string;
  brandName: string;
  uses: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  raw: unknown;
};
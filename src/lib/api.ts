import pdpResponse from "../../public/data/pdp_response.json";
import { cache } from "react";
/*export async function getProductBySlug(slug: string) {
  const product = pdpResponse.product?.[0];

  if (!product) {
    return null;
  }

  return product.details;
  // const apiBaseUrl = process.env.API_BASE_URL;

  // if (!apiBaseUrl) {
  //   throw new Error("API_BASE_URL is missing");
  // }

  // const response = await fetch(`${apiBaseUrl}/pdp/${slug}`, {
  //   next: {
  //     revalidate: 3600,
  //   },
  // });

  // if (response.status === 404) {
  //   return null;
  // }

  // if (!response.ok) {
  //   throw new Error(`PDP API failed for slug: ${slug}`);
  // }

  // return response.json();
}*/

import type { NormalizedProduct } from "@/types/product";

type ProductDetailApiOptions = {
  productId: string;
  slug: string;
  pincode?: string;
  warehouseId?: string;
};

const DEFAULT_DEVICE_ID =
  "7990a414-28ba-4119-b938-1c954de8ca86MTc4MzQ5MjgzODMxODAwMA==";

const productIdMap: Record<string, string> = {
  "cal-360-tab-10-tab-cipla-ltd-sx6r74": "npxuer",
};

export function getProductIdFromSlug(slug: string) {
  if (productIdMap[slug]) {
    return productIdMap[slug];
  }

  const parts = slug.split("-");
  return parts[parts.length - 1] || slug;
}

function getStringValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return "";
}

function getNumberValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value.replace(/[₹,\s]/g, ""));

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function getBooleanStock(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "boolean") {
      return value;
    }

    if (typeof value === "number") {
      return value > 0;
    }

    if (typeof value === "string") {
      const normalized = value.toLowerCase();

      if (
        normalized.includes("in stock") ||
        normalized === "available" ||
        normalized === "true" ||
        normalized === "1"
      ) {
        return true;
      }

      if (
        normalized.includes("out of stock") ||
        normalized === "unavailable" ||
        normalized === "false" ||
        normalized === "0"
      ) {
        return false;
      }
    }
  }

  return true;
}

function findFirstObject(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== "object") {
    return {};
  }

  const root = input as Record<string, unknown>;

  if (Array.isArray(root.product) && root.product.length > 0) {
    const firstProduct = root.product[0];

    if (firstProduct && typeof firstProduct === "object") {
      const firstProductObj = firstProduct as Record<string, unknown>;

      if (
        firstProductObj.details &&
        typeof firstProductObj.details === "object"
      ) {
        return firstProductObj.details as Record<string, unknown>;
      }

      return firstProductObj;
    }
  }

  if (Array.isArray(root.data) && root.data.length > 0) {
    const firstData = root.data[0];

    if (firstData && typeof firstData === "object") {
      return firstData as Record<string, unknown>;
    }
  }

  const candidates = [
    root.details,
    root.data,
    root.productData,
    root.result,
    root.response,
    root,
  ];

  for (const candidate of candidates) {
    if (
      candidate &&
      typeof candidate === "object" &&
      !Array.isArray(candidate)
    ) {
      return candidate as Record<string, unknown>;
    }
  }

  return root;
}

function normalizeFaqs(product: Record<string, unknown>) {
  const possibleFaqs = product.faqs || product.faq || product.FAQ;

  if (!Array.isArray(possibleFaqs)) {
    return [];
  }

  return possibleFaqs
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const faq = item as Record<string, unknown>;

      const question = getStringValue(
        faq.question,
        faq.Question,
        faq.title,
        faq.q
      );

      const answer = getStringValue(
        faq.answer,
        faq.Answer,
        faq.content,
        faq.a
      );

      if (!question || !answer) {
        return null;
      }

      return {
        question,
        answer,
      };
    })
    .filter(Boolean) as {
    question: string;
    answer: string;
  }[];
}

function calculateSellingPriceFromDiscount(
  mrp: number | null,
  discountPercent: number | null
) {
  if (!mrp || !discountPercent) {
    return null;
  }

  const price = mrp - (mrp * discountPercent) / 100;
  return Number(price.toFixed(2));
}

function normalizeProductResponse(
  rawResponse: unknown,
  slug: string,
  productId: string
): NormalizedProduct {
  const product = findFirstObject(rawResponse);

  const name = getStringValue(
    product.DisplayName,
    product.ProductName,
    product.productName,
    product.name,
    product.title,
    product.item_name,
    product.product_name,
    "SastaSundar Product"
  );

  const manufacturer = getStringValue(
    product.MfgGroup,
    product.Manufacturer,
    product.manufacturer,
    product.manufacturerName,
    product.company,
    product.companyName,
    product.brandName,
    "SastaSundar"
  );

  const composition = getStringValue(
    product.Composition,
    product.composition,
    product.SaltComposition,
    product.saltComposition,
    product.salt_composition,
    product.SaltName,
    product.saltName,
    product.Strength,
    product.packSize,
    product.pack_size
  );

  const shortDescription = getStringValue(
    product.shortDescription,
    product.short_description,
    product.productShortDescription,
    product.summary,
    product.description,
    `${name} is available on SastaSundar.`
  );

  const description = getStringValue(
    product.description,
    product.productDescription,
    product.longDescription,
    product.content,
    shortDescription
  );

  // const price = getNumberValue(
  //   product.price,
  //   product.sellingPrice,
  //   product.selling_price,
  //   product.finalPrice,
  //   product.discountedPrice,
  //   product.offerPrice
  // );

  // const mrp = getNumberValue(product.mrp, product.MRP, product.marketPrice);
  const mrp = getNumberValue(
    product.MRP,
    product.mrp,
    product.marketPrice
  );

  const imageUrl = getStringValue(
    product.ProductImage,
    product.imageUrl,
    product.image,
    product.productImage,
    product.image_url,
    product.thumbnail,
    product.productImageUrl
  );

  const inStock = getBooleanStock(
    product.inStock,
    product.stock,
    product.available,
    product.availability,
    product.quantity
  );

  const categoryName = getStringValue(
    product.categoryName,
    product.category,
    product.category_name,
    "Medicine"
  );

  const brandName = getStringValue(
    product.brandName,
    product.brand,
    product.Brand,
    manufacturer
  );

  const uses = getStringValue(
    product.uses,
    product.Uses,
    product.use,
    product.indications,
    ""
  );

  const metaTitle = getStringValue(
    product.metaTitle,
    product.seoTitle,
    product.title,
    `${name} | SastaSundar`
  );

  const metaDescription = getStringValue(
    product.metaDescription,
    product.seoDescription,
    product.meta_description,
    shortDescription,
    `Buy ${name} online at SastaSundar. Check price, composition, manufacturer and product details.`
  );

  const discountPercent = getNumberValue(
    product.CashDisc,
    product.cashDisc,
    product.discount,
    product.discountPercent
  );

  const apiSellingPrice = getNumberValue(
    product.price,
    product.sellingPrice,
    product.selling_price,
    product.finalPrice,
    product.discountedPrice,
    product.offerPrice
  );

  const calculatedSellingPrice = calculateSellingPriceFromDiscount(
    mrp,
    discountPercent
  );

  const price = apiSellingPrice || calculatedSellingPrice;

  return {
    productId,
    slug,
    name,
    metaTitle,
    metaDescription,
    shortDescription,
    description,
    manufacturer,
    composition,
    price,
    mrp,
    imageUrl: imageUrl || null,
    imageAlt: `${name} image`,
    inStock,
    categoryName,
    brandName,
    uses,
    faqs: normalizeFaqs(product),
    raw: rawResponse,
  };
}

export async function getProductDetail({
  productId,
  slug,
  pincode = process.env.SS_DEFAULT_PINCODE || "700156",
  warehouseId = process.env.SS_DEFAULT_WAREHOUSE_ID || "1",
}: ProductDetailApiOptions): Promise<NormalizedProduct> {
  const apiUrl = process.env.PRODUCT_DETAIL_API_URL;

  if (!apiUrl) {
    throw new Error("PRODUCT_DETAIL_API_URL is missing");
  }

  console.log("PRODUCT DETAIL API START", {
    productId,
    slug,
    pincode,
    warehouseId,
    apiUrl,
  });

  console.time(`PRODUCT_DETAIL_API_${productId}`);

  const body = new URLSearchParams({
    deviceId: DEFAULT_DEVICE_ID,
    userId: process.env.SS_DEFAULT_USER_ID || "MTEyNTkwOQ==",
    apptype: "M",
    app_version: "1.0.2",
    app_version_code: "3",
    productId,
    warehouseId,
    panindia: "0",
    pincode,
  });

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",

      AccessToken: process.env.SS_ACCESS_TOKEN || "",
      Authorization: process.env.SS_BASIC_AUTH || "",

      AppType: "M",
      AppVersion: "1.0.2",
      AppVersionCode: "3",
      DeviceDensity: "560",
      DeviceDensityType: "xhdpi",
      DeviceHeight: "915",
      DeviceId: DEFAULT_DEVICE_ID,
      DeviceName: "edge - Win32",
      DeviceOsInfo:
        "Win32 Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36 Edg/150.0.0.0",
      DeviceWidth: "412",
      NetworkInfo: "wifi",
      Origin: "https://sastasundar.com",
      Referer: "https://sastasundar.com/",

      "content-type": "application/x-www-form-urlencoded; charset=utf-8",

      "access-token": process.env.SS_ACCESS_TOKEN || "",
      "app-type": "M",
      "app-version": "1.0.2",
      "app-version-code": "3",
      "browser-id": DEFAULT_DEVICE_ID,
      "device-density": "560",
      "device-density-type": "xhdpi",
      "device-height": "915",
      "device-id": DEFAULT_DEVICE_ID,
      "device-name": "edge - Win32",
      "device-width": "412",
      "network-info": "wifi",
      panindia: "0",
      pincode,
      store_token: process.env.SS_STORE_TOKEN || "",
      whid: warehouseId,
    },
    body,
    next: {
      revalidate: 300,
    },
  });

  const responseText = await response.text();

  console.log("PRODUCT DETAIL API RESPONSE", {
    productId,
    slug,
    status: response.status,
    ok: response.ok,
    responseLength: responseText.length,
    preview: responseText.substring(0, 300),
  });

  if (!response.ok) {
    console.error("Product detail API failed:", {
      status: response.status,
      body: responseText,
    });

    throw new Error(`Product detail API failed with status ${response.status}`);
  }

  let json: unknown;

  try {
    json = JSON.parse(responseText);
  } catch {
    console.error("Invalid product detail JSON:", responseText);
    throw new Error("Product detail API returned invalid JSON");
  }
  
  const normalizedProduct = normalizeProductResponse(json, slug, productId);
  console.log("NORMALIZED PRODUCT", {
    name: normalizedProduct.name,
    manufacturer: normalizedProduct.manufacturer,
    mrp: normalizedProduct.mrp,
    price: normalizedProduct.price,
    composition: normalizedProduct.composition,
    imageUrl: normalizedProduct.imageUrl,
  });

  return normalizedProduct;

  // return normalizeProductResponse(json, slug, productId);
}

export const getCachedProductDetail = cache(getProductDetail);
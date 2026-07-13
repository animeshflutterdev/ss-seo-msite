import pdpResponse from "../../public/data/pdp_response.json";

export async function getProductBySlug(slug: string) {
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
}
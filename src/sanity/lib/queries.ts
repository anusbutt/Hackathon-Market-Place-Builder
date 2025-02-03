import { groq } from "next-sanity"
export const allProducts = groq `*[_type == "product"][0..21]`
export const featureProduct = groq `*[_type == "product"][0..3]`
export const latestProducts = groq `*[_type == "product"][4..7]`
export const trendingProducts = groq `*[_type == "product"][8..11]`
export const topCategoryProducts = groq `*[_type == "product"][12..15]`
export const discountProducts = groq `*[_type == "product"][0]`
export const uniqueProducts = groq `*[_type == "product"][7]`

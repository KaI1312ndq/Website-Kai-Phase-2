import { client } from "../../sanity/lib/client";

// ── Settings ──
export async function getSettings() {
  return client.fetch(`*[_type == "settings"][0]`);
}

// ── Posts ──
export async function getPosts(limit = 10) {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, excerpt, coverImage, category, readTime, publishedAt, featured
    }
  `, { limit });
}

export async function getFeaturedPosts() {
  return client.fetch(`
    *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
      _id, title, slug, excerpt, coverImage, category, readTime, publishedAt
    }
  `);
}

export async function getPost(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, coverImage, category, readTime, publishedAt, body,
      seoTitle, seoDescription
    }
  `, { slug });
}

// ── Case Studies ──
export async function getCaseStudies() {
  return client.fetch(`
    *[_type == "caseStudy"] | order(order asc) {
      _id, title, slug, brand, coverImage, platforms, category, role,
      headline, headlineLabel, description, award, tags, featured
    }
  `);
}

export async function getCaseStudy(slug: string) {
  return client.fetch(`
    *[_type == "caseStudy" && slug.current == $slug][0] {
      _id, title, brand, coverImage, platforms, category, role,
      headline, headlineLabel, description, award, tags, body
    }
  `, { slug });
}

// ── Testimonials ──
export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial"] | order(order asc) {
      _id, name, role, company, avatar, content, rating
    }
  `);
}

// ── Brands ──
export async function getBrands() {
  return client.fetch(`
    *[_type == "brand" && featured == true] | order(order asc) {
      _id, name, logo, url
    }
  `);
}

// ── Timeline ──
export async function getTimeline() {
  return client.fetch(`
    *[_type == "timeline"] | order(order asc) {
      _id, year, title, description, current
    }
  `);
}

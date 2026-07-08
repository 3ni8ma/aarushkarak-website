export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image: string;
  content: string;
}

import { helloWorld } from "./blog/hello-world";
import { buildingHelios } from "./blog/building-helios";
import { spatialComputing } from "./blog/spatial-computing";

const posts: BlogPost[] = [helloWorld, buildingHelios, spatialComputing].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

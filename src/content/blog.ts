export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  image: string
  content: string
}

import { astroTasks } from './blog/astro-tasks'
import { heliosSpatial } from './blog/helios-spatial'
import { communityOne } from './blog/communityone'

const posts: BlogPost[] = [
  astroTasks,
  heliosSpatial,
  communityOne,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}

import { SEOHead } from '../components/seo/SEOHead'
import { getAllPosts } from '../content/blog'
import BlogCard from '../components/blog/BlogCard'
import ScrollReveal from '../components/ui/ScrollReveal'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="relative">
      <SEOHead path="/blog" title="Blog" description="Articles and thoughts on software engineering, spatial computing, AI, and open-source development by Aarush Karak." />
      <div className="fixed inset-0 z-[1] overflow-hidden pointer-events-none">
        <img src="/images/bg/about.jpg" alt="" className="w-full h-full object-cover animate-ken-burns" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--overlay-from), var(--overlay-to))' }} />
        <div className="absolute inset-0 bg-grain opacity-50" />
      </div>
      <div className="relative z-10 page-container">
        <section className="section-container">
          <ScrollReveal>
            <h2 className="section-heading">Blog</h2>
            <p className="max-w-lg mb-12 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Thoughts on software engineering, spatial computing, AI, and open-source development.
            </p>
          </ScrollReveal>
          <div className="space-y-6">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.06}>
                <BlogCard post={post} index={i} />
              </ScrollReveal>
            ))}
          </div>
          {posts.length === 0 && (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No articles yet. Check back soon!</p>
          )}
        </section>
      </div>
    </div>
  )
}

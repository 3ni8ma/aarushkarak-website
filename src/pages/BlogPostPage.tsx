import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SEOHead } from '../components/seo/SEOHead'
import { getPostBySlug, getAllPosts } from '../content/blog'
import { Calendar, ArrowLeft } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import type { Components } from 'react-markdown'

const markdownComponents: Components = {
  h2: ({ children, ...props }) => (
    <h2 className="text-xl font-semibold mt-10 mb-4 pb-2" style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }} {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-lg font-semibold mt-8 mb-3" style={{ color: 'var(--text-primary)' }} {...props}>{children}</h3>
  ),
  p: ({ children, ...props }) => (
    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }} {...props}>{children}</p>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }} {...props}>{children}</code>
      )
    }
    return (
      <pre className="overflow-x-auto rounded-xl p-4 mb-6 text-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
        <code className={className} {...props}>{children}</code>
      </pre>
    )
  },
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside space-y-1 mb-4 text-sm" style={{ color: 'var(--text-muted)' }} {...props}>{children}</ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside space-y-1 mb-4 text-sm" style={{ color: 'var(--text-muted)' }} {...props}>{children}</ol>
  ),
  li: ({ children, ...props }) => <li {...props}>{children}</li>,
  a: ({ href, children, ...props }) => (
    <a href={href} className="underline underline-offset-2 transition-colors" style={{ color: 'rgb(var(--color-primary))' }} {...props}>{children}</a>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-2 pl-4 py-2 mb-4 text-sm italic" style={{ borderColor: 'rgb(var(--color-primary))', color: 'var(--text-muted)' }} {...props}>{children}</blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse" {...props}>{children}</table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="text-left p-2 font-medium" style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }} {...props}>{children}</th>
  ),
  td: ({ children, ...props }) => (
    <td className="p-2" style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }} {...props}>{children}</td>
  ),
  hr: (props) => <hr className="my-8" style={{ borderColor: 'var(--border-subtle)' }} {...props} />,
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="relative w-full px-6 lg:px-10 page-container">
        <SEOHead title="Post Not Found" />
        <ScrollReveal>
          <span className="tag">Blog</span>
          <h2 className="section-heading mb-4">Post Not Found</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary !py-2 !px-5 text-xs">
            <ArrowLeft size={13} /> Back to blog
          </Link>
        </ScrollReveal>
      </div>
    )
  }

  const relatedPosts = getAllPosts().filter(p => p.slug !== post.slug && p.tags.some(t => post.tags.includes(t))).slice(0, 2)

  return (
    <div className="relative">
      <SEOHead path={`/blog/${post.slug}`} title={post.title} description={post.excerpt} />
      <div className="relative z-10 w-full px-6 lg:px-10 page-container">
        <article className="max-w-4xl">
          <ScrollReveal>
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider mb-8 transition-colors" style={{ color: 'var(--text-muted)' }}>
              <ArrowLeft size={12} /> Back to Blog
            </Link>
            <h1 className="section-heading !text-2xl sm:!text-3xl mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                <Calendar size={13} />
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(t => (
                  <span key={t} className="tag text-[11px]">{t}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="card-minimal">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {post.content}
              </ReactMarkdown>
            </div>
          </ScrollReveal>
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-10" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <h3 className="section-heading mb-6">Related Articles</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedPosts.map(rp => (
                  <Link key={rp.slug} to={`/blog/${rp.slug}`} className="card-minimal block !p-5">
                    <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{rp.title}</h4>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{rp.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

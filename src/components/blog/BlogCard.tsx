import { Link } from "react-router-dom";
import { Calendar, Tag } from "lucide-react";
import type { BlogPost } from "../../content/blog";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="card-minimal group block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-48 shrink-0 overflow-hidden rounded-xl">
          <div
            className="h-32 sm:h-full min-h-[128px] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${post.image})` }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(var(--color-primary), 0.08)",
                    color: "rgb(var(--color-primary))",
                  }}
                >
                  <Tag size={10} />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <h3
            className="text-lg font-semibold mb-2 transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {post.excerpt}
          </p>
          <div
            className="mt-3 text-xs font-medium transition-colors"
            style={{ color: "rgb(var(--color-primary))" }}
          >
            Read more →
          </div>
        </div>
      </div>
    </Link>
  );
}

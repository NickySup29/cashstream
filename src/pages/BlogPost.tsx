import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { getPostBySlug, PostData } from '../utils/markdown';
import SEO from '../components/SEO';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
        <p className="text-xl text-slate-600 mb-8">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <SEO 
        title={`${post.title} | CashStream Advisors`}
        description={post.seoDescription || post.content.slice(0, 150)}
        url={`https://cashstreamadvisors.com/blog/${post.slug}`}
        type="article"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blog" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-12 text-slate-500 border-b border-slate-200 pb-8">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {new Date(post.datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <div className="prose prose-lg prose-blue max-w-none text-slate-700">
            <ReactMarkdown remarkPlugins={[remarkBreaks]}>{post.content}</ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

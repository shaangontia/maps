import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import type { MarkdownPopupProps } from '@/types';
import 'highlight.js/styles/github.css';

export default function MarkdownPopup({ marker, onClose }: MarkdownPopupProps) {
  return (
    <div className="markdown-popup">
      <button 
        className="close-button"
        onClick={onClose}
        aria-label="Close popup"
      >
        ×
      </button>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          h1: ({ children }) => <h1 style={{ color: '#333', fontSize: '1.5em' }}>{children}</h1>,
          h2: ({ children }) => <h2 style={{ color: '#555', fontSize: '1.3em' }}>{children}</h2>,
          h3: ({ children }) => <h3 style={{ color: '#666', fontSize: '1.1em' }}>{children}</h3>,
          p: ({ children }) => <p style={{ color: '#333', lineHeight: '1.5' }}>{children}</p>,
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '2px 4px', 
                borderRadius: '3px',
                color: '#d63384'
              }}>
                {children}
              </code>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote style={{
              borderLeft: '4px solid #ddd',
              paddingLeft: '16px',
              margin: '16px 0',
              fontStyle: 'italic',
              color: '#666'
            }}>
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul style={{ paddingLeft: '20px', color: '#333' }}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol style={{ paddingLeft: '20px', color: '#333' }}>{children}</ol>
          ),
        }}
      >
        {marker.content}
      </ReactMarkdown>
    </div>
  );
}

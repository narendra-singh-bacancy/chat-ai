import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageContentProps {
  content: string;
  isLoading?: boolean;
}

export function MessageContent({ content, isLoading }: MessageContentProps) {
  if (isLoading && !content) {
    return (
      <span className="typing-indicator">
        <span></span><span></span><span></span>
      </span>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p>{children}</p>,
        ul: ({ children }) => <ul>{children}</ul>,
        ol: ({ children }) => <ol>{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong>{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        code: ({ inline, children, ...props }) => {
          return inline ? (
            <code {...props}>{children}</code>
          ) : (
            <pre>
              <code {...props}>{children}</code>
            </pre>
          );
        },
        h1: ({ children }) => <h1>{children}</h1>,
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        blockquote: ({ children }) => <blockquote>{children}</blockquote>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}


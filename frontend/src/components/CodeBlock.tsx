import React, { useState } from 'react';

interface CodeBlockProps {
  children: string | React.ReactNode;
  language?: string;
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Convert children to string if it's an array
  const codeText = Array.isArray(children) ? children.join('') : String(children);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="code-block-wrapper">
      {language && (
        <div className="code-block-header">
          <span className="code-block-language">{language}</span>
          <button
            onClick={handleCopy}
            className="code-block-copy-button"
            aria-label="Copy code"
            title="Copy to clipboard"
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 2a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V2zm2-1a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1H6zM2 5a1 1 0 011-1h1a1 1 0 010 2H3a1 1 0 01-1-1zm0 3a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm0 3a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      )}
      {!language && (
        <button
          onClick={handleCopy}
          className="code-block-copy-button-standalone"
          aria-label="Copy code"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 2a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V2zm2-1a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1H6zM2 5a1 1 0 011-1h1a1 1 0 010 2H3a1 1 0 01-1-1zm0 3a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm0 3a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      )}
      <pre>
        <code>{codeText}</code>
      </pre>
    </div>
  );
}


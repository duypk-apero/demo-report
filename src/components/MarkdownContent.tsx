import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <div className="markdown-content p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
      <article className="prose dark:prose-invert lg:prose-lg prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
            a: ({ node, ...props }) => <a className="text-indigo-600 dark:text-indigo-400 hover:underline" {...props} />,
            ul: ({ node, ...props }) => <ul className="my-4 list-disc list-inside" {...props} />,
            ol: ({ node, ...props }) => <ol className="my-4 list-decimal list-inside" {...props} />,
            code: ({ node, inline, ...props }) => 
              inline 
                ? <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm" {...props} />
                : <code className="block bg-gray-800 dark:bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto my-4 text-sm" {...props} />,
            pre: ({ node, ...props }) => <pre className="bg-transparent p-0" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default MarkdownContent; 
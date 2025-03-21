import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import MarkdownContent from '@/components/MarkdownContent';
import { getMarkdownFileByName, getMarkdownFiles } from '@/utils/fileHelper';
import { MarkdownFile } from '@/types';

interface ViewProps {
  file: MarkdownFile | null;
  allFiles: MarkdownFile[];
}

export default function View({ file, allFiles }: ViewProps) {
  const router = useRouter();

  // If file not found, show a message
  if (!file) {
    return (
      <Layout title="File Not Found">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">File Not Found</h2>
          <p className="mb-6">The requested markdown file could not be found.</p>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 underline">
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${file.name} - Markdown Viewer`}>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Sidebar with file list */}
        <div className="w-full lg:w-1/4 mb-6 lg:mb-0 lg:pr-6">
          <div className="sidebar bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Files</h3>
            <ul className="space-y-2">
              {allFiles.map((f) => (
                <li key={f.path}>
                  <Link
                    href={`/view/${encodeURIComponent(f.path)}`}
                    className={`block p-2 rounded ${
                      f.path === file.path
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-medium'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {f.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full lg:w-3/4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{file.name}</h2>
            <Link href="/" className="text-indigo-600 hover:text-indigo-800">
              Back to All Files
            </Link>
          </div>
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
            <p>Last modified: {file.lastModified}</p>
            <p>Size: {file.size}</p>
          </div>
          <MarkdownContent content={file.content} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = getMarkdownFiles();
  
  const paths = files.map((file) => ({
    params: { filename: file.path },
  }));
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { filename } = params || {};
  
  if (!filename || typeof filename !== 'string') {
    return {
      props: {
        file: null,
        allFiles: getMarkdownFiles(),
      }
    };
  }
  
  const file = getMarkdownFileByName(filename);
  const allFiles = getMarkdownFiles();
  
  return {
    props: {
      file,
      allFiles,
    }
  };
}; 
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
  
  // Format display name
  const getDisplayName = (name: string) => name.replace(/\.md$/, '').replace(/_/g, ' ');

  // If file not found, show a message
  if (!file) {
    return (
      <Layout title="File Not Found">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md mx-auto">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-red-600 mb-4">File Not Found</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">The requested markdown file could not be found.</p>
            <Link href="/" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Return to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${getDisplayName(file.name)} - Markdown Viewer`}>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Sidebar with file list */}
        <div className="w-full lg:w-1/4 mb-6 lg:mb-0 lg:pr-6">
          <div className="sidebar bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-5 sticky top-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Documents</h3>
              <Link href="/" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Files
              </Link>
            </div>
            
            <div className="space-y-1">
              {allFiles.map((f) => (
                <Link
                  key={f.path}
                  href={`/view/${encodeURIComponent(f.path)}`}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    f.path === file.path
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-medium'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="truncate capitalize">{getDisplayName(f.name)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize mb-3">
              {getDisplayName(file.name)}
            </h2>
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Modified: {file.lastModified}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                <span>Size: {file.size}</span>
              </div>
            </div>
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
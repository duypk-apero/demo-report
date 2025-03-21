import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import FileCard from '@/components/FileCard';
import { getMarkdownFiles } from '@/utils/fileHelper';
import { MarkdownFile } from '@/types';

interface HomeProps {
  files: MarkdownFile[];
}

export default function Home({ files }: HomeProps) {
  const router = useRouter();

  return (
    <Layout title="Markdown Viewer - Home">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 mb-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Document Viewer</h1>
            <p className="text-lg opacity-90 mb-6">
              A modern, clean interface for viewing and navigating your markdown documents.
              Select any document below to view its detailed contents.
            </p>
            <div className="flex items-center text-indigo-100">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Currently displaying {files.length} documents</span>
            </div>
          </div>
        </div>
        
        {/* Document list */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Documents</h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {files.length} Documents
            </div>
          </div>
        
          {files.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg">No markdown files found.</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Add .md files to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file) => (
                <FileCard key={file.path} file={file} />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Built with Next.js, TailwindCSS, and React-Markdown</p>
          <p className="mt-1">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const files = getMarkdownFiles();
  
  return {
    props: {
      files,
    },
  };
}; 
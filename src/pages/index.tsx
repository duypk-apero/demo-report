import { GetStaticProps } from 'next';
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Markdown Files</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Select a file to view its content</p>
        </div>
        
        {files.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No markdown files found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <FileCard key={file.path} file={file} />
            ))}
          </div>
        )}
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
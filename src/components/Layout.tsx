import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Markdown Viewer' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A simple markdown file viewer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen">
        <header className="bg-indigo-600 shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-white">Markdown Viewer</h1>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
            <p>Markdown Viewer - View your markdown files with ease</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout; 
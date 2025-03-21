import React from 'react';
import Link from 'next/link';
import { MarkdownFile } from '../types';

interface FileCardProps {
  file: MarkdownFile;
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  return (
    <Link href={`/view/${encodeURIComponent(file.path)}`} passHref>
      <div className="file-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer">
        <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2 truncate">
          {file.name}
        </h3>
        <div className="flex flex-col text-sm text-gray-600 dark:text-gray-300">
          <span>Size: {file.size}</span>
          <span>Last modified: {file.lastModified}</span>
        </div>
      </div>
    </Link>
  );
};

export default FileCard; 
import React from 'react';

const TemplateUI = () => (
  <div className='h-full flex flex-col justify-center items-center text-white p-6'>
    <div className='max-w-xl w-full text-left'>
      <h2 className='text-2xl font-bold text-indigo-400 mb-4'>
        Chunking Logic
      </h2>
      <ul className='space-y-2 text-gray-800 text-base'>
        <li>1. Each paragraph needs to be a separate chunk.</li>
        <li>
          2. All headings, subheadings (up to 10 levels) should be repeated for
          each chunk to maintain context.
        </li>
        <li>
          3. Links in paragraphs should be stored separately in the references
          table with document and chunk reference.
        </li>
        <li>
          4. Tables: Each row should become a separate chunk, including its
          headers and subheaders.
        </li>
      </ul>
    </div>
  </div>
);

export default TemplateUI;

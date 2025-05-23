import React from 'react';
import TemplateUI from './TemplateUI';

const Document = ({ chunks }) => {
  const renderChunkContent = (chunk) => {
    const { chunk_type, content } = chunk;

    switch (chunk_type) {
      case 'paragraph':
        return (
          <p className='whitespace-pre-wrap break-words text-base'>{content}</p>
        );

      case 'code':
        return (
          <pre className='bg-gray-900 text-green-300 p-3 rounded-md overflow-x-auto text-sm'>
            <code>{content}</code>
          </pre>
        );

      case 'table':
        const rows = content.split('\n');
        const tableData = rows.map((row) => row.split(/[:,|]/));
        return (
          <div className='overflow-x-auto'>
            <table className='table-auto w-full text-left border-collapse border border-gray-600'>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className='border-b border-gray-600'>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className='px-4 py-2'>
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'heading':
        return (
          <h2 className='text-2xl font-bold text-indigo-400'>{content}</h2>
        );

      default:
        return (
          <p className='whitespace-pre-wrap break-words text-base'>{content}</p>
        );
    }
  };

  const renderHeadings = (headings) => {
    return Object.entries(headings).map(([level, text]) => {
      const size =
        level === 'h1' ? 'text-2xl' : level === 'h2' ? 'text-xl' : 'text-lg';
      return (
        <div key={level} className={`${size} font-semibold text-indigo-300`}>
          {text}
        </div>
      );
    });
  };

  return (
    <div className='space-y-4 p-4 overflow-y-auto h-full'>
      {chunks?.length === 0 ? (
        <TemplateUI />
      ) : (
        chunks?.map((chunk, index) => (
          <div
            key={chunk.id}
            className='relative bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700'
          >
            {/* Chunk Number */}
            <span className='absolute top-2 right-4 text-sm text-gray-400'>
              Chunk {index + 1}
            </span>

            {/* Render Headings */}
            {chunk.headings && Object.keys(chunk.headings).length > 0 && (
              <div className='mb-2'>{renderHeadings(chunk.headings)}</div>
            )}

            {/* Render Content by Type */}
            {renderChunkContent(chunk)}
          </div>
        ))
      )}
    </div>
  );
};

export default Document;

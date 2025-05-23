export const formatFileName = (filePath) => {
  // Extract filename from path
  const fileNameWithExt = filePath.split('/').pop(); // 'new.md'
  // Remove extension
  const fileName = fileNameWithExt.split('.').slice(0, -1).join('.'); // 'new'
  // Capitalize first letter
  return fileName.charAt(0).toUpperCase() + fileName.slice(1);
};

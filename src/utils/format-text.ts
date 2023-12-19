export const formatText = (text: string | undefined, length: number) => {
  if (text) {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  }
  return 'No data for this article!';
};

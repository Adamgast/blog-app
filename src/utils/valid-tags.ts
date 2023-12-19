export const validTags = (tags: { name: string }[]) => {
  const tagList = tags.map((tag) => tag.name);
  const isValid = !tagList.filter((tag, i, arr) => arr.indexOf(tag) !== i).length;
  if (isValid) {
    return tagList;
  }
  return 'You need to delete all duplicate tags for submit!';
};

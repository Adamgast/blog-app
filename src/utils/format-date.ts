import { format } from 'date-fns';

export const formatDate = (date: string | undefined) => {
  if (date) {
    return format(new Date(date), '	MMMMPP');
  }
  return 'no date';
};

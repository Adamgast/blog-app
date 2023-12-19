export interface ArticleFormValues {
  title: string;
  description: string;
  body: string;
  tags?: { name: string }[] | [];
}

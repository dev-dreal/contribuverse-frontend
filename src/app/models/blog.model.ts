export interface BlogModel {
  title: string;
  shortDescription: string;
  longDescription?: string;
  content?: string;
  image: string;
  route: string;
}

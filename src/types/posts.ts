export interface Post {
  _id?: any;
  id: number;
  title: string;
  content: string;
  author?: {
    id: number;
    name: string;
  };
}

export interface LearningLog {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string; // APIからは文字列（ISO形式）で届くためstringにします
}
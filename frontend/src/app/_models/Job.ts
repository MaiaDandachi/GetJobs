export interface Job {
  id: string;
  title: string;
  description: string;
  clientId: string;
  status: string;
  freelancerId?: string;
  client?: {
    username: string;
    email: string;
    id: string;
  };
  freelancer?: {
    username: string;
    email: string;
    id: string;
  };
}

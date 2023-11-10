export default interface Actor {
  page: number;
  results: {
    adult: boolean;
    gender: number;
    id: number;
    name: string;
    original_name: string;
    profile_path: string;
  }[];
}

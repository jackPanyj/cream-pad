import { create } from "zustand";

interface ProjectDetail {
  id: string;
  name: string;
  token_address: string;
  token_name: string;
  token_symbol: string;
  token_icon: string;
  chain: string;
  social: {
    type: string;
    account: string;
  }[];
  FDV: number;
  cur_round: number;
  total_round: number;
  remaining_token: number;
  next_auction: number;
  remaining_token_percent: number;
  status: "open" | "closed";
}

interface ProjectDetailState {
  projectDetail: ProjectDetail | null;
  setProjectDetail: (projectDetail: ProjectDetail) => void;
}

export const useProjectDetail = create<ProjectDetailState>((set) => ({
  projectDetail: null,
  setProjectDetail: (projectDetail: ProjectDetail) => set({ projectDetail })
}));

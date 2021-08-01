import { Student } from 'models';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  hightMarkCount: number;
  lowMarkCount: number;
}

export interface RankingCity {
  id: string;
  name: string;
  rankings: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudents: Student[];
  lowestStudents: Student[];
  rankingByCitys: RankingCity[];
}

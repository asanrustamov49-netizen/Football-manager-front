export interface ITeamBody {
  name: string;
  country: string;
  coach: string;
  logo: string;
}

export interface IGetTeamResponse {
  message: string;
  data: ITeamResult[];
}

export interface ITeamNewBody {
  body: ITeamBody;
  id: number;
}

export interface IGetOneTeamResponse {
  message: string;
  data: ITeamResult;
}

export interface ITeamResult {
  id: number;
  name: string;
  country: string;
  coach: string;
  logo: string;
  players_count: number;
}

export interface IPlayerBody {
  name: string;
  age: number;
  image: string;
  salary: number;
  team_id: number | null;
}

export interface IGetPlayerResponse {
  message: string;
  data: IPlayerResult[];
}

export interface IPlayerNewBody {
  body: IPlayerBody;
  id: number;
}

export interface IGetOnePlayerResponse {
  message: string;
  data: IPlayerResult;
}

export interface IPlayerResult {
  id: number;
  name: string;
  age: number;
  image: string;
  salary: number;
  teamname: string;
  coach: string;
  country: string;
  team_id: number;
  logo: string;
}

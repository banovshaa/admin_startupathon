export interface CompleterType {
  _id: number | string;
  firstName: string;
  lastName: string;
  position: string;
  linkedInUrl: string;
  fundingAmount: number;
  projectName: string;
  profilePicture: string;
  description: string;
}

export interface ChallengeType {
  _id: number | string;
  title: string;
  fundingAmount: string;
  deadline: string;
  image: string;
  description: string;
  isVisible: boolean;
}

export interface FounderType {
  _id: number | string;
  firstName: string;
  lastName: string;
  position: string;
  linkedInUrl: string;
  profilePicture: string;
  description: string;
}

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
}

export type SessionData = {
  token: string;
};

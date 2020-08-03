import { FdzColourModel } from './FdzColourModel';

export interface FdzFundModel {
  id: string;
  colour: FdzColourModel;
  contributions?: Array<FdzFundContributionModel>;
  current: number;
  name: string;
  target: number;
}

export interface FdzFundContributionModel {
  date: string;
  name: string;
  amount: number;
}

import { CardValue } from "./card.interface";
export interface IBaseRule {
  title: string;
  description: string;
}
export interface IExampleRule extends IBaseRule {
  example?: string;
}

export interface IWarningRule extends IBaseRule {
  isWarning: boolean;
}

export type GameRules = Partial<Record<CardValue, IBaseRule>>;
export interface IGameRulesWithDescription {
  title: string;
  about: string;
  description: string;
  rules: GameRules;
}

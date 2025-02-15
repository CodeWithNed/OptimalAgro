export interface SoilData {
  nitrogen: number;
  phosphorous: number;
  potassium: number;
  temperature: number;
  humidity: number;
  pH: number;
  rainfall: number;
  landCondition: LandCondition;
  area: number;
}

export type LandCondition =
  | 'paddy'
  | 'chena'
  | 'plantation'
  | 'homeGarden'
  | 'highland'
  | 'irrigated'
  | 'marshy';

export const landConditionLabels: Record<LandCondition, string> = {
  paddy: 'Paddy Lands (Rice Fields)',
  chena: 'Chena Lands (Shifting Cultivation)',
  plantation: 'Plantation Lands',
  homeGarden: 'Home Gardens',
  highland: 'Highland Crop Lands',
  irrigated: 'Irrigated Lands',
  marshy: 'Marshy & Wetland Agriculture',
};
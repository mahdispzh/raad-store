// satisfaction.utils.ts
import texts from "@/src/shared/constants/texts/texts.json";
import { SatisfactionItem } from "@/src/shared/ui/satisfaction-chart/satisfaction-chart.types";

export interface SatisfactionCalculations {
  totalVotes: number;
  satisfactionData: SatisfactionItem[];
  overallPercentage: number;
  fromTotalText: string;
  formattedPercentage: string;
}

export function calculateSatisfactionData(): SatisfactionCalculations {
  const levels = texts.dashboard.customerSatisfaction.levels;

  // Calculate total votes
  const totalVotes =
    levels.verySatisfied.count +
    levels.satisfied.count +
    levels.noOpinion.count +
    levels.dissatisfied.count +
    levels.veryDissatisfied.count;

  // Build data with calculated percentages
  const satisfactionData: SatisfactionItem[] = [
    {
      name: levels.verySatisfied.name,
      value: Math.round((levels.verySatisfied.count / totalVotes) * 100),
      percent: ((levels.verySatisfied.count / totalVotes) * 100).toFixed(1),
    },
    {
      name: levels.satisfied.name,
      value: Math.round((levels.satisfied.count / totalVotes) * 100),
      percent: ((levels.satisfied.count / totalVotes) * 100).toFixed(1),
    },
    {
      name: levels.noOpinion.name,
      value: Math.round((levels.noOpinion.count / totalVotes) * 100),
      percent: ((levels.noOpinion.count / totalVotes) * 100).toFixed(1),
    },
    {
      name: levels.dissatisfied.name,
      value: Math.round((levels.dissatisfied.count / totalVotes) * 100),
      percent: ((levels.dissatisfied.count / totalVotes) * 100).toFixed(1),
    },
    {
      name: levels.veryDissatisfied.name,
      value: Math.round((levels.veryDissatisfied.count / totalVotes) * 100),
      percent: ((levels.veryDissatisfied.count / totalVotes) * 100).toFixed(1),
    },
  ];

  // Calculate total satisfaction (very satisfied + satisfied)
  const satisfiedVotes = levels.verySatisfied.count + levels.satisfied.count;

  // Calculate overall satisfaction percentage
  const overallPercentageValue = (satisfiedVotes / totalVotes) * 100;

  // Format with one decimal place
  const formattedPercentage = `${overallPercentageValue.toFixed(1)}%`;

  // Build "from X votes" text
  const fromTotalText = `${texts.dashboard.customerSatisfaction.fromVotes} ${totalVotes} ${texts.dashboard.customerSatisfaction.votes}`;

  return {
    totalVotes,
    satisfactionData,
    overallPercentage: Number(overallPercentageValue.toFixed(1)),
    fromTotalText,
    formattedPercentage,
  };
}

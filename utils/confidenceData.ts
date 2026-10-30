type Confidence = {
  confidence: "High" | "Medium" | "Low";
  confidenceDescription: string;
  pills: number;
}

export function getConfidenceData(score: number): Confidence {
  switch (score) {
    case 4:
      return {
        confidence: "High",
        confidenceDescription: "Enough public record — in size, span and staying power — that the band rests on a real sample rather than one lucky repo.",
        pills: 3
      }
    case 3:
      return {
        confidence: "Medium",
        confidenceDescription: "A real but narrow record. The band is readable, though it comes from a small sample.",
        pills: 2
      }
    default:
      return {
        confidence: "Low",
        confidenceDescription: "Very little public record to sample. Whatever the band says, it rests on almost nothing.",
        pills: 1
      }
  }
}
export interface AiVisibilityData {
  title: string;
  summary: string;
  services?: string[];
  location?: string;
  entities?: string[];
}

export function buildAiVisibilitySummary({ title, summary, services, location, entities }: AiVisibilityData) {
  return {
    title,
    summary,
    services: services ?? ["[Service]"],
    location: location ?? "[Location]",
    entities: entities ?? ["[Entity]"],
  };
}

export interface SchemaDefinition {
  type: string;
  data: Record<string, unknown>;
}

export function buildSchema({ type, data }: SchemaDefinition) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };
}

export interface LocalSeoData {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  serviceArea?: string[];
  entities?: string[];
}

export function buildLocalSeo(data: LocalSeoData) {
  return {
    name: data.name ?? "[Business Name]",
    address: data.address ?? "[Address]",
    addressLocality: data.city ?? "[City]",
    addressRegion: data.state ?? "[State]",
    postalCode: data.postalCode ?? "[Postal Code]",
    telephone: data.phone ?? "[Phone Number]",
    areaServed: data.serviceArea ?? ["[Service Area]"],
    entities: data.entities ?? ["[Entity]"],
  };
}

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export function createContactFormDefaults(): ContactFormValues {
  return {
    name: "",
    email: "",
    message: "",
  };
}

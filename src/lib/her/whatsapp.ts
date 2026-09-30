import { HER_WHATSAPP_NUMBER } from "./demo-data";

const GENERIC_MESSAGE = "Hi HER! I'm interested in booking an appointment at HER Salon & Wellness at Happy-Park. I'd like some help choosing the right service.";

export function createHerWhatsappUrl(message = GENERIC_MESSAGE) {
  return `https://wa.me/${HER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createHerJourneyWhatsappUrl(experience?: string, date?: string, time?: string) {
  const timing = date && time ? ` I was looking at ${date} around ${time}.` : "";
  return createHerWhatsappUrl(`Hi HER! I'm interested in the ${experience ?? "HER Salon & Wellness"} experience.${timing} Could you help me confirm availability?`);
}

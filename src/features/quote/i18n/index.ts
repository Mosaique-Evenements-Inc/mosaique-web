import type { Locale, LocaleDictionaries } from "@/core/i18n";

export interface QuoteTranslations {
  eyebrow: string;
  title: string;
  mobileTitle: string;
  basicStep: string;
  additionalStep: string;
  contact: string;
  fullName: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  eventInfo: string;
  serviceInterest: string;
  eventType: string;
  selectOption: string;
  eventDate: string;
  selectDate: string;
  dateOptional: string;
  noDate: string;
  guestRange: string;
  requiredFullName: string;
  requiredEmail: string;
  invalidEmail: string;
  requiredPhone: string;
  invalidPhone: string;
  genericInvalid: string;
  requiredService: string;
  requiredEventType: string;
  requiredGuestRange: string;
  reviewFinal: string;
  reviewIntro: string;
  edit: string;
  contactInfo: string;
  eventInfoSr: string;
  name: string;
  language: string;
  event: string;
  service: string;
  date: string;
  guests: string;
  reviewNotice: string;
  back: string;
  backToReview: string;
  backToForm: string;
  saveChanges: string;
  review: string;
  submit: string;
  submitting: string;
  submitStatus: string;
  submissionSuccess: string;
  submissionThanks: string;
  closeConfirmation: string;
  submissionError: string;
  reviewDateMissing: string;
  dateNotIndicated: string;
  previousMonth: string;
  nextMonth: string;
  weekdays: readonly string[];
  quoteForm: string;
  pendingMedia: string;
  metadataDescription: string;
  serviceGuidance: string;
  eventTypes: readonly { value: string; label: string }[];
  guestRanges: readonly { value: string; label: string }[];
  preferredLanguages: readonly { value: string; label: string }[];
  venueOptions: readonly { value: string; label: string }[];
  budgets: readonly { value: string; label: string }[];
}

const eventTypeValues = [
  "Boda",
  "Cumpleaños",
  "Celebración privada",
  "Evento corporativo",
  "Activación / experiencia de marca",
  "Evento para venue",
  "Otro",
] as const;

const guestRangeValues = [
  "Menos de 25",
  "25–50",
  "51–100",
  "101–200",
  "200+",
  "Aún no lo sé",
] as const;
const budgetValues = [
  "Menos de $2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000–$20,000",
  "$20,000+",
  "Aún no tengo un presupuesto definido",
] as const;

const makeOptions = (values: readonly string[], labels: readonly string[]) =>
  values.map((value, index) => ({ value, label: labels[index] ?? value }));

export const quoteTranslations = {
  es: {
    eyebrow: "Solicitud de cotización",
    title: "Cuéntanos sobre tu evento",
    mobileTitle: "Cotizar un evento",
    basicStep: "Información básica",
    additionalStep: "Información adicional",
    contact: "Contacto",
    fullName: "Nombre completo",
    email: "Email",
    phone: "Teléfono",
    preferredLanguage: "Idioma de preferencia",
    eventInfo: "Información del evento",
    serviceInterest: "Servicio de interés",
    eventType: "Tipo de evento",
    selectOption: "Selecciona una opción",
    eventDate: "Fecha del evento",
    selectDate: "Seleccionar fecha",
    dateOptional: "Opcional si todavía no está definida.",
    noDate: "Aún no tengo fecha",
    guestRange: "Número aproximado de invitados",
    requiredFullName: "Ingresa tu nombre completo.",
    requiredEmail: "Ingresa tu email.",
    invalidEmail: "Ingresa un email válido.",
    requiredPhone: "Ingresa tu teléfono.",
    invalidPhone: "Ingresa un teléfono válido.",
    genericInvalid: "Revisa este campo.",
    requiredService: "Selecciona un servicio.",
    requiredEventType: "Selecciona el tipo de evento.",
    requiredGuestRange: "Selecciona un rango de invitados.",
    reviewFinal: "Revisión final",
    reviewIntro:
      "Verifica los detalles antes de preparar tu solicitud. Puedes editar cualquier sección.",
    edit: "Editar",
    contactInfo: "información de contacto",
    eventInfoSr: "información del evento",
    name: "Nombre",
    language: "Idioma",
    event: "Tu evento",
    service: "Servicio",
    date: "Fecha",
    guests: "Invitados",
    reviewNotice: "Al enviar, confirmas que la información anterior es correcta.",
    back: "Atrás",
    backToReview: "Volver a revisión",
    backToForm: "Volver al formulario",
    saveChanges: "Guardar cambios",
    review: "Revisar información",
    submit: "Enviar solicitud",
    submitting: "Enviando…",
    submitStatus: "Enviando tu solicitud.",
    submissionSuccess: "Solicitud enviada correctamente.",
    submissionThanks: "Gracias. Nos pondremos en contacto contigo pronto.",
    closeConfirmation: "Cerrar confirmación",
    submissionError: "No fue posible enviar la solicitud. Inténtalo nuevamente.",
    reviewDateMissing: "Aún no definida",
    dateNotIndicated: "No indicada",
    previousMonth: "Mes anterior",
    nextMonth: "Mes siguiente",
    weekdays: ["L", "M", "M", "J", "V", "S", "D"],
    quoteForm: "Formulario de cotización",
    pendingMedia: "Media pendiente",
    metadataDescription:
      "Empresa integral de eventos en Montréal especializada en producción, organización, montaje, logística, alquiler de mobiliario y creación de experiencias en alianza con venues.",
    serviceGuidance: "No estoy seguro / necesito orientación",
    eventTypes: makeOptions(eventTypeValues, eventTypeValues),
    guestRanges: makeOptions(guestRangeValues, guestRangeValues),
    preferredLanguages: [
      { value: "es", label: "Español" },
      { value: "fr", label: "Francés" },
      { value: "en", label: "Inglés" },
    ],
    venueOptions: [
      { value: "yes", label: "Sí" },
      { value: "no", label: "No" },
      { value: "searching", label: "Estoy buscando" },
    ],
    budgets: makeOptions(budgetValues, budgetValues),
  },
  en: {
    eyebrow: "Quote request",
    title: "Tell us about your event",
    mobileTitle: "Request a quote",
    basicStep: "Basic information",
    additionalStep: "Additional information",
    contact: "Contact",
    fullName: "Full name",
    email: "Email",
    phone: "Phone",
    preferredLanguage: "Preferred language",
    eventInfo: "Event information",
    serviceInterest: "Service of interest",
    eventType: "Event type",
    selectOption: "Select an option",
    eventDate: "Event date",
    selectDate: "Select a date",
    dateOptional: "Optional if it is not defined yet.",
    noDate: "I do not have a date yet",
    guestRange: "Approximate number of guests",
    requiredFullName: "Enter your full name.",
    requiredEmail: "Enter your email.",
    invalidEmail: "Enter a valid email.",
    requiredPhone: "Enter your phone number.",
    invalidPhone: "Enter a valid phone number.",
    genericInvalid: "Review this field.",
    requiredService: "Select a service.",
    requiredEventType: "Select the event type.",
    requiredGuestRange: "Select a guest range.",
    reviewFinal: "Final review",
    reviewIntro: "Check the details before preparing your request. You can edit any section.",
    edit: "Edit",
    contactInfo: "contact information",
    eventInfoSr: "event information",
    name: "Name",
    language: "Language",
    event: "Your event",
    service: "Service",
    date: "Date",
    guests: "Guests",
    reviewNotice: "By submitting, you confirm that the information above is correct.",
    back: "Back",
    backToReview: "Back to review",
    backToForm: "Back to form",
    saveChanges: "Save changes",
    review: "Review information",
    submit: "Send request",
    submitting: "Sending…",
    submitStatus: "Sending your request.",
    submissionSuccess: "Request sent successfully.",
    submissionThanks: "Thank you. We will be in touch soon.",
    closeConfirmation: "Close confirmation",
    submissionError: "We could not send the request. Please try again.",
    reviewDateMissing: "Not yet defined",
    dateNotIndicated: "Not indicated",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    weekdays: ["M", "T", "W", "T", "F", "S", "S"],
    quoteForm: "Quote request form",
    pendingMedia: "Media pending",
    metadataDescription:
      "Full-service event company in Montréal specializing in production, planning, setup, logistics, furniture rental, and venue partnerships.",
    serviceGuidance: "I am not sure / I need guidance",
    eventTypes: makeOptions(eventTypeValues, [
      "Wedding",
      "Birthday",
      "Private celebration",
      "Corporate event",
      "Brand activation / experience",
      "Venue event",
      "Other",
    ]),
    guestRanges: makeOptions(guestRangeValues, [
      "Fewer than 25",
      "25–50",
      "51–100",
      "101–200",
      "200+",
      "I do not know yet",
    ]),
    preferredLanguages: [
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
      { value: "en", label: "English" },
    ],
    venueOptions: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "searching", label: "I am looking" },
    ],
    budgets: makeOptions(budgetValues, [
      "Under $2,500",
      "$2,500–$5,000",
      "$5,000–$10,000",
      "$10,000–$20,000",
      "$20,000+",
      "I do not have a defined budget yet",
    ]),
  },
  fr: {
    eyebrow: "Demande de devis",
    title: "Parlez-nous de votre événement",
    mobileTitle: "Demander un devis",
    basicStep: "Informations de base",
    additionalStep: "Informations supplémentaires",
    contact: "Contact",
    fullName: "Nom complet",
    email: "Courriel",
    phone: "Téléphone",
    preferredLanguage: "Langue préférée",
    eventInfo: "Informations sur l’événement",
    serviceInterest: "Service d’intérêt",
    eventType: "Type d’événement",
    selectOption: "Sélectionnez une option",
    eventDate: "Date de l’événement",
    selectDate: "Sélectionner une date",
    dateOptional: "Facultatif si elle n’est pas encore définie.",
    noDate: "Je n’ai pas encore de date",
    guestRange: "Nombre approximatif d’invités",
    requiredFullName: "Entrez votre nom complet.",
    requiredEmail: "Entrez votre courriel.",
    invalidEmail: "Entrez un courriel valide.",
    requiredPhone: "Entrez votre numéro de téléphone.",
    invalidPhone: "Entrez un numéro de téléphone valide.",
    genericInvalid: "Vérifiez ce champ.",
    requiredService: "Sélectionnez un service.",
    requiredEventType: "Sélectionnez le type d’événement.",
    requiredGuestRange: "Sélectionnez une plage d’invités.",
    reviewFinal: "Révision finale",
    reviewIntro:
      "Vérifiez les détails avant de préparer votre demande. Vous pouvez modifier chaque section.",
    edit: "Modifier",
    contactInfo: "les coordonnées",
    eventInfoSr: "les informations sur l’événement",
    name: "Nom",
    language: "Langue",
    event: "Votre événement",
    service: "Service",
    date: "Date",
    guests: "Invités",
    reviewNotice:
      "En envoyant ce formulaire, vous confirmez que les informations ci-dessus sont exactes.",
    back: "Retour",
    backToReview: "Retour à la révision",
    backToForm: "Retour au formulaire",
    saveChanges: "Enregistrer les modifications",
    review: "Réviser les informations",
    submit: "Envoyer la demande",
    submitting: "Envoi…",
    submitStatus: "Envoi de votre demande.",
    submissionSuccess: "Demande envoyée avec succès.",
    submissionThanks: "Merci. Nous communiquerons avec vous sous peu.",
    closeConfirmation: "Fermer la confirmation",
    submissionError: "La demande n’a pas pu être envoyée. Veuillez réessayer.",
    reviewDateMissing: "Pas encore définie",
    dateNotIndicated: "Non indiquée",
    previousMonth: "Mois précédent",
    nextMonth: "Mois suivant",
    weekdays: ["L", "M", "M", "J", "V", "S", "D"],
    quoteForm: "Formulaire de demande de devis",
    pendingMedia: "Média à venir",
    metadataDescription:
      "Entreprise événementielle intégrée à Montréal spécialisée en production, organisation, montage, logistique, location de mobilier et expériences avec des lieux partenaires.",
    serviceGuidance: "Je ne sais pas / j’ai besoin d’accompagnement",
    eventTypes: makeOptions(eventTypeValues, [
      "Mariage",
      "Anniversaire",
      "Célébration privée",
      "Événement corporatif",
      "Activation / expérience de marque",
      "Événement pour un lieu",
      "Autre",
    ]),
    guestRanges: makeOptions(guestRangeValues, [
      "Moins de 25",
      "25–50",
      "51–100",
      "101–200",
      "200+",
      "Je ne sais pas encore",
    ]),
    preferredLanguages: [
      { value: "es", label: "Espagnol" },
      { value: "fr", label: "Français" },
      { value: "en", label: "Anglais" },
    ],
    venueOptions: [
      { value: "yes", label: "Oui" },
      { value: "no", label: "Non" },
      { value: "searching", label: "Je cherche encore" },
    ],
    budgets: makeOptions(budgetValues, [
      "Moins de 2 500 $",
      "2 500–5 000 $",
      "5 000–10 000 $",
      "10 000–20 000 $",
      "20 000 $+",
      "Je n’ai pas encore défini de budget",
    ]),
  },
} satisfies LocaleDictionaries<QuoteTranslations>;

export const getQuoteTranslations = (locale: Locale = "es") => quoteTranslations[locale];

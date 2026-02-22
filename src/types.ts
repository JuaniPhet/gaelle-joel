export type GuestGroup = "civil" | "salle-royaume" | "diner";

export interface Guest {
  slug: string;
  prenom: string;
  nom: string;
  table: string;
  groupes: GuestGroup[];
}

export interface RSVPFormData {
  presence: "oui" | "non";
  nombre: number;
  message: string;
}

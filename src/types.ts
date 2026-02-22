export type GuestGroup = "civil" | "salle-royaume" | "vh" | "diner";

export interface Guest {
  slug: string;
  prenom: string;
  nom: string;
  table?: string;
  tableVH?: string;
  tableDiner?: string;
  groupes: GuestGroup[];
}

export interface RSVPFormData {
  presence: "oui" | "non";
  nombre: number;
  message: string;
}

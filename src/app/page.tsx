import WebsiteContent from "@/components/WebsiteContent";
import { Guest } from "@/types";

export default function Home() {
  const genericGuest: Guest = {
    slug: "general",
    prenom: "",
    nom: "",
    groupes: ["civil", "salle-royaume", "vh", "diner"],
  };

  return <WebsiteContent guest={genericGuest} />;
}


import { permanentRedirect } from "next/navigation";

export default function NormativesLegacyRedirectPage() {
  permanentRedirect("/regulations");
}

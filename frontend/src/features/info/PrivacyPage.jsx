import LegalPage from "./LegalPage";
import { PRIVACY } from "./data/pages";

export default function Privacy() {
  return <LegalPage content={PRIVACY} path="/privacy" />;
}

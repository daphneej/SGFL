import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const formatDate = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    includeSeconds: true,
    locale: fr,
  });
};

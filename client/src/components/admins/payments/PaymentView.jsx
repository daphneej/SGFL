import ViewBlock from "@/components/ViewBlock";
import { formatDate } from "../../../utils";

const PaymentView = ({ payment }) => {
  return (
    <div className="grid items-start grid-cols-1 gap-8 mt-10">
      {payment?.courseId && (
        <ViewBlock label="ID Cours" value={payment?.courseId} />
      )}
      {payment?.paymentAmount && (
        <ViewBlock
          label="Montant Paiement"
          value={
            <>
              $
              <span className="text-primary">
                <span className="text-primary">{payment?.paymentAmount}</span>
              </span>{" "}
              US
            </>
          }
        />
      )}
      {payment?.paymentMethod && (
        <ViewBlock label="Méthode Paiement" value={payment?.paymentMethod} />
      )}
      {payment?.paymentStatus && (
        <ViewBlock
          label="Statut"
          value={
            payment?.paymentStatus === "SUCCEEDED" ? (
              <span className="text-success">Succès</span>
            ) : (
              <span className="text-warning">En Attente</span>
            )
          }
        />
      )}
      {payment?.userId && (
        <ViewBlock label="ID Utilisateur" value={payment?.userId} />
      )}
      {payment?.createdAt && (
        <ViewBlock
          label="Dâte Paiement"
          value={formatDate(payment?.createdAt)}
        />
      )}
    </div>
  );
};

export default PaymentView;

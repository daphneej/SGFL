import PaymentView from "@/components/admins/payments/PaymentView";
import ViewModal from "@/components/ViewModal";
import ViewHeader from "@/components/ViewHeader";

const PaymentViewModal = ({
  selectedPayment: payment,
  modalOpen,
  setModalOpen,
}) => {
  const handleSkipClick = () => {
    setModalOpen(false);
  };

  return (
    <ViewModal modalOpen={modalOpen}>
      <ViewHeader
        label="Informations Sur Le Paiement"
        handleSkipClick={handleSkipClick}
      />
      <PaymentView payment={payment} />
    </ViewModal>
  );
};
export default PaymentViewModal;

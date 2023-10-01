import { useState } from "react";

import { formatDate } from "../../../utils/index";

import Pagination from "@/components/Pagination";

import PaymentViewModal from "@/components/admins/payments/PaymentViewModal";

import { FiEye } from "react-icons/fi";

const COLUMNS = [
  { label: "ID", key: "id" },
  { label: "ID Cours", key: "courseId" },
  { label: "Montant Payé", key: "paymentAmount" },
  { label: "Méthode Paiement", key: "paymentMethod" },
  { label: "Statut Paiement", key: "paymentStatus" },
  { label: "ID Utilisateur", key: "userId" },
  { label: "Dâte Paiement", key: "createdAt" },
  { label: "Actions", key: "actions" },
];

const PaymentTable = ({ isLoadingPayments: isLoading, payments }) => {
  const itemsPerPage = 10;

  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentpayments = payments?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col justify-between flex-1 w-full gap-4 overflow-auto text-center">
      <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
        <h2 className="text-2xl font-semibold text-left">
          Liste Des Paiements
        </h2>
      </div>

      <div className="flex flex-col flex-1 gap-2 pb-4 overflow-x-auto">
        <PaymentViewModal
          selectedPayment={selectedPayment}
          modalOpen={modalViewOpen}
          setModalOpen={setModalViewOpen}
        />

        {payments?.length === 0 ? (
          <p className="mx-auto my-8 text-xl font-bold text-center text-neutral-500">
            Aucun Etudiant n'est actuellement enregistré
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            <table className="flex-1 w-full mx-auto">
              <thead className="bg-base-300">
                <tr>
                  {COLUMNS.map((column, index) => (
                    <th key={index} className="p-3 border border-base-100">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {isLoading && (
                  <tr>
                    <td className="p-2" colSpan={COLUMNS.length}>
                      <div className="loading"></div>
                    </td>
                  </tr>
                )}

                {currentpayments?.map((payment) => (
                  <tr
                    key={payment?.id}
                    className={`hover:bg-base-100 ${
                      payment?.id % 2 !== 0 ? "bg-base-300" : "bg-base-200"
                    }`}
                  >
                    <td className="p-3 border border-base-100">
                      {payment?.id}
                    </td>
                    <td className="p-3 border border-base-100">
                      {payment?.courseId}
                    </td>
                    <td className="p-3 border border-base-100">
                      $
                      <span className="text-primary">
                        {payment?.paymentAmount}
                      </span>{" "}
                      US
                    </td>
                    <td className="p-3 border border-base-100">
                      {payment?.paymentMethod}
                    </td>
                    <td className="p-3 border border-base-100">
                      {payment?.paymentStatus === "SUCCEEDED" ? (
                        <span className="text-success">Succès</span>
                      ) : (
                        <span className="text-warning">En cours</span>
                      )}
                    </td>
                    <td className="p-3 border border-base-100">
                      {payment?.userId}
                    </td>
                    <td className="p-3 border border-base-100">
                      {formatDate(payment?.createdAt)}
                    </td>
                    <td className="p-3 border border-base-100">
                      <div className="flex justify-center gap-3 mx-auto">
                        <FiEye
                          className="cursor-pointer text-primary hover:underline"
                          size={18}
                          onClick={() => {
                            setSelectedPayment(payment);
                            setModalViewOpen(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <Pagination
              contents={payments}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTable;

import { useSearchParams, Navigate } from "react-router-dom";
import { useQuery } from "react-query";

import useCourse from "../../hooks/useCourse";

const Success = () => {
  const { processStripePaymentSession } = useCourse();
  const [params] = useSearchParams();
  const sessionId = params.get("sessionId");

  const { isLoading, error } = useQuery({
    queryKey: ["session"],
    queryFn: () => processStripePaymentSession({ sessionId }),
    enabled: Boolean(sessionId),
  });

  return (
    <>
      {isLoading ? (
        "Processing Payment..."
      ) : (
        <Navigate to="/dashboard/students" />
      )}
    </>
  );
};

export default Success;

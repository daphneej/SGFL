import { useSearchParams, Navigate } from "react-router-dom";
import { useQuery } from "react-query";

import useCourse from "../../hooks/useCourse";

const Canceled = () => {
  const { cancelStripePaymentSession } = useCourse();
  const [params] = useSearchParams();
  const sessionId = params.get("sessionId");

  const { isLoading, error } = useQuery({
    queryKey: ["session"],
    queryFn: () => cancelStripePaymentSession({ sessionId }),
    enabled: Boolean(sessionId),
  });

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <div className="loading"></div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Canceled;

import { useSearchParams } from "react-router-dom";
import { useListInvitationQuery } from "../api/data/invitations.api";
import { useMemo } from "react";

const useGetPropspect = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { data, isLoading, isFetching } = useListInvitationQuery();
  const prospects = data?.prospects ?? [];

  const currentProspect = useMemo(() => {
    return prospects?.find((p) => p.invite?.some((i) => i.token === token));
  }, [prospects, token]);

  return {
    prospect: currentProspect ?? null,
    isLoading,
    token,
    isFetching,
  };
};

export default useGetPropspect;

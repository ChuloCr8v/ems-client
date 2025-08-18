import { useGetTeamQuery } from "../api/data/departments.api";

type Props = {
  teamId: string;
};

const useGetTeam = ({ teamId }: Props) => {
  const { data: team, isLoading: _gettingTeam } = useGetTeamQuery(teamId);

  return { team };
};

export default useGetTeam;

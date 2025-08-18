import type { ColumnsType } from "antd/es/table";
import React from "react";
import type { Department } from "../api/types";
import { useGetTeamQuery } from "../api/data/departments.api";

type Props = {
  teamId: string;
};

const useGetTeam = ({ teamId }: Props) => {
  const { data: team, isLoading: gettingTeam } = useGetTeamQuery(teamId);

  return { team };
};

export default useGetTeam;

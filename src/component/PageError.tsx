import { useEffect } from "react";
import type { FallbackProps } from "react-error-boundary";
import Icon from "./common/Icon";
import { SettingsError01FreeIcons } from "@hugeicons/core-free-icons";

function PageErrorContent(props: { message: string; action: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen w-screen gap-4 text-lg bg-grey-200">
      <div className="h-32 w-32 bg-red-100 rounded-full flex justify-center items-center">
        <Icon icon={SettingsError01FreeIcons} color="red" size={48} />
      </div>
      <h1 className="font-semibold text-2xl mt-4">{props.message}</h1>
      <a href="/dashboard" className="text-primary text-center -mt-2">
        Go Back to Dashboard
      </a>
    </div>
  );
}

export default function PageError(props: Partial<FallbackProps>) {
  const error = props.error;

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <PageErrorContent
      message={error?.message ?? "Something went wrong"}
      action="Go Home"
    />
  );
}

import { Spin } from "antd";

export const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-primary/30 to-green/30 relative">
      <div className="bg-white p-4 h-16 w-16 flex justify-center items-center rounded-xl shadow-xl">
        <Spin />
      </div>
    </div>
  );
};

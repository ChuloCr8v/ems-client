import { Segmented } from "antd";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  options: string[];
  setOption: Dispatch<SetStateAction<string>>;
};

const CustomSegmented = ({ options, setOption }: Props) => {
  return (
    <div className="custom-segmented-wrapper">
      <Segmented<string>
        options={options}
        onChange={(value) => setOption(value)}
      />
    </div>
  );
};

export default CustomSegmented;

import { Segmented } from "antd";

type Props = {
  options: string[];
};

const CustomSegmented = ({ options }: Props) => {
  return (
    <div>
      <Segmented<string> options={options} />
    </div>
  );
};

export default CustomSegmented;

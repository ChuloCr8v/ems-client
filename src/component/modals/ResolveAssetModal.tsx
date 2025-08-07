import { Upload03FreeIcons } from "@hugeicons/core-free-icons";
import { CustomModal } from "../common/CustomModal";
import { CheckCircleFilled } from "@ant-design/icons";



interface ResolveAssetModalProps {
    assetName: string;
    category: string;
    onCancel:()=> void;
    onSubmit:()=> void;
    loading?:boolean;
}

const ResolveAssetModal = ({
    assetName,
    category,
    onCancel,
    onSubmit,
    loading,
}: ResolveAssetModalProps) => {
  return (
    <CustomModal
    title='Resove Asset Isue'
    modalSubtitle='This employee has reported an issue with an assigned asset. Review the report and update the asset status accordingly.'
    icon={Upload03FreeIcons}
    onCancel={onCancel}
    onOk={onSubmit}
    okText='Resolve Now'
    loading={loading}
    center
    width={500}
    >
    <div className="rounded-md bg-[#ECF8EE] flex items-center p-4 gap-3 text-[#40B554] font-medium">
     <CheckCircleFilled style={{ fontSize:20}} />
     <div className="text-black">
     <div className="font-semibold">{assetName}</div>
     <div className="text-sm text-gray-500">{category}</div>
     </div>
    </div>
    </CustomModal>
  )
}

export default ResolveAssetModal
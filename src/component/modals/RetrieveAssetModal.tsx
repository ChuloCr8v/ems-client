import { Form, Input } from "antd";
import { CustomModal } from "../common/CustomModal";
import { Upload03FreeIcons } from "@hugeicons/core-free-icons";


interface RetrieveAssetModalProps {
    assetName: string;
    assetId:string;
    onCancel:()=> void
    onSubmit:(reason: string)=> void
    loading?: boolean
}

const RetrieveAssetModal = ({
    assetName,
    assetId,
    onCancel,
    onSubmit,
    loading = false,
}: RetrieveAssetModalProps) => {
    const [form] = Form.useForm()

    const handleFinish = ({reason}:{reason:string}) => {
        onSubmit(reason)
        form.resetFields()
    }

  return (
    <CustomModal
    title="Retrieve Asset"
    icon={Upload03FreeIcons}
    modalSubtitle="Use this action to confirm that this asset has been physically retrieved and is now in company possession"
    onCancel={onCancel}
    onOk={()=>form.submit()}
    okText='Confirm Retrieval'
    loading={loading}
    width={500}
    >
        <div className="border border-success/30 bg-success/5 text-success px-4 py-3 rounded-md mb-4">
         <p className="font-semibold text-sm leadin-tight">{assetName}</p>
         <p className="text-xs text-gray-500 mt-1">ID:{assetId}</p>
        </div>

        <Form form={form} layout="vertical" onFinish={handleFinish}>
         <Form.Item
         name='reason'
         label='Reason'
         rules={[{ required:true, message:'Please provide a reason'}]}
         >
            <Input placeholder="e.g misuse" />
         </Form.Item>
        </Form>

    </CustomModal>
  )
}

export default RetrieveAssetModal
import {DatePicker, Form, Input, Select } from 'antd';

import { CustomModal } from '../common/CustomModal';
import { UserAdd01FreeIcons } from '@hugeicons/core-free-icons';

const { Option } = Select

interface AssignAssetModalProps {
    onSubmit: (values: any) => void;
    onCancel: () => void;
    loading?: boolean;
}

const AssignAssetModal = ({ onSubmit, onCancel, loading }: AssignAssetModalProps) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        onSubmit(values);
        form.resetFields();
    }

    
    return (
        <CustomModal
            title='Assign Asset'
            modalSubtitle="Fill in the details below to allocate asset to this employee"
            icon={UserAdd01FreeIcons}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText='Assign Asset'
            loading={loading}
            center
            width={500}
            
            
        >
            <Form form={form} layout='vertical' onFinish={handleFinish}>
                <Form.Item name='assetName' label='Asset Name' rules={[{ required: true }]}>
                    <Select placeholder="Select asset name">
                        <Option value='hp'>HP EliteBook</Option>
                        <Option value='macbook'>MacBook</Option>
                    </Select>
                </Form.Item>

                <Form.Item name='category' label='category' rules={[{ required: true }]}>
                    <Select placeholder='Select category'>
                        <Option value='hardware'>Hardware</Option>
                        <Option value='accessory'>Accessory</Option>
                    </Select>
                </Form.Item>

                <div className='md:flex md:flex-row md:gap-4 flex flex-col'>
                    <Form.Item name='assignmentDate' label='Assignment Date' className='w-full md:w-1/2' rules={[{ required: true }]}>
                        <DatePicker format='DD-MM-YYYY' className='!w-full' />
                    </Form.Item>

                    <Form.Item name='condition' label='condition' className='w-full md:w-1/2' rules={[{ required: true }]}>
                        <Select placeholder='Select condition'>
                            <Option value='new'>New</Option>
                            <Option value='used'>Used</Option>
                            <Option value='fair'>Fair</Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item name='notes' label='Notes'>
                    <Input.TextArea rows={3} placeholder='Enter notes' />
                </Form.Item>
            </Form>


        </CustomModal>
    )
}

export default AssignAssetModal
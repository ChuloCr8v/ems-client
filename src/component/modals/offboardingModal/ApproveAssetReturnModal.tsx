import { useState } from "react"
import { CustomModal } from "../../common/CustomModal"
import { UnavailableFreeIcons } from "@hugeicons/core-free-icons"
import EmployeeCard from "../../common/EmployeeCard"
import { usePopup } from "../../../context/PopupContext"



interface Employee {
    firstName: string
    lastName: string
    employeeId: string
    profileImage?: string
}

interface ApproveAssetReturnModalProps {
    employee?: Employee
}

const ApproveAssetReturnModal = ({
    employee = {
        firstName: "Modesta",
        lastName: "Ekeh",
        employeeId: "EMP-3958",
    },
}: ApproveAssetReturnModalProps) => {
    const [loading, setLoading] = useState(false)
     const { closeModal } = usePopup();

    const handleOk = async () => {
        try {
            setLoading(true)
            console.log("Approving asset return for:", employee)
            
            await new Promise((resolve) => setTimeout(resolve, 2000)) 
            
        } catch (error) {
            console.error("Error approving asset return:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        closeModal();
    }

    return (
        <CustomModal
            title="Approve Asset Return"
            icon={UnavailableFreeIcons}
            width={500}
            okText="Confirm Approval"
            onOk={handleOk}
            onCancel={handleCancel}
            loading={loading}
            center={true}
        >
            <EmployeeCard
                description="Are you sure all assigned assets to this employee have been returned in good condition? This action will mark the asset return as complete."
                employee={employee}
            />
        </CustomModal>
    )
}

export default ApproveAssetReturnModal

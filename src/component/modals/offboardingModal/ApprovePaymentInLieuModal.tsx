import { useState } from "react";
import { CustomModal } from "../../common/CustomModal";
import { UnavailableFreeIcons } from "@hugeicons/core-free-icons";
import EmployeeCard from "../../common/EmployeeCard";
import { usePopup } from "../../../context/PopupContext";

interface   Employee {
    firstName: string;
    lastName: string;
    employeeId: string;
    profileImage?: string;
}

interface ApprovePaymentInLieuModalProps{
    employee?: Employee
}

const ApprovePaymentInLieuModal = ({
    employee = {
        firstName: "Modesta",
        lastName: "Ekeh",
        employeeId: "EMP-3958"
    },
}:ApprovePaymentInLieuModalProps) => {
    const [loading, setLoading] = useState(false)
    const { closeModal } = usePopup()

    const handleOk = async () => {
        try {
            setLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 2000)) 
        } catch (error) {
            console.error("Error approving payment in lieu:", error);
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        closeModal();
    }

  return (
    <CustomModal
    title = "Approve Payment In-Lieu"
    icon={UnavailableFreeIcons}
    width={500}
    okText="Confirm Approval"
    onOk={handleOk}
    onCancel={handleCancel}
    loading={loading}
    center={true}
>
 <EmployeeCard
 description="Confirm that the uploaded payment proof for this employee meets all requirements. "
 employee={employee}
 />
    </CustomModal>
  )
}

export default ApprovePaymentInLieuModal
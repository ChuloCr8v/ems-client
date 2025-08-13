"use client"

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

interface ApproveHandoverDocumentModalProps {
    employee?: Employee
}

const ApproveHandoverDocumentModal = ({
    employee = {
        firstName: "Modesta",
        lastName: "Ekeh",
        employeeId: "EMP-3958",
    },
}: ApproveHandoverDocumentModalProps) => {
    const [loading, setLoading] = useState(false)
     const { closeModal } = usePopup();

    const handleOk = async () => {
        try {
            setLoading(true)
            
            
            await new Promise((resolve) => setTimeout(resolve, 2000)) 
            
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        closeModal();
    }

    return (
        <CustomModal
            title="Approve Handover Document"
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

export default ApproveHandoverDocumentModal

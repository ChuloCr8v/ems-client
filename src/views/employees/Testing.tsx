"use client"

import { Button } from "antd"
import { usePopup } from "../../context/PopupContext"
import UploadPaymentReceiptModal from "../../component/modals/offboardingModal/UploadPaymentReceiptModal"
import InitiateOffboardingModal from "../../component/modals/offboardingModal/InitiateOffboardingModal"
import UploadHandoverDocumentModal from "../../component/modals/offboardingModal/UploadHandoverDocumentModal"
import UploadAssetsPaymentReceiptModal from "../../component/modals/offboardingModal/UploadAssetsPaymentReceipt"
import OffboardingChecklistModal from "../../component/modals/offboardingModal/OffboardingChecklistModal"
import ReturnAssetModal from "../../component/modals/offboardingModal/ReturnAssetModal"
import ApproveAssetReturnModal from "../../component/modals/offboardingModal/ApproveAssetReturnModal"
import ApprovePaymentInLieuModal from "../../component/modals/offboardingModal/ApprovePaymentInLieuModal"
import ApproveHandoverDocumentModal from "../../component/modals/offboardingModal/ApproveHandoverDocumentModal"

const Testing = () => {
  const { openModal } = usePopup()

  const handleOpenPaymentModal = () => {
    openModal(<UploadPaymentReceiptModal />)
   
  }

  const handleOpenInitiateModal = () => {
    openModal(<InitiateOffboardingModal/>)
  }

  const handleOpenHandOverModal = ()=>{
    openModal(<UploadHandoverDocumentModal />)
  }
  const handleOpenuploadAssetModal = ()=>{
    openModal(<UploadAssetsPaymentReceiptModal />)
  }
  const handleOpenOffboardingModal = ()=>{
    openModal(<OffboardingChecklistModal />)
  }
  const handleOpenReturnAssets = ()=>{
    openModal(<ReturnAssetModal />)
  }
  const handleOpenApproveReturnAssets = ()=>{
    openModal(<ApproveAssetReturnModal />)
  }

  const handleOpenApprovePaymentInLieu = ()=>{
    openModal(<ApprovePaymentInLieuModal />)
  }
  const handleOpenApproveHandoverDocument = ()=>{
    openModal(<ApproveHandoverDocumentModal />)
  }

  return (
    <div className="p-8 space-y-2">
      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={handleOpenPaymentModal}
          className="bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC]"
        >
          Click to open uploadPaymentReceiptModal
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={handleOpenInitiateModal}
          className="bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC]"
        >
          Click to open InitiateOffBoardingModal
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={handleOpenHandOverModal}
          className="bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC]"
        >
          Click to open UploadHandoverDocumentModal
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={handleOpenuploadAssetModal}
          className="bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC]"
        >
          Click to open UploadAssetsPaymentReceipt
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={handleOpenOffboardingModal}
          className="bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC]"
        >
          Click to open OffboardingChecklist
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={handleOpenReturnAssets}
          className="bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC]"
        >
          Click to open ReturnAssetModal
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={handleOpenApproveReturnAssets}
          className="bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC]"
        >
          Click to open ApproveReturnAssetModal
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={handleOpenApprovePaymentInLieu}
          className="bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC]"
        >
          Click to open ApprovePaymentInLieuModal
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          type="primary"
          size="large"
          onClick={handleOpenApproveHandoverDocument}
          className="bg-[#0A96CC] hover:bg-[#0984b3] border-[#0A96CC]"
        >
          Click to open ApproveHandoverDocument
        </Button>
      </div>
    </div>
  )
}

export default Testing

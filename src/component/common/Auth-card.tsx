"use client"

import { Button } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"

interface BackButtonProps {
  onClick: () => void
  className?: string
}

const BackButton = ({ onClick, className = "" }: BackButtonProps) => {
  return (
    <Button
      icon={<ArrowLeftOutlined />}
      type="default"
      onClick={onClick}
      className={`flex items-center text-[#0A96CC] border-[#0A96CC] bg-white hover:bg-[#e6f7ff] transition-colors ${className}`}
    >
      Back
    </Button>
  )
}

export default BackButton

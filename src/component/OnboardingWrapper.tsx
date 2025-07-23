import type { ReactNode } from "react"

interface OnboardingWrapperProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

const OnboardingWrapper = ({
  children,
  title = "Let's Get You Set Up",
  subtitle = "Your basic info has been prefilled. Please complete your profile and upload your signed documents to proceed.",
}: OnboardingWrapperProps) => {
  return (
    <div className="w-full max-w-[800px] bg-white/25 !rounded-2xl !p-8 backdrop-blur-2xl">
      <div className="w-full rounded-2xl">
        {/* Header */}
        <div className="px-8 py-6 text-center">
          <h1 className="!text-2xl font-bold text-gray-900 !mb-2">{title}</h1>
          <p className="text-gray-500 text-sm !mb-4">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export default OnboardingWrapper

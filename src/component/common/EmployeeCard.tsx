interface Employee {
  firstName: string
  lastName: string
  employeeId: string
  profileImage?: string
}

interface ApproveOffboardingProps {
  description: string
  employee: Employee
}

const EmployeeCard = ({ description, employee }: ApproveOffboardingProps) => {
  return (
    <div className="">
      {/* Description Text */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>

      {/* Employee Card */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {employee.profileImage ? (
              <img
                src={employee.profileImage || "/placeholder.svg"}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {employee.firstName.charAt(0)}
                  {employee.lastName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-base">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-500">ID: {employee.employeeId}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard;

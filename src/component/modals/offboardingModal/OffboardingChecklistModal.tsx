import {
  LaptopFreeIcons,
} from "@hugeicons/core-free-icons";
import { CustomModal } from "../../common/CustomModal"

interface FileAttachment {
  name: string
  size: string
}


const OffboardingChecklistModal = () => {
  const modestaFiles: FileAttachment[] = [
    { name: "File Name.pdf", size: "100kb" },
    { name: "File Name.pdf", size: "100kb" },
  ]
  

  return (
    <CustomModal

      title="Offboarding Checklist"
      modalSubtitle=""
      icon={LaptopFreeIcons}
      width={520}

      hideFooter
    >
      <div className="space-y-4">
        {/* Task */}
        <div className="border border-green-300 rounded-md p-3 flex items-center space-x-3 bg-green-50">
          {/* {LaptopFreeIcons}  */}
          <div>
            <p className="text-sm font-medium">Return Assigned Company Assets</p>
            <p className="text-xs text-gray-500">ID: EMP-3958</p>
          </div>
        </div>

        {/* Modesta reply */}
        <div className="bg-white border rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2">
            <img
              src="/avatar-modesta.png"
              alt="Modesta"
              className="w-6 h-6 rounded-full"
            />
            <p className="text-sm font-semibold">Modesta Ekeh replied:</p>
          </div>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Mi porta in donec ultricies
            habitant quis duis euismod.
          </p>

          {/* Files */}
          <div className="flex gap-2 flex-wrap">
            {modestaFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 p-2 border rounded-md w-fit"
              >
                {/* {FileUploadFreeIcons} */}
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your reply */}
        <div className="bg-white border rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2">
            {/* {FileUploadFreeIcons} */}
            <p className="text-sm font-semibold">You replied:</p>
          </div>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Mi porta in donec ultricies
            habitant quis duis euismod.
          </p>
        </div>
      </div>
    </CustomModal>
  )
}

export default OffboardingChecklistModal

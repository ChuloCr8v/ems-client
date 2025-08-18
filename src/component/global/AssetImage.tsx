import { twMerge, type ClassNameValue } from "tailwind-merge";

export type AssetType =
  | "HARDWARE"
  | "ACCESSORY"
  | "LOGISTICS"
  | "OFFICE_FURNITURE"
  | "SOFTWARE"
  | "SAFETY_EQUIPMENT";

const iconMap: Record<string, any> = {
  HARDWARE: "HARDWARE.jpg",
  ACCESSORY: "ACCESSORY.jpg",
  LOGISTICS: "LOGISTICS.jpeg",
  OFFICE_FURNITURE: "OFFICE_FURNITURE.webp",
  SOFTWARE: "SOFTWARE.webp",
  SAFETY_EQUIPMENT: "SAFETY_EQUIPMENT.jpg",
};

function AssetImage({
  assetType,
  className,
}: {
  assetType: AssetType;
  className?: ClassNameValue;
}) {
  const IconComponent = iconMap[assetType];
  return (
    <img
      src={IconComponent}
      alt={assetType}
      className={twMerge("h-full w-full", className)}
    />
  );
}

export default AssetImage;

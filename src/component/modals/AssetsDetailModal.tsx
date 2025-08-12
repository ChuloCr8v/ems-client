"use client";

import { useEffect, useState } from "react";
import { Button, Image } from "antd";
import {
  FileAttachmentIcon,
  LaptopIcon,
  UserAdd01FreeIcons,
} from "@hugeicons/core-free-icons";
import type { Asset } from "../../api/types";
import StatusTag from "../global/StatusTag";
import { CustomModal } from "../common/CustomModal";
import DataBox from "../global/DataBox";
import CustomSegmented from "../global/CustomSegment";
import { twMerge } from "tailwind-merge";
import LogComponent from "../global/LogComponent";

interface AssetDetailsModalProps {
  asset: Asset;
}

const AssetDetailsModal = ({ asset }: AssetDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    setMainImage(asset.images[0].url);
  }, [asset]);

  const assetDetails = [
    {
      label: "ID",
      value: asset.assetId,
    },
    {
      label: "Asset Name",
      value: asset.name,
    },
    {
      label: "Category",
      value: asset.category,
    },
    {
      label: "Serial Number",
      value: asset.serialNumber,
    },
    {
      label: "Status",
      value: <StatusTag status={asset.status} />,
    },
    {
      label: "Assinged To",
      value: "Papu chulo",
    },
    {
      label: "Description",
      value: asset.description,
    },
  ];

  const OverviewTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataBox
          data={{
            header: {
              title: {
                icon: FileAttachmentIcon,
                text: "Asset Image",
              },
            },
          }}
        >
          <div className="bg-white rounded-lg">
            <div
              className={twMerge(
                "grid grid-cols-3 space-x-3 ",
                asset.images.length === 1 && "grid-cols-1"
              )}
            >
              {/* Main image */}
              <div
                className={twMerge(
                  "col-span-2 h-[170px] overflow-hidden rounded-lg border-gray/30 border"
                )}
              >
                <Image
                  src={mainImage}
                  alt={asset.name}
                  className="h-full w-auto object-cover"
                />
              </div>
              {/* Thumbnail images */}
              {asset.images.length > 1 && (
                <div className="grid grid-rows-3 gap-2 overflow-hidden h-[170px]">
                  {asset.images.map((a) => (
                    <Button
                      onClick={() => setMainImage(a.url)}
                      className={twMerge(
                        "!h-full !w-full p-0",
                        mainImage === a.url && "!border-green"
                      )}
                    >
                      <img
                        src={a.url}
                        alt={asset.name}
                        // width={70}
                        className="object-cover h-full w-full"
                      />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DataBox>

        <DataBox
          data={{
            header: {
              title: {
                icon: FileAttachmentIcon,
                text: "Bar Code",
              },
            },
          }}
        >
          <div className="w-full flex justify-center items-center">
            <Image
              wrapperClassName="w-full "
              src={asset.barcode.url}
              alt={asset.name}
              className="!h-[170px] w-auto object-cover  border-gray/30 rounded-lg border"
            />
          </div>
        </DataBox>
      </div>

      {/* Asset Details */}
      <DataBox
        data={{
          header: {
            title: {
              icon: LaptopIcon,
              text: "Asset Details",
            },
          },
          body: assetDetails,
        }}
        bodyWrapper="grid grid-cols-2"
        contentWrapper={twMerge("!grid")}
      />
    </div>
  );

  const LogsTab = () => <LogComponent />;

  const tabItems = ["Overview", "Logs"];

  return (
    <CustomModal
      title={asset.name}
      modalSubtitle={asset.assetId}
      icon={UserAdd01FreeIcons}
      width={800}
      hideFooter={true}
      maxHeight={true}
    >
      <div className="flex flex-col justify-center items-center gap-6">
        <CustomSegmented options={tabItems} setOption={setActiveTab} />
        {activeTab === "Overview" ? <OverviewTab /> : <LogsTab />}
      </div>
    </CustomModal>
  );
};

export default AssetDetailsModal;

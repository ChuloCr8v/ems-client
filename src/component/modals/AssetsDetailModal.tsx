import { useEffect, useState } from "react";
import { Button, Image as AntImage, QRCode } from "antd";
import {
  Download01Icon,
  FileAttachmentIcon,
  LaptopIcon,
  QrCodeIcon,
  UserAdd01FreeIcons,
} from "@hugeicons/core-free-icons";
import type { Asset } from "../../api/types";
import StatusTag from "../global/StatusTag";
import { CustomModal } from "../common/CustomModal";
import DataBox from "../global/DataBox";
import CustomSegmented from "../global/CustomSegment";
import { twMerge } from "tailwind-merge";
import LogComponent from "../global/LogComponent";
import { parseImageData } from "../../helpers";
import AssetImage from "../global/AssetImage";
import Icon from "../common/Icon";
import { colors } from "../../constants/colors";

interface AssetDetailsModalProps {
  asset: Asset;
}

const AssetDetailsModal = ({ asset }: AssetDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [mainImage, setMainImage] = useState("");

  const imgUrl = parseImageData(asset?.assetImage);

  useEffect(() => {
    setMainImage(imgUrl);
  }, [imgUrl]);

  console.log(asset);

  const assetDetails = [
    {
      label: "ID",
      value: asset.serialNo,
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
      value: asset.serialNo,
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

  function doDownload(url: string, fileName: string) {
    const a = document.createElement("a");
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const downloadSvgQRCode = () => {
    const svg = document
      .getElementById("myqrcode")
      ?.querySelector<SVGElement>("svg");

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new window.Image();
    img.onload = () => {
      const padding = 20;
      const width = img.width + padding * 2;
      const height = img.height + padding * 2;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      ctx.drawImage(img, padding, padding);

      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");
      doDownload(pngUrl, "QRCode.png");
    };
    img.src = url;
  };

  const OverviewTab = () => (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
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
                "grid grid-cols-1 space-x-3"
                // asset.assetImage?.length === 1 && "grid-cols-1"
              )}
            >
              {/* Main image */}
              <div
                className={twMerge(
                  "col-span-2 h-[200px] overflow-hidden rounded-lg flex items-center justify-center",
                  asset.assetImage && "border-gray/30 border"
                )}
              >
                {mainImage ? (
                  <AntImage
                    src={mainImage}
                    alt={asset.name}
                    className="h-[150px] w-auto object-cover"
                  />
                ) : (
                  AssetImage({
                    assetType: asset.category,
                    className: "w-auto h-full object-center",
                  })
                )}
              </div>
              {/* Thumbnail images
              {asset.assetImage?.length > 1 && (
                <div className="grid grid-rows-3 gap-2 overflow-hidden h-[170px]">
                  {asset.assetImage?.map((a) => (
                    <Button
                      onClick={() => setMainImage(a?.url)}
                      className={twMerge(
                        "!h-full !w-full p-0",
                        mainImage === a?.url && "!border-green"
                      )}
                    >
                      <img
                        src={a?.url}
                        alt={asset?.name}
                        // width={70}
                        className="object-cover h-full w-full"
                      />
                    </Button>
                  ))}
                </div>
              )} */}
            </div>
          </div>
        </DataBox>

        <DataBox
          data={{
            header: {
              title: {
                icon: QrCodeIcon,
                text: "QR Code",
              },
            },
          }}
        >
          <div
            id="myqrcode"
            className="relative w-[200px] place-self-center group overflow-hidden rounded-lg"
          >
            <QRCode
              type="svg"
              value={asset.serialNo ?? ""}
              size={200}
              className="place-self-center"
            />
            <div className="h-full flex flex-col  items-center justify-center w-full bg-black/10 absolute z-10 top-0 left-0 duration-200 opacity-0 group-hover:opacity-100">
              <Button
                onClick={downloadSvgQRCode}
                className="!font-bold w-fit place-self-center !text-primary"
              >
                Download
                <Icon
                  icon={Download01Icon}
                  color={colors.primary}
                  thickness={3}
                />
              </Button>
            </div>
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

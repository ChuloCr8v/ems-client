"use client"

import { useState } from "react"
import { Tabs, Button } from "antd"
import {
    Download03FreeIcons,
    FileEmptyIcon,
    Profile02FreeIcons,
    UserAdd01FreeIcons,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Asset } from "../../api/types"
import StatusTag from "../global/StatusTag"
import { CustomModal } from "../common/CustomModal"

interface AssetDetailsModalProps {
    asset: Asset
}

const AssetDetailsModal = ({ asset }: AssetDetailsModalProps) => {
    const [activeTab, setActiveTab] = useState("overview")

    // Mock asset logs data

    const GreenProfileIcon =
        <HugeiconsIcon icon={Profile02FreeIcons} size={20} className="text-[#40B554]" />;

    const GreenProfileIcon1 =
        <HugeiconsIcon icon={FileEmptyIcon} size={20} className="!text-[#40B554] " />;

    const assetLogs = [
        {
            id: "1",
            date: "Apr 12, 2024",
            time: "12:00 am",
            actionType: "Asset assigned",
            assignedBy: "Jane Doe",
            assignedTo: "Alexander James",
            comment: "New hire, asset assigned as part of onboarding",
            attachment: "Onboarding Agreement.pdf",
        },
        {
            id: "2",
            date: "Apr 12, 2024",
            time: "12:00 am",
            actionType: "Asset assigned",
            assignedBy: "Jane Doe",
            assignedTo: "Alexander James",
            comment: "New hire, asset assigned as part of onboarding",
            attachment: "Onboarding Agreement.pdf",
        },
        {
            id: "3",
            date: "Apr 12, 2024",
            time: "12:00 am",
            actionType: "Asset assigned",
            assignedBy: "Jane Doe",
            assignedTo: "Alexander James",
            comment: "New hire, asset assigned as part of onboarding",
            attachment: "Onboarding Agreement.pdf",
        },
        {
            id: "4",
            date: "Apr 12, 2024",
            time: "12:00 am",
            actionType: "Asset assigned",
            assignedBy: "Jane Doe",
            assignedTo: "Alexander James",
            comment: "New hire, asset assigned as part of onboarding",
            attachment: "Onboarding Agreement.pdf",
        },

    ];

    const OverviewTab = () => (
        <div className="space-y-2">
            {/* Asset Image and Barcode Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Asset Image */}
                <div className="">
                    <div className="flex items-center space-x-2 bg-[#F5FBF6] py-3 rounded-t-lg">
                        <div className=" flex items-center justify-center pl-2">
                            {GreenProfileIcon}
                        </div>
                        <h3 className="font-bold text-gray-900">Asset Image</h3>
                    </div>
                    <div className="bg-white rounded-lg ">
                        <div className="flex space-x-3">
                            {/* Main image */}
                            <div className="flex-1">
                                <img
                                    src="/assets/laptop.svg"
                                    alt="Asset main view"
                                    className="w-full h-52 object-cover rounded-lg "
                                />
                            </div>
                            {/* Thumbnail images */}
                            <div className="flex flex-col space-y-2">
                                <img
                                    src="/assets/laptop.svg"
                                    alt="Asset thumbnail 1"
                                    className="w-16 h-16 object-cover rounded "
                                />
                                <img
                                    src="/assets/laptop.svg"
                                    alt="Asset thumbnail 2"
                                    className="w-16 h-16 object-cover rounded "
                                />
                                <img
                                    src="/assets/laptop.svg"
                                    alt="Asset thumbnail 3"
                                    className="w-16 h-16 object-cover rounded "
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barcode */}
                <div className=" ">
                    <div className="flex items-center space-x-2 bg-[#F5FBF6] py-3 rounded-t-lg">
                        <div className=" flex items-center justify-center pl-2">
                            {GreenProfileIcon}
                        </div>
                        <h3 className="font-bold text-gray-900">Barcode</h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center ">
                        <div className="bg-white p-4 rounded border">
                            <div className="flex flex-col items-center space-y-2">
                                {/* Barcode representation */}
                                {/* <div className="flex space-x-px ">
                                    {Array.from({ length: 50 }, (_, i) => (
                                        <div key={i} className={`w-1 ${Math.random() > 0.5 ? "h-12 bg-black" : "h-8 bg-black"}`} />
                                    ))}
                                </div> */}
                                <span className="text-xs text-gray-600">(00)123456789101112133</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Asset Details */}
            <div className="">
                <div className="flex items-center space-x-2 w-full p-3 rounded-t-lg bg-[#F5FBF6] ">
                    <div className="w-5 h-5 rounded flex items-center justify-center">
                        {GreenProfileIcon}
                    </div>
                    <h3 className="font-bold text-gray-900">Asset Details</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">ID</p>
                                <p className="font-semibold text-gray-900">{asset.assetId}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Category</p>
                                <p className="font-semibold text-gray-900">{asset.category}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Status</p>
                                <StatusTag status={asset.status} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Asset Name</p>
                                <p className="font-semibold text-gray-900">{asset.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Serial Number</p>
                                <p className="font-semibold text-gray-900">{asset.serialNumber || "6 months"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Serial Number</p>
                                <p className="font-semibold text-gray-900">6 months</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const LogsTab = () => (
        <div className="space-y-0">
            {/* Table Header */}
            <div className="bg-green-50 rounded-t-lg border-b-0 border border-gray-300 md:block hidden">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-700">
                    <div className="col-span-2 font-semibold">Date</div>
                    <div className="col-span-3 font-semibold">Action Type</div>
                    <div className="col-span-7 font-semibold">Comments/Attachments</div>
                </div>
            </div>

            {/* Table Rows */}
            <div className=" border-1 border-b-0 border-gray-300">
                {assetLogs.map((log, index) => (
                    <div
                        key={log.id}
                        className={`md:grid md:grid-cols-12 flex flex-col md:gap-4 gap-1.5 p-2  border-b border-gray-300  ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-50"}`}
                    >
                        {/* Date Column */}
                        <div className="col-span-2 ">
                            <p className="font-medium text-gray-900 text-sm">{log.date}</p>
                            <p className="text-xs text-gray-500">{log.time}</p>
                        </div>

                        {/* Action Type Column */}
                        <div className="col-span-3">
                            <p className="font-medium text-gray-900 text-sm">{log.actionType}</p>
                            <p className="text-xs text-gray-500">
                                By <span className="text-green-600">{log.assignedBy}</span> to{" "}
                                <span className="text-green-600">{log.assignedTo}</span>
                            </p>
                        </div>

                        {/* Comments/Attachments Column */}
                        <div className="col-span-7">
                            <p className="text-sm text-gray-600 mb-2">{log.comment}</p>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 bg-white border border-gray-400 rounded-lg px-3 py-1">
                                    <div className="w-4 h-4 rounded flex items-center justify-center">
                                        <div className="">{GreenProfileIcon1}</div>
                                    </div>
                                    <span className="text-sm text-gray-700">{log.attachment}</span>
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<HugeiconsIcon icon={Download03FreeIcons} size={16} className="!text-gray-500 mt-1" />}
                                        className="text-gray-200 hover:text-gray-600"
                                    />

                                </div>

                                <div className="flex items-center  border-1 pt-1.5 border-gray-400 rounded-lg">
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={GreenProfileIcon1}
                                        className="text-green-600 hover:text-green-700 "
                                    />
                                    <span className="text-sm text-black pr-1">+2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const tabItems = [
        {
            key: "overview",
            label: "Overview",
            children: <OverviewTab />,
        },
        {
            key: "logs",
            label: "Logs",
            children: <LogsTab />,
        },
    ]

    return (
        <CustomModal
            title={asset.name}
            modalSubtitle={asset.assetId}
            icon={UserAdd01FreeIcons}
            width={700}
            hideFooter={true}
            maxHeight={true}
        >
            <div className="">
                <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} className=""
                    centered />
            </div>
        </CustomModal>
    )
}

export default AssetDetailsModal

import type { Dayjs } from "dayjs";

export type Id = string;

export type IdInput = { id: string | undefined };

export type HasId = { id: string };

export type WithId<T> = T & HasId;

export type New<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export type Update<T> = Omit<T, 'createdAt' | 'updatedAt'>;

export type HasName = { name: string } | { firstName: string; lastName: string };

export type Maybe<T> = T | undefined;

export enum Role {
    "SUPERADMIN" = "SUPERADMIN",
    "ADMIN" = "ADMIN",
    "USER" = "USER",
    "MANAGER" = "MANAGER",
    "FACILITY" = "FACILITY"
}



export enum EmployeeStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ON_LEAVE = "ON_LEAVE",
    ACCEPTED = "ACCEPTED",
    PENDING = "PENDING",
    PENDING_INVITE = "PENDING_INVITE",
    PENDING_REVIEW = "PENDING_REVIEW",
    REJECTED = "REJECTED",
}

export enum AssetStatus {
    AVAILABLE = "AVAILABLE",
    ASSIGNED = "ASSIGNED",
    FAULTY = "FAULTY",
    MAINTENANCE = "MAINTENANCE",
    RETIRED = "RETIRED",
    ACCEPTED = "ACCEPTED",
    ACTIVE = "ACTIVE"
}

export enum AssetCategory {
    HARDWARE = "HARDWARE",
    ACCESSORY = "ACCESSORY",
    LOGISTICS = "LOGISTICS",
    OFFICE_FURNITURE = "OFFICE_FURNITURE",
    SAFETY_EQUIPMENT = "SAFETY_EQUIPMENT",
    SOFTWARE = "SOFTWARE",
}

export type Asset = {
    assignments: any;
    description?: string;
    id: string
    name: string
    assetId: string
    category: AssetCategory
    status: AssetStatus
    assignedTo?: User
    dateAssigned?: string
    dateRetrieved?: string
    purchaseDate?: string
    vendor?: string
    cost?: string
    warrantyExpiry?: string
    value?: number
    condition?: string
    location?: string
    serialNo?: string
    createdAt?: string
    updatedAt?: string
    assetImage: string
    barcodeImage: string
}

export type Image = {
    id: string
    publicId: string
    url: string
}

export type Invite = {
    id: string,
    token: string,
    status: EmployeeStatus
    createdAt: string
    prospect: Prospect
}


export type Prospect = {
    id: string;
    userRole: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    departmentId: string;
    department: Department;
    startDate: Date;
    jobType: JobType;
    gender: string;
    duration: string;
    invite: Invite[];
    status?: string
    user: User
};



export type Levels = {
    name: string;
    id: string
}

export type Department = {
    departmentHeadId: string;
    createdAt?: Dayjs
    status?: AssetStatus;
    head?: User;
    description?: string;
    id: Id;
    name: string;
};

export type Level = {
    id: Id;
    name: string;
    rank: number;
};

export type LeaveType = {
    id: Id;
    name: string;
};

export type User = {
    status: EmployeeStatus;
    stage: Stage;
    user: HasName | undefined;
    id: Id;
    eId: number;
    email: string;
    firstName: string;
    lastName: string;
    userRole?: Role
    gender: "MALE" | "FEMALE"
    role: string,
    invite: Invite[]
    department: Department;
    departmentId?: string;
    level: Level;
    isAdmin: boolean;
    active: boolean;
    jobType: JobType;
    jobTitle: string;
    payroll?: Payroll;
    startDate: string
    duration?: string
    maritalStatus?: string
    address: string
    contacts: Contact
};

export type ContactInfo = {
    firstName: string;
    lastName: string;
    relationship: string
    phone: string
    address: string
}

export type Contact = {
    guarantor: ContactInfo
    emergency: ContactInfo
}

export type AuthUser = User & {
    isAdmin: boolean;
    workDays: unknown;
    approverOf: {
        id: Id;
        stage: Stage;
        team: Department;
    }[];
};

export type UserEntitlement = {
    type: { id: string; name: string };
    totalDays: number;
    usedDays: number;
    remainingDays: number;
};

export type Entitlement = {
    id: Id;
    days: number;
    leaveType: LeaveType;
    level: Level;
};

export enum StagePermission {
    LEAVE = 'LEAVE',
    REPORT = 'REPORT',
}

export type Stage = {
    id: Id;
    name: string;
    position: number;
    permission: StagePermission;
};

export type Approver = {
    id: Id;
    stage: Stage;
    team: Department;
    user: User;
};

export enum ResponseType {
    COMMENT = 'COMMENT',
    APPROVAL = 'APPROVAL',
    DENIAL = 'DENIAL',
}

export type Response = {
    id: Id;
    type: ResponseType;
    note: string;
    user: User;
    createdAt: string;
    updatedAt: string;
};

export enum Status {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DENIED = 'DENIED',
}

export type File = {
    id: Id;
    name: string;
    size: number;
    type: string;
    createdAt: string;
};

export type Request = {
    id: Id;
    status: Status;
    reason: string;
    type: LeaveType;
    user: User;
    deedOfAssignment: User;
    stage: Stage;
    start: string;
    end: string;
    workdays: number;
    file: File;
    createdAt: string;
    updatedAt: string;
    responses: Response[];
    cancelRequest?: { status: string; reason: string };
};

export type RequestCount = {
    totalCount: number;
    approvedCount: number;
    pendingCount: number;
    deniedCount: number;
};

export type TableRequestDatatype = {
    key: string;
    id: string;
    name: string;
    leaveType: string;
    durationDateStart: string;
    durationDateEnd: string;
    days: number;
    reason: string;
    status: string;
    user: User;
    stage: Stage;
    attachment: File;
};

export type CreateManyEntitlements = {
    leaveTypeId: string;
    levelToDays: { levelId: string; days: number }[];
};

export enum JobType {
    FULLTIME = 'FULL_TIME',
    CONTRACT = 'CONTRACT',
    INTERN = "INTERN"
}

export const EmployeeJobType = [
    { label: 'Full Time', value: JobType.FULLTIME },
    { label: 'Contract', value: JobType.CONTRACT },
];

export enum SalaryType {
    EARNING = 'EARNING',
    DEDUCTION = 'DEDUCTION',
}

export enum SalaryCalculationType {
    PERCENTAGE = 'PERCENTAGE',
    FIXED = 'FIXED',
}


export enum UploadType {
    RESUME = "RESUME",
    CONTRACT = "CONTRACT",
    NDA = "NDA",
    OTHER = "OTHER",
}

export type IUpload = {
    id: string;
    name: string;
    originalName: string;
    type: UploadType;
    mimetype: string;
    size: number;
};


type PayrollItem = {
    id: Id;
    name: string;
    type: SalaryType;
    calculation: SalaryCalculationType;
    percentage: number;
    component: SalaryComponent;
    monthlyAmount: number;
    annualAmount: number;
};

export type Payroll = {
    id: Id;
    salary: number;
    gross: number;
    net: number;
    totalDeductions: number;
    items: NewPayrollItem[];
    user: User;
};

type NewPayrollItem = {
    name: string;
    type: SalaryType;
    calculation: SalaryCalculationType;
    percentage?: number;
    component: SalaryComponent;
    monthlyAmount: number;
    annualAmount: number;
};

export type NewPayroll = {
    id: Id;
    salary: number;
    gross: number;
    net: number;
    totalDeductions: number;
    items: NewPayrollItem[];
};

export type UpdatePayroll = {
    userId: Id;
    salary: number;
    gross: number;
    net: number;
    totalDeductions: number;
    items: NewPayrollItem[];
};

export type Payslip = {
    id: Id;
    salary: number;
    gross: number;
    net: number;
    totalDeductions: number;
    amount: number;
    createdAt: string;
    user: User;
    items: PayrollItem[];
};

export enum SalaryComponent {
    BASIC = 'BASIC',
    HOUSING = 'HOUSING',
    TRANSPORT = 'TRANSPORT',
    PENSION = 'PENSION',
    TAX = 'TAX',
    GENERIC = 'GENERIC',
}

export type Compensation = {
    name: string;
    type: SalaryType;
    component: SalaryComponent;
    calculation: SalaryCalculationType;
    monthlyAmount: number;
    annualAmount: number;
    percentage?: number;
    fixed?: number;
};

export enum ReportStatus {
    DRAFT = 'DRAFT',
    SUBMITTED = 'SUBMITTED',
}

export enum TaskStatus {
    ONGOING = 'ONGOING',
    COMPLETED = 'COMPLETED',
}

export type NewTask = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    timeline: string;
    concerns?: string;
    links: string[];
};

export type UpdateTask = NewTask & {
    isNew?: boolean;
};

export type UpdateReport = {
    reportId: string;
    tasks: UpdateTask[];
    tasksToDelete?: string[];
    status?: ReportStatus;
};

export type NewReport = {
    title: string;
    status: ReportStatus;
    tasks: NewTask[];
};

export type Task = {
    id: string;
    title: string;
    status: TaskStatus;
    timeline: string;
    description: string;
    concerns: string;
    links: string[];
};

export type Report = {
    id: string;
    title: string;
    status: ReportStatus;
    viewedByAdmin: false;
    viewedByApprover: false;
    tasks: Task[];
    userId: string;
    user: User;
    createdAt: string;
};

export type DeleteReportTasks = {
    reportId: string;
    taskIds: string[];
};

export type Deduction = {
    id: string
    tax: string
    name: string
    month: string
    pension: string
    createdAt: string
}

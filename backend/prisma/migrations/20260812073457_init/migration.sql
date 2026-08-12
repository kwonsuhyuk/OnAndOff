-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('OWNER', 'MANAGER', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'OTHER');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('HOURLY', 'MONTHLY', 'NONE');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('WORKING', 'COMPLETED', 'OUTWORK_PENDING', 'OUTWORK', 'CORRECTED');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "VacationType" AS ENUM ('ANNUAL', 'HALF_DAY', 'GENERAL');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "introduction" TEXT,
    "logoUrl" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Seoul',
    "payrollClosingDay" INTEGER NOT NULL DEFAULT 1,
    "nightPayRate" DECIMAL(5,2) NOT NULL DEFAULT 1.0,
    "holidayPayRate" DECIMAL(5,2) NOT NULL DEFAULT 1.0,
    "nightStartMinute" INTEGER,
    "nightEndMinute" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyMember" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "positionId" UUID,
    "role" "MemberRole" NOT NULL DEFAULT 'EMPLOYEE',
    "employmentType" "EmploymentType",
    "salaryType" "SalaryType" NOT NULL DEFAULT 'NONE',
    "salaryAmount" DECIMAL(14,2),
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),

    CONSTRAINT "CompanyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workplace" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "memo" TEXT,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "radiusM" INTEGER NOT NULL DEFAULT 100,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Workplace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceRecord" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "memberId" UUID NOT NULL,
    "workDate" DATE NOT NULL,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'WORKING',
    "checkInAt" TIMESTAMP(3),
    "checkOutAt" TIMESTAMP(3),
    "checkInWorkplaceId" UUID,
    "checkOutWorkplaceId" UUID,
    "checkInLatitude" DECIMAL(10,7),
    "checkInLongitude" DECIMAL(10,7),
    "checkOutLatitude" DECIMAL(10,7),
    "checkOutLongitude" DECIMAL(10,7),
    "correctedReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttendanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VacationRequest" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "memberId" UUID NOT NULL,
    "type" "VacationType" NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "processedAt" TIMESTAMP(3),
    "processedBy" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VacationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutworkRequest" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "memberId" UUID NOT NULL,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCheckout" BOOLEAN NOT NULL DEFAULT false,
    "memo" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "processedAt" TIMESTAMP(3),
    "processedBy" UUID,

    CONSTRAINT "OutworkRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyHoliday" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "date" DATE NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CompanyHoliday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "memberId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_code_key" ON "Company"("code");

-- CreateIndex
CREATE INDEX "CompanyMember_userId_idx" ON "CompanyMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyMember_companyId_userId_key" ON "CompanyMember"("companyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Position_companyId_name_key" ON "Position"("companyId", "name");

-- CreateIndex
CREATE INDEX "AttendanceRecord_companyId_workDate_idx" ON "AttendanceRecord"("companyId", "workDate");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceRecord_memberId_workDate_key" ON "AttendanceRecord"("memberId", "workDate");

-- CreateIndex
CREATE INDEX "VacationRequest_companyId_status_startDate_idx" ON "VacationRequest"("companyId", "status", "startDate");

-- CreateIndex
CREATE INDEX "OutworkRequest_companyId_status_requestedAt_idx" ON "OutworkRequest"("companyId", "status", "requestedAt");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyHoliday_companyId_date_key" ON "CompanyHoliday"("companyId", "date");

-- CreateIndex
CREATE INDEX "Notice_companyId_createdAt_idx" ON "Notice"("companyId", "createdAt");

-- CreateIndex
CREATE INDEX "Notification_memberId_readAt_createdAt_idx" ON "Notification"("memberId", "readAt", "createdAt");

-- AddForeignKey
ALTER TABLE "CompanyMember" ADD CONSTRAINT "CompanyMember_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMember" ADD CONSTRAINT "CompanyMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyMember" ADD CONSTRAINT "CompanyMember_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workplace" ADD CONSTRAINT "Workplace_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "CompanyMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_checkInWorkplaceId_fkey" FOREIGN KEY ("checkInWorkplaceId") REFERENCES "Workplace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_checkOutWorkplaceId_fkey" FOREIGN KEY ("checkOutWorkplaceId") REFERENCES "Workplace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacationRequest" ADD CONSTRAINT "VacationRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacationRequest" ADD CONSTRAINT "VacationRequest_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "CompanyMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutworkRequest" ADD CONSTRAINT "OutworkRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutworkRequest" ADD CONSTRAINT "OutworkRequest_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "CompanyMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyHoliday" ADD CONSTRAINT "CompanyHoliday_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "CompanyMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

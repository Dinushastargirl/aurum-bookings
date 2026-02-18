
import React from 'react';

const PrismaSchema: React.FC = () => {
  const schemaCode = `
// Ayubook (Fresha SL) - Prisma Schema

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  role          Role      @default(CLIENT)
  phone         String?   // Important for SL market
  appointments  Appointment[]
}

model Salon {
  id           String    @id @default(cuid())
  name         String
  city         String    // Colombo, Kandy, Galle, etc.
  address      String
  ownerId      String    @unique
  services     Service[]
  staff        Staff[]
}

model Staff {
  id           String    @id @default(cuid())
  name         String
  salonId      String
  salon        Salon     @relation(fields: [salonId], references: [id])
  services     Service[] @relation("StaffServices")
  appointments Appointment[]
}

model Service {
  id           String    @id @default(cuid())
  name         String
  duration     Int       // Minutes
  priceLKR     Float     // Localized Pricing
  salonId      String
  salon        Salon     @relation(fields: [salonId], references: [id])
  staff        Staff[]   @relation("StaffServices")
}

model Appointment {
  id           String    @id @default(cuid())
  startTime    DateTime
  endTime      DateTime
  status       Status    @default(PENDING)
  totalPrice   Float
  
  clientId     String
  staffId      String
  serviceId    String
  
  // PayHere Integration
  payment      Payment?
}

model Payment {
  id              String   @id @default(cuid())
  appointmentId   String   @unique
  appointment     Appointment @relation(fields: [appointmentId], references: [id])
  payhereOrderId  String   @unique
  payhereId       String?  // Reference from PayHere
  amount          Float
  currency        String   @default("LKR")
  status          String   // SUCCESS, PENDING, FAILED
  method          String?  // VISA, MASTER, GENIE, EZCASH
  createdAt       DateTime @default(now())
}

enum Role { CLIENT; OWNER; STAFF; ADMIN }
enum Status { PENDING; CONFIRMED; CANCELLED; COMPLETED }
  `;

  return (
    <div className="bg-slate-900 text-slate-300 p-6 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed shadow-2xl">
      <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
          Ayubook Data Model (LKR + PayHere)
        </h3>
        <span className="text-slate-500">schema.prisma</span>
      </div>
      <pre className="whitespace-pre">{schemaCode}</pre>
    </div>
  );
};

export default PrismaSchema;

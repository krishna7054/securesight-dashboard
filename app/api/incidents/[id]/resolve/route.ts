import { PrismaClient } from '@prisma/client';
import { NextResponse, type NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ Fix: params is now a Promise
) {
  const params = await context.params; // ✅ Await the params
  const id = parseInt(params.id);
  
  const incident = await prisma.incident.findUnique({ where: { id } });

  if (!incident) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const updated = await prisma.incident.update({
    where: { id },
    data: { resolved: !incident.resolved },
    include: { camera: true },
  });

  return NextResponse.json(updated);
}

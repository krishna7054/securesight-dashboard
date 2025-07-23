import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  const incident = await prisma.incident.findUnique({ where: { id } });

  if (!incident) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = await prisma.incident.update({
    where: { id },
    data: { resolved: !incident.resolved },
    include: { camera: true },
  });

  return NextResponse.json(updated);
}

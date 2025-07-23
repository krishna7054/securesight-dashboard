import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Cameras
  const cameras = await prisma.camera.createMany({
    data: [
      { name: 'Shop Floor A', location: 'Main Warehouse' },
      { name: 'Vault', location: 'Secure Storage' },
      { name: 'Entrance', location: 'Front Door' },
      { name: 'Parking Lot', location: 'Outdoor Area' },
    ],
  });

  // Get camera IDs
  const cameraList = await prisma.camera.findMany();

  // Seed Incidents (12+ across 3+ types, 24-hour span)
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const incidents = [
    // Unauthorized Access
    { cameraId: cameraList[0].id, type: 'Unauthorized Access', tsStart: new Date(oneDayAgo.getTime() + 1*3600000), tsEnd: new Date(oneDayAgo.getTime() + 1*3600000 + 300000), thumbnailUrl: '/thumbnails/unauth1.jpg', resolved: false },
    { cameraId: cameraList[1].id, type: 'Unauthorized Access', tsStart: new Date(oneDayAgo.getTime() + 4*3600000), tsEnd: new Date(oneDayAgo.getTime() + 4*3600000 + 600000), thumbnailUrl: '/thumbnails/unauth2.jpg', resolved: false },
    { cameraId: cameraList[2].id, type: 'Unauthorized Access', tsStart: new Date(oneDayAgo.getTime() + 7*3600000), tsEnd: new Date(oneDayAgo.getTime() + 7*3600000 + 200000), thumbnailUrl: '/thumbnails/unauth3.jpg', resolved: true },
    { cameraId: cameraList[3].id, type: 'Unauthorized Access', tsStart: new Date(oneDayAgo.getTime() + 10*3600000), tsEnd: new Date(oneDayAgo.getTime() + 10*3600000 + 400000), thumbnailUrl: '/thumbnails/unauth4.jpg', resolved: false },

    // Gun Threat
    { cameraId: cameraList[0].id, type: 'Gun Threat', tsStart: new Date(oneDayAgo.getTime() + 2*3600000), tsEnd: new Date(oneDayAgo.getTime() + 2*3600000 + 500000), thumbnailUrl: '/thumbnails/gun1.jpg', resolved: false },
    { cameraId: cameraList[1].id, type: 'Gun Threat', tsStart: new Date(oneDayAgo.getTime() + 5*3600000), tsEnd: new Date(oneDayAgo.getTime() + 5*3600000 + 300000), thumbnailUrl: '/thumbnails/gun2.jpg', resolved: true },
    { cameraId: cameraList[2].id, type: 'Gun Threat', tsStart: new Date(oneDayAgo.getTime() + 8*3600000), tsEnd: new Date(oneDayAgo.getTime() + 8*3600000 + 700000), thumbnailUrl: '/thumbnails/gun3.jpg', resolved: false },
    { cameraId: cameraList[3].id, type: 'Gun Threat', tsStart: new Date(oneDayAgo.getTime() + 11*3600000), tsEnd: new Date(oneDayAgo.getTime() + 11*3600000 + 200000), thumbnailUrl: '/thumbnails/gun4.jpg', resolved: false },

    // Face Recognised
    { cameraId: cameraList[0].id, type: 'Face Recognised', tsStart: new Date(oneDayAgo.getTime() + 3*3600000), tsEnd: new Date(oneDayAgo.getTime() + 3*3600000 + 400000), thumbnailUrl: '/thumbnails/face1.jpg', resolved: false },
    { cameraId: cameraList[1].id, type: 'Face Recognised', tsStart: new Date(oneDayAgo.getTime() + 6*3600000), tsEnd: new Date(oneDayAgo.getTime() + 6*3600000 + 500000), thumbnailUrl: '/thumbnails/face2.jpg', resolved: false },
    { cameraId: cameraList[2].id, type: 'Face Recognised', tsStart: new Date(oneDayAgo.getTime() + 9*3600000), tsEnd: new Date(oneDayAgo.getTime() + 9*3600000 + 300000), thumbnailUrl: '/thumbnails/face3.jpg', resolved: true },
    { cameraId: cameraList[3].id, type: 'Face Recognised', tsStart: new Date(oneDayAgo.getTime() + 12*3600000), tsEnd: new Date(oneDayAgo.getTime() + 12*3600000 + 600000), thumbnailUrl: '/thumbnails/face4.jpg', resolved: false },
    { cameraId: cameraList[0].id, type: 'Face Recognised', tsStart: new Date(oneDayAgo.getTime() + 13*3600000), tsEnd: new Date(oneDayAgo.getTime() + 13*3600000 + 200000), thumbnailUrl: '/thumbnails/face5.jpg', resolved: false },
  ];

  await prisma.incident.createMany({ data: incidents });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

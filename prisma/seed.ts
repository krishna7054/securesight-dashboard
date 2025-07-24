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
    { cameraId: cameraList[0].id, type: 'Unauthorized Access', tsStart: new Date(oneDayAgo.getTime() + 1*3600000), tsEnd: new Date(oneDayAgo.getTime() + 1*3600000 + 300000), thumbnailUrl: 'https://media.gettyimages.com/id/174214616/photo/sneaky-thief-making-off-with-some-loot.jpg?s=612x612&w=gi&k=20&c=IyuGF4epee_2RQiHuBCy9IuNgE7r5FUWcmFgGlFCntU=', resolved: false },
    { cameraId: cameraList[1].id, type: 'Unauthorized Access', tsStart: new Date(oneDayAgo.getTime() + 4*3600000), tsEnd: new Date(oneDayAgo.getTime() + 4*3600000 + 600000), thumbnailUrl: 'https://media.gettyimages.com/id/174214616/photo/sneaky-thief-making-off-with-some-loot.jpg?s=612x612&w=gi&k=20&c=IyuGF4epee_2RQiHuBCy9IuNgE7r5FUWcmFgGlFCntU=', resolved: false },
    { cameraId: cameraList[2].id, type: 'Unauthorized Access', tsStart: new Date(oneDayAgo.getTime() + 7*3600000), tsEnd: new Date(oneDayAgo.getTime() + 7*3600000 + 200000), thumbnailUrl: 'https://media.gettyimages.com/id/174214616/photo/sneaky-thief-making-off-with-some-loot.jpg?s=612x612&w=gi&k=20&c=IyuGF4epee_2RQiHuBCy9IuNgE7r5FUWcmFgGlFCntU=', resolved: true },
    { cameraId: cameraList[3].id, type: 'Unauthorized Access', tsStart: new Date(oneDayAgo.getTime() + 10*3600000), tsEnd: new Date(oneDayAgo.getTime() + 10*3600000 + 400000), thumbnailUrl: 'https://media.gettyimages.com/id/174214616/photo/sneaky-thief-making-off-with-some-loot.jpg?s=612x612&w=gi&k=20&c=IyuGF4epee_2RQiHuBCy9IuNgE7r5FUWcmFgGlFCntU=', resolved: false },

    // Gun Threat
    { cameraId: cameraList[0].id, type: 'Gun Threat', tsStart: new Date(oneDayAgo.getTime() + 2*3600000), tsEnd: new Date(oneDayAgo.getTime() + 2*3600000 + 500000), thumbnailUrl: 'https://cdn.sanity.io/images/cphrnle8/production/01ba35d1c832411398328243b30812bc71667b14-1440x810.jpg?w=1440&q=100&fit=max', resolved: false },
    { cameraId: cameraList[1].id, type: 'Gun Threat', tsStart: new Date(oneDayAgo.getTime() + 5*3600000), tsEnd: new Date(oneDayAgo.getTime() + 5*3600000 + 300000), thumbnailUrl: 'https://cdn.sanity.io/images/cphrnle8/production/01ba35d1c832411398328243b30812bc71667b14-1440x810.jpg?w=1440&q=100&fit=max', resolved: true },
    { cameraId: cameraList[2].id, type: 'Gun Threat', tsStart: new Date(oneDayAgo.getTime() + 8*3600000), tsEnd: new Date(oneDayAgo.getTime() + 8*3600000 + 700000), thumbnailUrl: 'https://cdn.sanity.io/images/cphrnle8/production/01ba35d1c832411398328243b30812bc71667b14-1440x810.jpg?w=1440&q=100&fit=max', resolved: false },
    { cameraId: cameraList[3].id, type: 'Gun Threat', tsStart: new Date(oneDayAgo.getTime() + 11*3600000), tsEnd: new Date(oneDayAgo.getTime() + 11*3600000 + 200000), thumbnailUrl: 'https://cdn.sanity.io/images/cphrnle8/production/01ba35d1c832411398328243b30812bc71667b14-1440x810.jpg?w=1440&q=100&fit=max', resolved: false },

    // Face Recognised
    { cameraId: cameraList[0].id, type: 'Face Recognised', tsStart: new Date(oneDayAgo.getTime() + 3*3600000), tsEnd: new Date(oneDayAgo.getTime() + 3*3600000 + 400000), thumbnailUrl: 'https://cdn.prod.website-files.com/614c82ed388d53640613982e/635bcc2d96817846e4852f51_634fd79657515cf1330c7103_63207867a3bbeed46b755d80_guide-to-face-recognition.png', resolved: false },
    { cameraId: cameraList[1].id, type: 'Face Recognised', tsStart: new Date(oneDayAgo.getTime() + 6*3600000), tsEnd: new Date(oneDayAgo.getTime() + 6*3600000 + 500000), thumbnailUrl: 'https://cdn.prod.website-files.com/614c82ed388d53640613982e/635bcc2d96817846e4852f51_634fd79657515cf1330c7103_63207867a3bbeed46b755d80_guide-to-face-recognition.png', resolved: false },
    { cameraId: cameraList[2].id, type: 'Face Recognised', tsStart: new Date(oneDayAgo.getTime() + 9*3600000), tsEnd: new Date(oneDayAgo.getTime() + 9*3600000 + 300000), thumbnailUrl: 'https://cdn.prod.website-files.com/614c82ed388d53640613982e/635bcc2d96817846e4852f51_634fd79657515cf1330c7103_63207867a3bbeed46b755d80_guide-to-face-recognition.png', resolved: true },
    { cameraId: cameraList[3].id, type: 'Face Recognised', tsStart: new Date(oneDayAgo.getTime() + 12*3600000), tsEnd: new Date(oneDayAgo.getTime() + 12*3600000 + 600000), thumbnailUrl: 'https://cdn.prod.website-files.com/614c82ed388d53640613982e/635bcc2d96817846e4852f51_634fd79657515cf1330c7103_63207867a3bbeed46b755d80_guide-to-face-recognition.png', resolved: false },
    { cameraId: cameraList[0].id, type: 'Face Recognised', tsStart: new Date(oneDayAgo.getTime() + 13*3600000), tsEnd: new Date(oneDayAgo.getTime() + 13*3600000 + 200000), thumbnailUrl: 'https://cdn.prod.website-files.com/614c82ed388d53640613982e/635bcc2d96817846e4852f51_634fd79657515cf1330c7103_63207867a3bbeed46b755d80_guide-to-face-recognition.png', resolved: false },
  ];

  await prisma.incident.createMany({ data: incidents });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

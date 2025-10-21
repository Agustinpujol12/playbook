// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { maps, strategies } from '../src/app/lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Empezando el proceso de seed...');

  console.log('🧹 Limpiando la base de datos...');
  await prisma.playerRole.deleteMany();
  await prisma.strategy.deleteMany();
  await prisma.map.deleteMany();

  console.log('🗺️ Creando mapas...');
  for (const map of maps) {
    await prisma.map.create({
      data: {
        id: map.id,
        name: map.name,
        colorHex: map.colorHex,
        imageUrl: map.imageUrl,
      },
    });
  }

  console.log('🎯 Creando estrategias...');
  for (const strategy of strategies) {
    await prisma.strategy.create({
      data: {
        id: strategy.id,
        name: strategy.name,
        description: strategy.description,
        side: strategy.side,
        category: strategy.category,
        videoUrl: strategy.videoUrl,
        hoverVideoUrl: strategy.hoverVideoUrl,
        grenadesNeeded: strategy.grenadesNeeded,
        alternatives: strategy.alternatives,
        map: {
          connect: { id: strategy.mapId },
        },
        playerRoles: {
          create: strategy.players.map(player => ({
            playerTag: player.playerTag,
            roleDescription: player.roleDescription,
          })),
        },
      },
    });
  }
  console.log('✅ Seed finalizado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
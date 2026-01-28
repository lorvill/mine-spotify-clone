import { prisma } from '../prisma-client.js'
import podcasts from './podcasts.json' with { type: 'json' }
import radioStations from './radioStations.json' with { type: 'json' }
import newReleases from './newReleases.json' with { type: 'json' }

async function main() {
  for (const podcast of podcasts) {
    await prisma.podcast.upsert({
      where: { title: podcast.title },
      create: podcast,
      update: podcast
    })
  }
  console.log(`Seeded ${podcasts.length} podcasts`)

  for (const station of radioStations) {
    await prisma.radioStation.upsert({
      where: { title: station.title },
      create: station,
      update: station
    })
  }
  console.log(`Seeded ${radioStations.length} radio stations`)

  for (const release of newReleases) {
    await prisma.newRelease.upsert({
      where: { title: release.title },
      create: release,
      update: release
    })
  }
  console.log(`Seeded ${newReleases.length} radio stations`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

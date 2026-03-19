import { prisma } from '../prisma-client.js'
import 'dotenv/config'

const ARTIST_NAME = 'Diaries Of A Hero'
const ALBUM_TITLE = 'Diaries Of A Hero'

const tracks = [
  { number: 1,  title: 'Intro',              duration: 62,  file: 'Intro.mp3' },
  { number: 2,  title: 'Solitude',           duration: 238, file: 'Solitude.mp3' },
  { number: 3,  title: 'Manimal',            duration: 239, file: 'Manimal.mp3' },
  { number: 4,  title: 'J5',                 duration: 223, file: 'J5.mp3' },
  { number: 5,  title: 'Throne',             duration: 320, file: 'Throne.mp3' },
  { number: 6,  title: 'Scarwhores',         duration: 218, file: 'Scarwhores.mp3' },
  { number: 7,  title: 'Highschool Funeral', duration: 247, file: 'Highschool Funeral.mp3' },
  { number: 8,  title: 'Get Away',           duration: 192, file: 'Get Away.mp3' },
  { number: 9,  title: 'Victims of Chaos',   duration: 238, file: 'Victims of Chaos.mp3' },
  { number: 10, title: 'Neruda',             duration: 225, file: 'Neruda.mp3' },
]

async function main() {
  await prisma.track.deleteMany({})
  const user = await prisma.user.upsert({
    where: { email: 'artist@example.com' },
    create: {
      email: 'artist@example.com',
      password: 'placeholder',
      username: ARTIST_NAME,
    },
    update: {},
  })

  const artist = await prisma.artist.upsert({
    where: { userId: user.id },
    create: { name: ARTIST_NAME, userId: user.id },
    update: { name: ARTIST_NAME },
  })

  let album = await prisma.album.findFirst({
    where: { title: ALBUM_TITLE, artistId: artist.id }
  })

  if (!album) {
    album = await prisma.album.create({
      data: {
        title: ALBUM_TITLE,
        cover: '/covers/DiariesOfAHero.png',
        artistId: artist.id
      }
    })
  }

  for (const track of tracks) {
    await prisma.track.upsert({
      where: { audioPath: `/tracks/${encodeURIComponent(track.file)}` },
      create: {
        number:    track.number,
        title:     track.title,
        duration:  track.duration,
        audioPath: `/tracks/${encodeURIComponent(track.file)}`,
        coverPath: '/covers/DiariesOfAHero.png',
        albumId:   album.id,
      },
      update: {
        title: track.title,
        number: track.number
      },
    })
  }

  const allUsers = await prisma.user.findMany({
    where: { id: { not: user.id } }
  })

  for (const user of allUsers) {
    await prisma.savedAlbum.upsert({
      where: { albumId_userId: { albumId: album.id, userId: user.id, } },
      create: { albumId: album.id, userId: user.id,  },
      update: {}
    })
  }

  console.log('Done')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
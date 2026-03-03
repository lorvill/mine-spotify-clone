<script setup lang="ts">
interface Category {
  title: string
  color: string
  image: string
}

const categories: Category[] = [
  {
    title: 'Music',
    color: '#DC148C',
    image: 'https://i.pinimg.com/736x/85/5d/0e/855d0ec36a3229824034f295dc929c59.jpg',
  },
  {
    title: 'Podcasts',
    color: '#006450',
    image: 'https://i.pinimg.com/736x/41/26/4e/41264e48966f4f0bc67f1a53ed0e893f.jpg',
  },
  {
    title: 'Live Events',
    color: '#8400E7',
    image: '/images/browse/live.jpg',
  },
  {
    title: 'Made For You',
    color: '#1E3264',
    image: '/images/browse/made-for-you.jpg',
  },
  {
    title: 'New Releases',
    color: '#E8115B',
    image: '/images/browse/new.jpg',
  },
  {
    title: 'Pop',
    color: '#148A08',
    image: '/images/browse/pop.jpg',
  },
  {
    title: 'Hip-Hop',
    color: '#BC5900',
    image: '/images/browse/hiphop.jpg',
  },
  {
    title: 'Rock',
    color: '#777777',
    image: '/images/browse/rock.jpg',
  },
  {
    title: 'Latin',
    color: '#E13300',
    image: 'https://i.pinimg.com/736x/8c/ab/3c/8cab3c0477e663b5738e4ed66c6249c2.jpg',
  },
  {
    title: 'Charts',
    color: '#8D67AB',
    image: '/images/browse/charts.jpg',
  },
  {
    title: 'Podcast Charts',
    color: '#0D72EA',
    image: '/images/browse/podcast-charts.jpg',
  },
  {
    title: 'Educational',
    color: '#503750',
    image: '/images/browse/education.jpg',
  },

  {
    title: 'Made For You',
    color: '#1E3264',
    image: '/images/browse/made-for-you.jpg',
  },
  {
    title: 'New Releases',
    color: '#E8115B',
    image: '/images/browse/new.jpg',
  },
  {
    title: 'Pop',
    color: '#148A08',
    image: '/images/browse/pop.jpg',
  },
  {
    title: 'Hip-Hop',
    color: '#BC5900',
    image: '/images/browse/hiphop.jpg',
  },
  {
    title: 'Rock',
    color: '#777777',
    image: '/images/browse/rock.jpg',
  },
]
</script>

<template>
  <section class="flex flex-col px-11">
    <div class="flex-1 overflow-y-auto pt-6 pb-10 space-y-6">
      <h2 class="text-2xl font-bold ml-1 mb-6">Browse all</h2>

      <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in categories"
          :key="item.title"
          class="relative h-[180px] rounded-xl overflow-hidden cursor-pointer"
          :style="{ backgroundColor: item.color }"
        >
          <h3 class="text-white text-2xl font-bold p-4 z-10 relative">
            {{ item.title }}
          </h3>

          <img
            :src="item.image"
            alt=""
            class="absolute w-[110px] bottom-[-10px] right-[-10px] rotate-[25deg] shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
</template>

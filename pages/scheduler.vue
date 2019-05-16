<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex v-for="(timeSlot, index) of this.timeSlots" :key="`2${timeSlot}`" xs2>
            <v-hover>
              <v-card ref="timeSlotCards" style="cursor: pointer;"
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
              >
                <v-card-text @click="setTimeSlot(timeSlot, index)" class="px-0">{{ timeSlot }}</v-card-text>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { SchedulerService } from '../services/scheduler'

export default {
  data () {
    return {
      schedulerService: SchedulerService,
      timeSlots: [],
      timeSlotCard: this.$refs.timeSlotCard,
      cardColor: 'primary'
    }
  },
  created () {
    this.getAvailableSalesTimeSlots()
  },
  methods: {
    async getAvailableSalesTimeSlots () {
      this.timeSlots = await this.schedulerService.getAvailableSalesTimeSlots()
      console.log('Inside Page this.timeSlots', this.timeSlots)
    },
    setTimeSlot (timeSlot, index) {
      // here
      // Change card background color
      // this.timeSlotCard = this.$refs.timeSlotCards[index]
      // this.timeSlotCard.color = this.cardColor
      // console.log('this.timeSlotCard', this.timeSlotCard)
    }
  }
}
</script>
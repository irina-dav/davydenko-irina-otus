<template>
  <v-app>
    <v-container fluid>
      <v-layout align-start justify-center>
        <v-form>
          <v-card align-center justify-center width="600">

            <v-toolbar color="indigo" dark>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
              <v-toolbar-title>Your settings</v-toolbar-title>
            </v-toolbar>

            <v-list-item three-line-line>
              <v-list-item-content>
                <v-list-item-title class="headline mt-5">Today is {{dayNum}} training day</v-list-item-title>
                <v-list-item-subtitle class="subtitle-2">Your last score: {{scoreDone}} out of {{scoreQnt}}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="subtitle-2">Accuracy: {{accuracy}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar tile><img :src="require('@/assets/abacus.png')"></v-list-item-avatar>
            </v-list-item>
            <v-divider></v-divider>
            <v-card-title class="headline">Adjust complexity and duration</v-card-title>

            <v-row>
              <v-flex md8>
                <v-slider :max="durationRange[1]" :min="durationRange[0]" class="align-center pa-6 pt-0 pb-0"
                          hide-details
                          v-model="duration">
                  <template v-slot:prepend>
                    <span class="text--darken-4 blue--text">{{ durationRange[0] }}</span>
                  </template>
                  <template v-slot:append>
                    <span class="text--darken-4 blue--text">{{ durationRange[1] }}</span>
                  </template>
                </v-slider>
              </v-flex>
            </v-row>

            <v-row class="pl-12 py-0">
              <p class="subtitle-2">Selected duration: {{duration}}</p>
            </v-row>

            <v-row class="my-0">
              <v-flex md8>
                <v-slider :max="complexityRange[1]" :min="complexityRange[0]" class="align-center pa-6 pt-0 pb-0"
                          hide-details v-model="complexity">
                  <template v-slot:prepend>
                    <span class="text--darken-4 blue--text">{{ complexityRange[0] }}</span>
                  </template>
                  <template v-slot:append>
                    <span class="text--darken-4 blue--text">{{ complexityRange[1] }}</span>
                  </template>
                </v-slider>
              </v-flex>
            </v-row>

            <v-row class="pl-12 py-0">
              <p class="subtitle-2">Selected complexity: {{complexity}}</p>
            </v-row>

            <v-divider></v-divider>

            <v-card-title class="headline">Select operations</v-card-title>

            <v-list :key="idx" v-for="(value, key, idx) in operations">
              <v-list-item class="py-0 my-0">
                <v-checkbox :label="key" class="py-0 my-0 text-capitalize shrink" v-model="operations[key]">
                </v-checkbox>
              </v-list-item>
            </v-list>

            <v-banner :value="!isAnyOperationChecked" color=purple--text single-line transition="slide-y-transition">
              At least one operation must be selected...
            </v-banner>

            <v-divider></v-divider>

            <v-card-actions>
              <v-layout align-baseline class="mr-2 ml-2" justify-end row>
                <div>
                  <v-btn :disabled="!isAnyOperationChecked" color="indigo" outlined tile
                         to="/train">
                    <v-icon left>mdi-pac-man</v-icon>
                    Play!
                  </v-btn>
                </div>
              </v-layout>
            </v-card-actions>

          </v-card>
        </v-form>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: "PageSettings",
    data() {
      return {
        accuracy: this.$store.state.settings.accuracy,
        scoreDone: this.$store.state.settings.scoreDone,
        scoreQnt: this.$store.state.settings.scoreQnt,
        dayNum: this.$store.state.settings.dayNum,
        duration: this.$store.state.settings.duration,
        complexity: this.$store.state.settings.complexity,
        operations: this.$store.state.settings.operations,
        durationRange: [1, 7],
        complexityRange: [1, 10],
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.dispatch('setSettings', {
        duration: this.duration,
        complexity: this.complexity,
        operations: this.operations
      });
      this.$store.dispatch('startGame');
      next();
    },
    computed: {
      isAnyOperationChecked() {
        return Object.values(this.operations).some(v => v);
      }
    }
  }
</script>

<style scoped>
</style>
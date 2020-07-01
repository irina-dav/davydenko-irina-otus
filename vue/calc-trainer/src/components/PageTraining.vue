<template>
  <v-app>
    <v-container fluid>
      <v-layout align-start justify-center>
        <v-form>
          <v-card align-center justify-center max-width="600">
            <v-toolbar color="indigo" dark>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
              <v-toolbar-title>Training: task {{id+1}} of {{duration}}</v-toolbar-title>
            </v-toolbar>

            <v-divider></v-divider>

            <v-alert :value="done" class="pa-1 ma-1" outlined text transition="scale-transition" type="success">Done!
            </v-alert>
            <v-alert :value="fail" class="pa-1 ma-1" outlined transition="scale-transition" type="warning">Nice try, but
              no...
            </v-alert>
            <v-alert :value="showHint" class="pa-1 ma-1" outlined transition="scale-transition" type="info">
              {{fullExpression}}
            </v-alert>

            <v-row class="align-baseline" justify="center">
              <v-list :key="idx" v-for="(elem, idx) in expressionObj">
                <v-list-item v-if="elem.type ==='unknown'">
                  <v-text-field :id="`num${idx}`" @focus="rememberInputFocus($event)" autofocus
                                class="ma-0 pl-1 pr-0"
                                type="number" v-model="elem.val" validate-on-blur></v-text-field>
                </v-list-item>
                <v-list-item class="ma-0 pl-1 pr-0" v-else>
                  <span>{{elem.val}}</span>
                </v-list-item>
              </v-list>
            </v-row>

            <v-divider></v-divider>

            <v-row class="pa-6" justify="center">
              <v-col :key="idx" cols="3" v-for="(n, idx) in buttons">
                <v-row align="center" class="fill-height" justify="center">
                  <v-tooltip right :disabled="!tooltips.get(n)">
                    <template v-slot:activator="{ on }">
                      <div v-on="on">
                        <v-btn :color="(idx + 1) % 4 === 0 ? 'grey' : 'green lighten-1'" :dark="!disabledFigure(n)"
                               :disabled="disabledFigure(n)" @click.native="clickBtnFigure(n)" fab
                               v-if="n > ' '">
                          {{ n }}
                        </v-btn>
                      </div>
                    </template>
                    <span>{{tooltips.get(n)}}</span>
                  </v-tooltip>
                </v-row>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-layout justify="center" pa-2 row>
              <v-flex pa-2>
                <v-progress-linear :value="progress" color="lighten-2 indigo"></v-progress-linear>
              </v-flex>
            </v-layout>

            <v-divider></v-divider>

            <v-card-actions>
              <v-layout align-baseline color="purple" justify-space-between ml-2 mr-2 row>
                <v-card color="purple--text" flat v-if="!stop">
                  {{timeLeft }}
                </v-card>
                <v-card color="purple--text" flat v-else>
                  {{stopReason}}
                </v-card>
                <v-card flat>
                  <v-btn color="indigo" outlined tile to="/settings">
                    <v-icon left>mdi-exit-run</v-icon>
                    Exit
                  </v-btn>
                </v-card>
              </v-layout>
            </v-card-actions>

          </v-card>
        </v-form>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import moment from "moment";

  export default {
    name: "PageTraining",
    data() {
      return {
        id: 0,
        progress: 0,
        date: moment(60 * this.$store.state.settings.duration * 1000),
        duration: this.$store.state.settings.duration,
        lastFocusedInput: null,
        interval: null,
        done: false,
        fail: false,
        showHint: false,
        stop: this.doneCount < this.duration,
        stopReason: '',
        minId: this.$store.getters.minId,
        maxId: this.$store.getters.maxId,
        buttons: "123<456>789? 0 =".split(""),
        tooltips: new Map([
          ['<', 'Previous task'],
          ['>', 'Next task'],
          ['?', 'Show/hide hint'],
          ['=', 'Check this expression']
        ])
      }
    },
    watch: {
      id: function (val) {
        this.done = this.$store.getters.getTask(val).done;
      },
      done: function (val) {
        this.fail = false;
        this.showHint = false;
      },
    },
    methods: {
      rememberInputFocus: function (event) {
        this.lastFocusedInput = event.target;
      },
      disabledFigure: function (figure) {
        if (figure === '>') return this.id === this.maxId;
        else if (figure === '<') return this.id === this.minId;
        else if (figure === '=') return this.expressionObj.some(e => e.val == '');
        else return false;
      },
      clickBtnFigure: function (figure) {
        if (!isNaN(figure)) {
          let idxFocusedInput = +this.lastFocusedInput.id.replace('num', '')
          let newInputValue = this.expressionObj[idxFocusedInput].val + figure;
          this.expressionObj[idxFocusedInput].val = newInputValue;
        } else if (figure === '=') {
          let expr = this.expressionObj.map(e => e.val.trim()).join('');
          this.done = this.$store.getters.checkExpression(expr);
          this.fail = !this.done;
          if (this.done) {
            this.$store.dispatch('setDone', this.id);
            if (this.doneCount === this.duration) {
              this.stop = true;
              this.stopReason = 'All tasks are done!';
            }
            this.progress = 100 * (this.doneCount / this.duration);
          }
        } else if (figure === '>') {
          this.id++;
        } else if (figure === '<') {
          this.id--;
        } else if (figure === '?') {
          this.showHint = !this.showHint;
        }
      }
    },
    computed: {
      doneCount: function () {
        return this.$store.getters.getDoneTasksCount;
      },
      taskExpression: function () {
        return this.$store.getters.getTask(this.id).quest;
      },
      fullExpression: function () {
        return this.$store.getters.getTask(this.id).full;
      },
      expressionObj: function () {
        let exprToParse = this.done ? this.fullExpression : this.taskExpression;
        const expr = [];
        for (let val of exprToParse.split(' ')) {
          val = val.trim();
          let type = 'number';
          if ('+*/-^'.indexOf(val) > 0)
            type = 'operator';
          else if (val === 'x') {
            val = '';
            type = 'unknown';
          }
          expr.push({val, type});
        }
        return expr;
      },
      timeLeft: function () {
        return this.date.format("mm:ss");
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        if (!this.stop)
          this.date = moment(this.date.subtract(100, "millisecond"));
        if (this.date.format("mm:ss") === '00:00') {
          this.stop = true;
          this.stopReason = 'The time is up :(';
        }
      }, 100);
    },
    beforeDestroy() {
      clearInterval(this.interval);
    }
  };
</script>

<style scoped>
  .v-text-field {
    width: 70px;
  }
</style>
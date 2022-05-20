<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-0">
        <h1 class="display-2 font-weight-bold mb-3">WIP</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-if="store.getters.user" lg="5" md="12" sm="12">
        <InfoPanel></InfoPanel>
      </v-col>
      <v-col
        v-if="recentSessions.length > 0"
        lg="7"
        md="12"
        sm="12"
        align="center"
      >
        <v-row justify="center" class="mb-5">
          <v-col align="left">
            <h2>RECENT UPLOADS</h2>
          </v-col>
          <v-spacer></v-spacer>
          <v-col align="right">
            <v-btn color="success">Refresh</v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" class="align-baseline">
          <EncounterCard
            class="mb-2"
            v-for="session in recentSessions"
            :key="session.id"
            :session="session"
          ></EncounterCard>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCookies } from "vue3-cookies";
import { useStore } from "vuex";

import InfoPanel from "@/components/home/info.component.vue";
import EncounterCard from "@/components/home/encounter.component.vue";
import { Session } from "@/interfaces/session.interface";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "HomePage",
  components: {
    InfoPanel,
    EncounterCard,
  },
  setup() {
    const store = useStore();
    const { cookies } = useCookies();
    return { store, cookies };
  },
  data() {
    return {
      revealToken: false,
      recentSessions: [] as Session[],
    };
  },
  methods: {
    emit: function (event: string) {
      this.$io.emit(event, {}, (res: unknown) => {
        if (res) console.log(res);
      });
    },
    getTokensWS: function () {
      this.store.commit("setPageLoading", true);
      this.store
        .dispatch("getTokensWS")
        .then(async () => {
          this.store.commit("setPageLoading", false);
        })
        .catch(() => {
          this.store.commit("setPageLoading", false);
        });
    },
    getTokensHTTP: function () {
      this.store.commit("setPageLoading", true);
      this.store
        .dispatch("getTokensHTTP")
        .then(() => {
          this.store.commit("setPageLoading", false);
        })
        .catch(() => {
          this.store.commit("setPageLoading", false);
        });
    },
    log: function (text: object | string) {
      console.log(text);
    },
  },
});
</script>

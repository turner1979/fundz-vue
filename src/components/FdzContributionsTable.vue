<template>
  <div class="fdz-contribution-table">
    <p><strong>Contributions</strong></p>
    <template v-if="fund.contributions">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let contribution of fund.contributions">
            <td>{{ contribution.date }}</td>
            <td>{{ contribution.name }}</td>
            <td>£{{ contribution.amount }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <FdzMessage v-bind:options="{ text: ['This fund has no contributions yet.'], type: 'info' }"></FdzMessage>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import FdzMessage from '../components/FdzMessage.vue'
import { FdzFundModel } from '../models'

@Component({
  components: {
    FdzMessage
  }
})
export default class FdzContributionsTable extends Vue {
  @Prop() fund!: FdzFundModel
}
</script>

<style scoped lang="scss">
@import '@/styles/FdzStyles';

$formInputColour: $colourGallery;
$tableBorderColour: $colourGallery;

p {
  @include fdz-font(14);

  strong {
    @include fdz-font(14, $colourMineShaft, 600);
  }
}

a {
  @include fdz-font(14);
  text-decoration: underline;
  display: inline-block;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
}

table {
  width: 100%;
  text-align: left;
  border: 1px solid darken($tableBorderColour, 10%);

  thead {
    background: $colourBoulder;
    border: 1px solid $colourBoulder;
    tr {
      th {
        @include fdz-font(14, $colourWhite, 600);
        padding: 8px;
        &:nth-child(3) {
          text-align: right;
        }
      }
    }
  }

  tbody {
    tr {
      background: lighten($tableBorderColour, 10%);
      td {
        @include fdz-font(14);
        padding: 8px;
        &:nth-child(1) {
          width: 25%;
        }
        &:nth-child(2) {
          width: 50%;
        }
        &:nth-child(3) {
          width: 25%;
          text-align: right;
        }
      }

      &:nth-child(even) {
        background: $tableBorderColour;
      }
    }

  }
}
</style>

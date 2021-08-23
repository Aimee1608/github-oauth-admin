<template>
  <div class="info-item"
       v-for="item in githubInfo">
    <div class="info-key">{{item.key}}</div>
    <div class="info-value">{{item.value}}</div>
  </div>
</template>

<script>
export default {
  props: {
    githubInfo: {
      type: Array,
      default: []
    }
  }
}
</script>

<style>
.github-info {
  /* width: 100%; */
  height: auto;
  padding: 20px;
  border: 1px solid #efefef;
}
.info-item {
  margin-bottom: 10px;
  text-align: left;
  display: flex;
}
.info-key {
  margin-right: 10px;
  color: #42b983;
  width: 200px;
  text-align: right;
}
</style>

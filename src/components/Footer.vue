<template>
  <div class="max-width">
    <div class="footercontent">{{ msg }}</div>
  </div>
</template>

<style>
.footercontent{
  padding-left: 30px;
  line-height: 30px;
  text-align:left
}
</style>

<script>
export default {
  name: "Footer",
  props: {
    msg: String
  }
};
</script>
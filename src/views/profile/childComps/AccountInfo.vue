<template>
  <div class="account">
    <div class="account-item">
      <div class="number">
        <span class="balance">0.00</span>
      </div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>
      </div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>
      </div>
      <div class="account-info">我的积分</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.account{
  display: flex;
}
.account-item{
  width: 100%;
  flex: 1;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}
.account-item:last-child{
  margin-right: 0;
}
.account-item{
  color: #666;
  font-size: 13px;
  padding: 18px;
}
.account-item .balance{
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.account-info {
    margin-top: 6px;
  }
</style>

<template>
  <el-container id="app">
    <el-header id="header" height="50px">
      <Header/>
    </el-header>
    <div class="midwrapper" >
      <div class="top-banner"></div>
      <div class='tit-line'>
        <span class="tit" style="font-size: 38px;">{{user.name?"设置":"注册"}}</span>
      </div>
      <div class="form-box">
        <Update v-if="user.name"/>
        <Register v-else/>
      </div>
    </div>
    <Footer/>
  </el-container>
</template>

<script>
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Register from '../../components/Register'
import Update from '../../components/Update'
export default {
    name:'logup',
    mounted () {
        this.user=JSON.parse(window.localStorage.getItem('user'))||{}
    },
    data () {
        return {
            user:{}
        }
    },
    components: {
        Header,Footer,Register,Update
    }
}
</script>

<style scoped lang="less">
  #app{
    height: 100%;
    width: 100%;
     #header{
     background-color: rgba(255,165,0,.5);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
     }
     .midwrapper{
       .tit-line{
          width: 980px;
          height: 28px;
          margin: 0 auto;
          border-bottom: 1px solid rgba(0,0,0,.2);
          margin-bottom: 28px;
          text-align: center;
          .tit{
            height: 56px;
            line-height: 56px;
            margin: 0 auto;
            padding: 0 20px;
            font-size: 40px;
            background: #fff;
            text-align: center;
          }
       }
       .top-banner{
        background: rgb(245,245,245);
        height: 10px;
        margin-bottom: 20px;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.08);
       }
       .form-box{
          width: 420px;
          margin: 0 auto;
          padding: 30px 0;
       }
     }
    }
</style>
 
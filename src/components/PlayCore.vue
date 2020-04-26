<template>
  <div  class="wrapper" >
    <transition-group name="playIn">
      <div class="play-wrapper" v-if="isPlay" key="playW">
        <div class="left-hand" ref="leftHand" >
          <canvas ref="leftCan"></canvas>
        </div>
        <div class="mid-player" >
            <VideoPlayer class="videoBox" 
            @sidePlay="handlePlay" 
            :danmuObj="danmuObj" 
            @loaded="changeLoaded"
            :openDanmu="openDanmu"
            >
              <i class="el-icon-back" @click.stop="isPlay=false" slot="playI"></i>
            </VideoPlayer>
            <div class="danmuBox">
              <div class="littleBox">
                <el-switch v-model="openDanmu"></el-switch>
                <span class="title">{{openDanmu?'关闭弹幕':'开启弹幕'}}</span>
              </div>
              <div class="littleBox">
                <span class="title">选择颜色</span> 
                <el-color-picker v-model="color" size="mini"></el-color-picker>
              </div>
              <div class="littleBox">
                <span class="title">字体大小</span> 
                <el-input-number style="width:80px"
                v-model="fontSize"  
                :min="16" 
                :max="40" 
                size="mini" 
                controls-position="right"></el-input-number>
              </div>
              <div class="littleBox"> 
                <el-input
                  type="text"
                  placeholder="请输入内容"
                  v-model="danmuText"
                  maxlength="30"
                  show-word-limit
                  clearable
                  size="small"
                  style="width:320px"
                  @keyup.enter.native="addDanmu"
                />
                <el-button size="small" @click="addDanmu" >发送</el-button>
              </div>
            </div>
        </div>
        <div class="right-hand" ref="rightHand" >
          <canvas ref="rightCan"></canvas>
        </div>
      </div>
        <el-carousel :interval="4000" type="card" v-if="!isPlay" :height="`${cHeight}px`" key="caW">
              <el-carousel-item v-for="(item,index) in 5" :key="index" >
                <img :src="data[index].imgUrl" :alt="index"  ref="images" />
                <canvas class="canvas" ref="can" @mousemove="handleMove(index,$event)" @mouseleave="handleLeave(index)" ></canvas>
                <el-tooltip effect="light" content="点击播放" placement="top">
                  <i class="el-icon-video-play playArrow" @click="isPlay=true"></i>
                </el-tooltip>
              </el-carousel-item>
        </el-carousel>
    </transition-group> 
  </div>
</template>

<script>
import Data from '../assets/data'
import Water from '../utils/water'
import {rect} from '../utils/rect'
import VideoPlayer from '../components/videoPlayer'

export default {
  components: {
    VideoPlayer
  },
  data () {
    return {
      isPlay:false,
      data:Data.MVs,
      water:[],
      play:false,
      danmuText:'',
      openDanmu:true,
      color:'#fff',
      fontSize:18,
      danmuObj:{},
      videoLoaded:false,
      cHeight:document.body.clientHeight>700?560:360 //轮播图高度
    }
  },
  mounted () {
     //设置canvas宽高
    this.$nextTick(()=>{
      const {can,images}=this.$refs
        for (let index = 0; index < 5; index++) {
          can[index].width=images[index].clientWidth
          can[index].height=images[index].clientHeight
          this.water.push(Water(can[index]))
        }
    })
  },
  //设置canvas宽高
  updated () {
    this.$nextTick(()=>{
      const {can,images}=this.$refs
       const timer= setTimeout(() => {
          if(images.length){
              for (let index = 0; index < 5; index++) {
                can[index].width=images[index].clientWidth
                can[index].height=images[index].clientHeight
                this.water.push(Water(can[index]))
              }
          }else{
            this.water=[]
          }
          clearTimeout(timer)
          }, 1500)
      })
  },
  methods: {
    //开启指针移动效果
    handleMove(index,e){
        this.water[index].disturb(e.offsetX,e.offsetY)
    },
    handleLeave(index){
         this.water[index].clear()
    },
    //开启左右效果
    handlePlay(bool){
      this.play=bool
      if(!this.play){
        this.timer&&clearInterval(this.timer)
        this.timer2&&clearInterval(this.timer2)
        }
      this.timer= rect(this.$refs.leftCan,this.play)
      this.timer2= rect(this.$refs.rightCan,this.play)
    },
    //添加弹幕
    addDanmu(){
        const {danmuText,color,fontSize}=this
        if(!danmuText){
          this.$message({message:'内容不能为空',type:'warning'})
          return
        }
        if(!this.videoLoaded){
          this.$message({message:'视频正在加载中',type:'warning'})
          return
        }
        this.danmuObj={text:danmuText,color,fontSize}
        this.danmuText=''
        this.$message({message:'发送成功',type:'success'})
    },
    changeLoaded(){
      this.videoLoaded=true
      this.$refs.leftCan.width=document.body.clientWidth/4
      this.$refs.leftCan.height=this.$refs.leftHand.clientHeight
      this.$refs.rightCan.width=document.body.clientWidth/4
      this.$refs.rightCan.height=this.$refs.rightHand.clientHeight
    }
  }
}
</script>

<style scoped lang="less">
.playIn-enter{
  width:0;
  opacity: 0;
}
.playIn-enter-active{
  transition: all 1.5s  cubic-bezier(0.075, 0.82, 0.165, 1);
}
.playIn-enter-to{
  width: 100%;
  opacity: 1;
}
@media screen and (min-height:700px){
  .wrapper{
    height: 600px;
    .videoBox{
      height: 560px;
    }
  }
}
@media screen and (max-height:700px){
  .wrapper{
    height: 400px;
    .videoBox{
      height: 360px;
    }
  }
}
.wrapper{
  padding: 0;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.08);
  margin: 10px 0 20px 0;
  box-sizing: border-box;
  background:linear-gradient(to top,black,rgba(61, 23, 117, 0.801),rgba(0,0,0,0));
  .play-wrapper{
    margin: 0 auto;
    display: flex;
    height: 100%;
    .left-hand{
      flex:1;
      height: 100%;
    }
    .mid-player{
      flex:2;
      position: relative;
      background: white;
      .danmuBox{
        height: 40px;
        display: flex;
        font-size: 10px;
        align-items:center;
        justify-content: space-around;
        .littleBox{
          display: flex;
          align-items: center;
          .title{
            margin: 0 5px;
            width: 2em;
          }
        }
      }
      .videoBox{
        margin: 0;
        &:hover{
          i{
            opacity: 1;
          }
        }
        i{
          font-size: 25px;
          position: absolute;
          right: 10px;
          top: 10px;
          color: rgba(255,255,255,.8);
          opacity: 0;
          z-index: 5;
          &:hover{
            color: white;
            cursor: pointer;
          }
        }
      }
    }
    .right-hand{
      height: 100%;
      flex:1;
    }
  }
}
  .el-carousel__item{
      &:hover{
        .playArrow{
          opacity: 1;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
      .canvas{
        position: absolute;
        top:0;
        left: 0;
      }
      .playArrow{
        position: absolute;
        top:50%;
        left: 50%;
        font-size: 60px;
        transform: translate3d(-50%,-50%,0);
        color: rgba(255,165,0, 0.5);
        opacity: 0;
        &:hover{
          color: orange;
        }
      }
  } 
</style>
 
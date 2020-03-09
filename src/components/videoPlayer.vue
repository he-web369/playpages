<template>
  <div class="wrapper">
    <slot name="playI"></slot>  
    <video autobuffer 
    @loadedmetadata="handleLoad"
    @play="changeSide"
    @pause="changeSide"
    ref="video" 
    src='http://ugcws.video.gtimg.com/a0030gx4tyv.m301.mp4?vkey=3007C908BD066E6774E2013903EA1BF6DF2848E071CCDD48479AA669A2C03475C7586AAE13E42B7DC54D7C24761EDF98F84A181843394985D653C804396740C5B49C87CFEF2DDD9F3B625D6897C3A003A6763B49EFC03CCEAC7F4371298D6AB26BDA76A7D3924121313A84DB75A50AA8'
    class="video" controls  
    loop
    >您的浏览器不支持HTML5
    </video>  
    <canvas ref="videoCan" class="videoCan" @click.stop="togglePlaying" v-show="openDanmu"></canvas>
    <span class="right-play-icon" v-show="!isPlaying" @click="togglePlaying">
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><filter x="-11.2%" y="-10.8%" width="122.4%" height="125.5%" filterUnits="objectBoundingBox" id="pid-108-svgo-a"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" in="shadowBlurOuter1"></feColorMatrix></filter><path d="M52.352 13.5c4.837 0 8.707 4.32 8.647 9.72v21.06C61 49.62 57.128 54 52.29 54h-2.479c0 1.681-1.452 3-3.206 3S43.4 55.62 43.4 54H20.841c0 1.681-1.452 3-3.204 3-1.756 0-3.206-1.38-3.206-3h-2.722C6.87 54 3 49.68 3 44.28V23.22c0-5.4 3.87-9.72 8.709-9.72h11.25l-4.78-4.44c-.725-.661-.725-1.8 0-2.52.424-.36.908-.54 1.391-.54.546 0 1.029.18 1.392.54l7.5 6.96h7.318l7.5-6.96c.422-.36.907-.54 1.39-.54.544 0 1.029.18 1.392.54.725.659.725 1.8 0 2.52l-4.78 4.44h11.07zM26.527 45.54l17.418-10.08c1.45-.901 1.45-2.221 0-3.122L26.527 22.2c-1.452-.84-2.662-.12-2.662 1.56v20.22c0 1.74 1.21 2.4 2.662 1.561z" id="pid-108-svgo-b"></path></defs><g fill="none" fill-rule="evenodd"><use fill="#000" filter="url(#pid-108-svgo-a)" xlink:href="#pid-108-svgo-b"></use><use fill-opacity=".7" fill="#FFF" xlink:href="#pid-108-svgo-b"></use><path d="M26.527 45.541c-1.452.84-2.662.18-2.662-1.56V23.76c0-1.68 1.21-2.4 2.662-1.56L43.945 32.34c1.45.9 1.45 2.22 0 3.121L26.527 45.541z" fill="#000" opacity=".06"></path></g></svg>
    </span>
  </div>
</template>

<script>
import {initRenderDanmu} from '../utils/rect'

export default {
    props: ['danmuObj','openDanmu'],
    data () {
        return {
            volume:0.3,//音量
            isPlaying:false,
            danmuS:this.danmuObj
        }
    },
    //初始化canvas、danmu
    mounted () {
        this.$refs.video.volume=this.volume
        const timer=setTimeout(() => {
            this.$refs.videoCan.width=this.$refs.video.clientWidth
            this.$refs.videoCan.height=300
            this.danmuMethods= initRenderDanmu(this.$refs.videoCan,this.$refs.video)
            clearTimeout(timer)
        }, 1500)
    },
    //添加danmu
    updated () {
      if(!this.danmuObj.text)return
        if(this.danmuS!==this.danmuObj){
            this.danmuObj.time=this.$refs.video.currentTime
            this.danmuMethods.add(this.danmuObj)
            this.danmuS=this.danmuObj
        }
    },
    methods: {
        handleLoad(){
            this.$emit('loaded')
        },
        changeSide(){
            this.isPlaying=!this.isPlaying
            this.$emit('sidePlay',this.isPlaying)
            if(this.isPlaying){
                this.danmuMethods.getVideoState(false)
                 this.danmuMethods.render()
            }else{
                this.danmuMethods.getVideoState(true)
            }
        },
        togglePlaying(){
            if(!this.isPlaying){
               this.$refs.video.play()
            }else{
               this.$refs.video.pause()
            }
        }
    }
   
}
</script>

<style scoped lang="less">
.wrapper{
    .video{
        width: 100%;
        height: 100%;
        object-fit:fill;
        outline: none;
        cursor: pointer;
    }
    .videoCan{
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
    }
    .right-play-icon{
        position: absolute;
        bottom: 30%;
        right:5%;
        cursor: pointer;
    }
   
}

</style>
 
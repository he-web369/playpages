<template>
  <div class="video-page-card">
      <div class="card-box">
            <div class="pic-box">
                <div class="pic">
                    <img :src="boxData[index].imgUrl" width="141" height="80" alt="post">
                </div>
                <span class="duration">{{boxData[index].duration}}</span>
             </div>
            <div class="info">
                <a href="javascript:;" title="欧美全家桶" class="title">{{boxData[index].name}}</a>
                <div class="count up">
                    <a href="javascript:;" class="auth" title="作者" >{{boxData[index].author}}</a>
                </div>
                <div class="count">
                    {{boxData[index].plays}}播放&nbsp;·&nbsp;{{boxData[index].damu}}弹幕
                </div>
            </div>
         </div>
      </div>
</template>

<script>
import Data from '../assets/data'
export default {
   props: ['index'],
    data () {
        return {
            boxData:Data.MVs
        }
    }

}
</script>

<style scoped lang="less">
 .video-page-card{
     padding: 6px 0;
     .card-box{
         display: flex;
         .pic-box{
            position: relative;
            width: 141px;
            height: 80px;
            border-radius: 2px;
            background: #f4f5f7;
            &:hover{
                cursor: pointer;
                .duration{
                     opacity: .8;
                }
            }
            .pic{
                position: relative;
                overflow: hidden;
                border-radius: 2px;
                width: 141px;
                height: 80px;
            }
            .duration{
                font-size: 12px;
                opacity: 0;
                position: absolute;
                bottom: 2px;
                left: 6px;
                color: #fff;
                height: 12px;
                line-height: 12px;
                padding: 0 5px 1px 0;
                transition: all .3s;
                z-index: 5;
            }
         }
         .info{
             margin-left: 10px;
            flex: 1;
            font-size: 0;
            .title{
                height: 36px;
                line-height: 18px;
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 6px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                color: #222;
                text-decoration: none;
                &:hover{
                        color: orange;
                    }
            }
            .up{
                width: 160px;
                margin-bottom: 4px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                .auth{
                    color: #999;
                    text-decoration: none;
                    &:hover{
                        color: orange;
                    }
                }
            }
            .count{
                display: inline-block;
                height: 16px;
                width: 100%;
                color: #999;
                font-size: 12px;
            }
         }
     }
 }
</style>
 
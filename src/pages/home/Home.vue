<template>
  <el-container id="app">
    <el-header id="header" height="50px">
     <Header/>
    </el-header>
    <el-main class="mainContiner">
        <PlayCore/>
      <div class="footerContainer">
        <div class="left-box">
            <el-divider content-position="left" ><span class="introduction">简介</span> </el-divider>
            <div class="introduceBox">
              <div class="infoBox" ref="infoBox">
                <el-divider content-position="left" ><span class="introduction-inner">作词</span> </el-divider>
                <p class="introduceBox-p">Mario</p>
                <el-divider content-position="left" ><span class="introduction-inner">作曲</span> </el-divider>
                <p class="introduceBox-p">Mario</p>
                <el-divider content-position="left" ><span class="introduction-inner">演唱</span> </el-divider>
                <p class="introduceBox-p">Mario</p>
                <el-divider content-position="left" ><span class="introduction-inner">所属专辑</span> </el-divider>
                <p class="introduceBox-p">LoversAndFriends</p>
                <el-divider content-position="left" ><span class="introduction-inner">背景故事</span> </el-divider>
                <p class="introduceBox-p">一个地方的名字，总是蕴藏着其独有的人文历史底蕴。然而，随着经济生活的发展，不少历史文化却出现了断层，没有了延续。有的彻底消失在历史的进程中，如《消失的成都：听听东垣街的无声呐喊》一文所述，恐怕知道“西城大丘”——陈东垣的成都人已经没有几个；也有的在人们的口口相传中，变得面目全非。</p>
              </div>
              <el-switch
                v-model="open"
                :active-text="open?'关闭':'展开'"
                @change="handlechange"
                >
              </el-switch>
            </div>
            <el-divider content-position="left" ><span class="introduction">评论</span> </el-divider>
            <div class="commentBox">
              <el-divider content-position="left" ><span style="font-size:18px">添加评论</span> </el-divider>
              <AddComment @jumper="jumper"/>
              <el-divider content-position="left" ><span style="font-size:18px">评论列表</span> </el-divider>
              <div class="pageBox">
                <el-pagination
                  small
                  background
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="4"
                  layout="prev, pager, next"
                  :total="comments.length">
                </el-pagination>
              </div>
              <el-tabs v-model="activeName" >
                <el-tab-pane label="按热度排序" name="first" >
                  <div class="commitList" v-if="activeName==='first'">
                    <Comment v-for="(comment,index) in currentStarShow" :key="index" :comment="comment" ref="comChild"/>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="按时间排序" name="second" >
                  <div class="commitList" v-if="activeName==='second'">
                    <Comment v-for="(comment,index) in currentDateShow" :key="index" :comment="comment" ref="comChild"/>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <div class="pageBox">
                <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="4"
                  layout="total,prev, pager, next, jumper"
                  :total="comments.length">
                </el-pagination>
              </div>
               <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
              <AddComment @jumper="jumper" /> 
            </div>
        </div>
        <div class="right-box">
          <el-divider content-position="left" ><span style="font-size:20px">更多</span> </el-divider>
          <div class="moreBox">
            <MoreMV v-for="(item,index) in 10" :key="index" :index="index"/>
            <i class="el-icon-refresh refresh" @click="refresh" v-if="!isRefresh"></i>
            <i class="el-icon-loading refresh" @click="refresh" v-else></i>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'

import Header from '../../components/Header'
import PlayCore from '../../components/PlayCore'
import Comment from '../../components/Comment'
import AddComment from '../../components/AddComment'
import MoreMV from '../../components/MoreMV'
export default {
   components: {
     Header,PlayCore,Comment,AddComment,MoreMV
   },
   mounted () {
    this.getComments()
    this.currentDateShow=this.dateSortComments.slice(0,4)
    this.currentStarShow=this.starSortComments.slice(0,4)
   },
   data () {
     return {
       open:false,
       textInput:'',
       currentDateShow:[],
       currentStarShow:[],
       currentPage:1,
       activeName:'first',
       isRefresh:false
     }
   },
   computed: {
     ...mapState(['comments']),
     ...mapGetters(['dateSortComments','starSortComments'])
   },
   methods: {
     ...mapActions(['getComments','addComment']),
     handlechange(open){
       if(open){
         this.$refs.infoBox.style.height="auto"
       }else{
         this.$refs.infoBox.style.height="100px"
       }
     },
     handleCurrentChange(page){
       this.currentPage=page
       this.jumper()
     },
     //获得跳转页面的评论
     jumper(page=this.currentPage){
       if(page===Math.ceil(this.comments.length/4)){
         this.currentDateShow=this.dateSortComments.slice((page-1)*4,this.dateSortComments.lenth)
         this.currentStarShow=this.starSortComments.slice((page-1)*4,this.starSortComments.lenth)
       }else{
         this.currentDateShow=this.dateSortComments.slice((page-1)*4,page*4)
         this.currentStarShow=this.starSortComments.slice((page-1)*4,page*4)
       }
       for (let index = 0,len=this.$refs.comChild.length; index < len; index++) {
         this.$refs.comChild[index].openList=false
       }
     },
     refresh(){
       this.isRefresh=!this.isRefresh
       setTimeout(() => {
       this.isRefresh=!this.isRefresh
       }, 1000);
     }
   }
}
</script>

<style scoped lang="less">
.emojiBox{
  font-size: 12px;
  font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
  color: #222;
  overflow: visible;
  background: #fff;
  border: 1px solid #e5e9ef;
  box-shadow: 0 11px 12px 0 rgba(106,115,133,.3);
  border-radius: 8px;
  margin-top: 7px;
  margin-bottom: 10px;
  width: 363px;
  .emoji-wrap{
    margin: 6px 11px 0;
    height: 196px;
    font-size: 0;
    overflow: auto;
    word-break: break-word;
    .emojiImg{
        color: #111;
        border-radius: 4px;
        display: inline-block;
        padding: 3px 5px;
        outline: 0;
        text-decoration: none;
        margin: 4px;
        cursor: pointer;
        &:hover{
          background: rgba(0,0,0,.3);
        }
    }
  }
}

  #header{
    background-color: rgba(61, 23, 117, 0.5);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  }
  .mainContiner{
    padding: 0;
    .footerContainer{
      .left-box{
        float: left;
        width:70%;
        .introduction{
          font-size: 20px;
        }
        .introduceBox{
          width:600px;
          margin:0 80px;
          .infoBox{
            height: 100px;
            overflow: hidden;
            padding-bottom: 20px;
            margin-top: -30px;
            .introduction-inner{
              font-size: 14px;
            }
            .introduceBox-p{
              text-indent: 1em;
              font-size: 12px;
              margin:-15px 0 -12px 40px;
              border-bottom: 1px solid rgba(0,0,0,.2);
              &:not(:last-of-type):hover{
                cursor: pointer;
                color: orange;
                text-decoration: underline;
              }
            }
          }
        }
        .commentBox{
          width: 80%;
          margin: 0 auto ;
          .commitList{
            margin:0 0 5px 0;
            border: 2px solid rgba(255,165,0,.5);
            border-radius: 20px;
            padding: 20px;
            font-size: 14px;
          }
          .pageBox{
            text-align: end;
          }
          .addCommit{
            display: flex;
            margin-bottom: 50px;
            .avatar{
              margin: 10px ;
            }
            .editor{
              display: flex;
              align-items: center;
              position: relative;
              .inputArea{
                border-radius: 5px;
                 resize:none;
                 outline:none;
                 padding: 5px;
                 background: rgba(0,0,0,.1);
                 &:hover,&:focus{
                   border-color: orange;
                   background: white;
                 }
              }
              .addBtn{
                height: 100%;
                width: 60px;
                margin: 0 5px;
                color: rgb(245,245,245);
                background: rgba(255,165,0,.9);
                border-radius: 5px;
                padding:10px;
                outline:none;
                cursor: pointer;
              }
              .emoji{
                padding: 5px;
                position: absolute;
                bottom: -30px;
                border: 1px solid rgba(0,0,0,.4);
                border-radius: 8px;
                font-size: 12px;
                &:hover{
                  cursor: pointer;
                  background: rgba(0,0,0,.4);
                }
              }
            }
          }
        }
      }
      .right-box{
        box-sizing: border-box;
        float: right;
        width: 30%;
        margin-top:24px;
        .moreBox{
          margin: 10px;
          .refresh{
           margin: 10px 120px;
           color: rgba(106,115,133,.8);
           cursor: pointer;
           font-size: 25px;
          }
        }
      }
    }
  }
</style>
 
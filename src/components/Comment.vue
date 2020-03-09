<template>
  <div class="comment-wrapper">
    <div class="avatar">
      <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
      <p style="text-align:center">{{comment.name}}</p>
    </div>
    <div class="comment-content">
      <p class="comment-p"  v-html="content"></p>
      <div class="comment-tools">
        <i class="el-icon-star-on icon-i" v-if="comment.stars.includes(user.name)" @click="toggleGood">{{comment.stars.length}}</i>
        <i class="el-icon-star-off icon-i" v-else @click="toggleGood">{{comment.stars.length}}</i>
        <i class="el-icon-error icon-i" v-if="comment.bads.includes(user.name)" @click="toggleBad">{{comment.bads.length}}</i>
        <i class="el-icon-circle-close icon-i" v-else @click="toggleBad">{{comment.bads.length}}</i>
        <i class="el-icon-s-comment icon-i" @click="toggleCom">{{comment.res?comment.res.length:''}}</i>
        <i style="margin-left:20px">~发布于{{$format(comment.date,"HH:mm:ss")}}</i>
      </div>
      <div class="comBox" v-if="comment.res&&comment.res.length&&openList"  >
          <Comment v-for="(item,index) in currentRes" :key="index" :comment="item"  />
      </div>
      <div class="pageBox" v-if="comment.res&&comment.res.length>4&&openList"  >
          <el-pagination
            small
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="4"
            layout="total,prev, pager, next"
            :total="comment.res.length">
          </el-pagination>
        </div>
        <div class="addComBox" v-if="comment.res&&openList" >
          <AddComment @jumper="jumper"  :comment="comment"  />
        </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

import AddComment from './AddComment'
import emoji from '../assets/emoji'
export default {
  components: {
    AddComment
  },
  name:"Comment",
  props: ["comment"],
  data () {
    return {
      emoji:emoji.emoji,//表情包
      user:{},
      currentPage:1,
      currentRes:[],//当前页面评论
      openList:false
    }
  },
  computed: {
    content(){
        const emoji=this.emoji
        return this.comment.content.replace(/\[.+?\]/g,(str)=>{
          const img=emoji.find(item=>item.value===str)
          return `<img src=${img.icon} alt=${img.value.substring(1,img.value.length-1)} />`
        })
    }
  },
  mounted () {
    this.user=JSON.parse(window.localStorage.getItem('user'))||{}
    if(this.comment.res){
      this.comment.res.sort((a,b)=>b.date-a.date)
      this.jumper()
    }
  },
  methods: {
    ...mapActions(['updateComment']),
    //点赞
    toggleGood(){
      this.toggle(this.comment.stars)
    },
    //点踩
    toggleBad(){
       this.toggle(this.comment.bads)
    },
    toggle(what){
      if(!this.user.name){
        this.$confirm('登录后才可操作, 是否跳转登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {})
      }else{
        if(!what.includes(this.user.name)){
          what.push(this.user.name)
        }else{
          const index=what.indexOf(this.user.name)
          what.splice(index,1)
        }
        this.updateComment(this.comment)
      }
    },
    //切换回复
    toggleCom(){
      if(this.comment.res){
        this.openList=!this.openList
        this.jumper()
      }
    },
    //切换分页
    handleCurrentChange(page){
      this.currentPage=page
      this.jumper()
    },
    jumper(page=this.currentPage){
        if(page===Math.ceil(this.comment.res.length/4)){
         this.currentRes=this.comment.res.slice((page-1)*4,this.comment.res.length)
       }else{
         this.currentRes=this.comment.res.slice((page-1)*4,page*4)
       }
    }
  }
}
</script>

<style scoped lang="less">
  .comment-wrapper{
    width: 100%;
    display: flex;
    color: rgba(0,0,0,.6);
    border-bottom: 1px solid rgba(0,0,0,.2);
    padding-bottom: 5px;
    margin-bottom: 10px;
    .comment-content{
      width: 100%;
      margin-left: 20px;
      .comBox{
        margin: 10px 0 10px 50px;
        width: 90%;
        font-size: 12px;
        border: 1px solid rgba(0,0,0,.2);
        background: rgba(0,0,0,.1);
        padding:10px;
        border-radius: 15px;
      }
      .pageBox{
        text-align: end;
      }
      .addComBox{
        display: flex;
        justify-content: flex-end;
        margin: 10px 0 30px 0;
      }
      .comment-tools{
        width: 60%;
        margin:20px 0 0 0;
        text-align: end;
        .icon-i{
          margin: 0 5px;
          cursor: pointer;
        }
      }
      .comment-p{
        width:60%;
        max-height: 100px;
        word-wrap:break-word;
      }
    }
  }
 
</style>
<template>
  <div class="addCommit">
    <el-avatar v-if="!comment" class="avatar" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
    <div class="editor">
        <textarea 
        class="inputArea" 
        :cols="comment?60:70" 
        rows="4" 
        v-model="textInput"
        placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"></textarea>
        <button class="addBtn" type="primary" v-if="comment" @click="handleUpdateComment">回复</button>
        <button class="addBtn" type="primary" v-else @click="handleAddComment">发表评论</button>
        <el-tooltip placement="bottom" >
            <div slot="content" class="emojiBox">
            <div class="emoji-wrap">
                <img @click="addEmoji(index)" class="emojiImg" v-for="(item,index) in emoji " :src="item.icon" :alt="item.value" :key="index">
            </div>
            </div>
            <i class="el-icon-edit emoji">添加表情</i>
        </el-tooltip>
    </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

import emoji from '../assets/emoji'
export default {
    props: ['comment'],
   data () {
       return {
            emoji:emoji.emoji,
            textInput:'',
       }
   },
   methods: {
       ...mapActions(['addComment','updateComment']),
       addEmoji(index){
        this.textInput+=this.emoji[index].value
        },
       handleAddComment(){
           if(!this.textInput){
               this.$message({
                    message: '评论不能为空',
                    type:'warning'
                })
                return 
           }
           const user=JSON.parse(window.localStorage.getItem('user'))
            if(!user){
                this.$confirm('登录后才可发表评论, 是否跳转登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$router.push('/login')
                }).catch(() => {})
            }else{
                const newComment={name:user.name,
                                content:this.textInput,
                                date:Date.now(),
                                stars:[],
                                bads:[],
                                res:[]
                                }
                this.addComment(newComment)
                this.$emit('jumper')
                this.textInput=''
                this.$message({
                    message: '评论成功！',
                    type: 'success'
                })
            }
       },
       handleUpdateComment(){
           if(!this.textInput){
               this.$message({
                    message: '评论不能为空',
                    type:'warning'
                })
                return 
           }
           const user=JSON.parse(window.localStorage.getItem('user'))
            if(!user){
                this.$confirm('登录后才可回复, 是否跳转登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$router.push('/login')
                }).catch(() => {})
            }else{
                const newComment={name:user.name,
                                content:this.textInput,
                                date:Date.now(),
                                stars:[],
                                bads:[]
                                }
                this.comment.res.unshift(newComment)
                this.updateComment(this.comment)
                this.$emit('jumper')
                this.textInput=''
                this.$message({
                    message: '评论成功！',
                    type: 'success'
                })
            }
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
 .addCommit{
    display: flex;
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
</style>
 
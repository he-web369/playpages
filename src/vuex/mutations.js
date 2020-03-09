
import {GET_COMMENTS,ADD_COMMENT,UPDATE_COMMENT} from './mutations-types'

export default {
   [GET_COMMENTS](state,{comments}){
        state.comments=comments
   },
   [ADD_COMMENT](state,{comment}){
      state.comments=[...state.comments,comment]
   },
   [UPDATE_COMMENT](state,{comment}){
      const index= state.comments.indexOf(state.comments.find((com)=>com.name===comment.name))
      state.comments.splice(index,1,{...comment})
   }
}

import {GET_COMMENTS,ADD_COMMENT,UPDATE_COMMENT} from './mutations-types'
import Data from '../assets/data'

export default {
   getComments({commit}){
      commit(GET_COMMENTS,{comments:Data.comments})
   },
   addComment({commit},comment){
      commit(ADD_COMMENT,{comment})
   },
   updateComment({commit},comment){
      commit(UPDATE_COMMENT,{comment})
   }
}




export default {
    //评论按时间降序排列
    dateSortComments(state){
        return [...state.comments].sort((a,b)=>b.date-a.date)
    },
    //评论按热度降序排列
    starSortComments(state){
        return [...state.comments].sort((a,b)=>b.stars-a.stars)
    }
}
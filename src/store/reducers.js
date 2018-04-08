import { combineReducers } from 'redux'


// export default (state = [], action) => {
//   switch (action.type) {
//     case 'LOAD':
//       return action.list
//     case 'LoadUserInfo':
//       return action.userlist
//     case 'SELECT_ONE':
//     	return state.filter((item) => {if(item.key !== action.id){
//     		return item
//     	}})
//     case 'SELECT_THREE':
//       return state.filter((item) => {if(item.key !== action.id){
//         return item
//       }})
//     default:
//     	return state

//   }
// }


const newslist = (state = [], action) => {
  switch (action.type) {
    case 'LOAD':
      return action.list
    
    case 'SELECT_ONE':
      return state.filter((item) => {if(item.key !== action.id){
        return item
      }})
    case 'SELECT_THREE':
      return state.filter((item) => {if(item.key !== action.id){
        return item
      }})
    default:
      return state
  }
}



const user = (state = [], action) => {
  switch (action.type) {
    case 'LoadUserInfo':
      return action.list
    default:
      return state
  }
}


const signout = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_USER':
      return action.userName
    case 'DELECT_USER':
      return state.filter((item) => {if(item.key !== action.id){
        return item
      }})
    default:
      return state
  }
}





const mainReducer = combineReducers({
  newslist,
  user,
  signout
})


export default mainReducer
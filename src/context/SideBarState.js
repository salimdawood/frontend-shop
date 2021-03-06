import React, { createContext,useReducer,useEffect } from 'react'
import SideBarReducer from '../Reducer/SideBarReducer'

//getting the css properties from the stylesheet
//for the server
let i
let cssSheet
try{
  cssSheet = document.styleSheets[0].cssRules
}catch(e){
  window.alert('couldn\'t acces the stylesheet')
  cssSheet = []
}
//for local use
/*
let cssSheet
try{
  cssSheet = document.styleSheets[2].cssRules
}catch(e){
  window.alert('couldn\'t acces the stylesheet')
  cssSheet = []
}
const cssDatatmp = {}
for(var child of cssSheet){
  cssDatatmp[child.selectorText] = child.cssText.match(/\{.+\}/i)[0]
}
*/

const cssDatatmp = {}
for(i=84;i<cssSheet.length;i++){
  cssDatatmp[cssSheet[i].selectorText] = cssSheet[i].cssText.match(/\{.+\}/i)[0]
}
const cssData = Object.entries(cssDatatmp)


//getting the favorites array from localstorage
const localData = localStorage.getItem('favorites');


//initial state
const initialState = {
  cssData:cssData,
  toggle:false,
  htmlDiv:'',
  className:'',
  cssDiv:[],
  favoritesArray:localData? JSON.parse(localData) : [] 
}

//sidbar context
export const SideBarContext = createContext(initialState);


//sidebar provider
export const SideBarProvider = ({children}) => {

  const [state, dispatch] = useReducer(SideBarReducer, initialState)

  useEffect(() => {
    try{
      localStorage.setItem('favorites',JSON.stringify(state.favoritesArray))
    }catch(e){
      if(e.code===22)
      {
        window.alert('Changes can\'t be saved  due to full storage, please delete some sheets or properties...')
      }
    }

  }, [state.favoritesArray])
  

  const showSideBar = (e) =>{
    dispatch({type:'SHOW_SIDEBAR',element:e.target.previousElementSibling})
  }

  const hideSideBar = () =>{
    dispatch({type:'HIDE_SIDEBAR'})
  }

  const addToFavorites = () =>{
    dispatch({type:'ADD_FAVORITE'})
  }

  const removeFromFavorites = () =>{
    dispatch({type:'REMOVE_FAVORITE'})
  }

  return (
    <SideBarContext.Provider value={
      {sideBar:state,showSideBar,hideSideBar,addToFavorites,removeFromFavorites}
      }>
      {children}
    </SideBarContext.Provider>
  )
}

import React from 'react'

function Box(props) {
  function setStyles(){
    let style={
      backgroundColor : ''
    }
    if(props.win === 'true' && props.boxes.userSelectedValue === props.boxes.trueValue){
        style={ backgroundColor : 'lightgreen'}
    }
    else if(props.win === 'false' ){
        if(props.boxes.userSelectedValue === props.boxes.trueValue){
          style={backgroundColor : 'lightgreen'}
        }
        else if(props.boxes.trueValue !=='-'){
          style={backgroundColor : '#FF0000' }
        }
    }
    else{
      if(props.boxes.userSelectedValue !== ''){
        style={backgroundColor : 'lightblue'}
      }
    }
    return style
  }

  return (
    <div
    onClick={()=>props.handleBoxClick(props.boxes.id)}
    className="box"
    style={setStyles()}
    >
        {props.boxes.value}
    </div>
  )
}

export default Box
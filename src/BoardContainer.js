import React from 'react'
import Box from './Box'

function BoardContainer(props) {
  return (
    <>
       {
           props.board[props.slicing].map(
             (boxes)=> <Box 
             win={props.win}
           handleBoxClick={props.handleBoxClick}
           key={boxes.id} 
           boxes={boxes}
           />)
       } 
    </>
  )
}

export default BoardContainer
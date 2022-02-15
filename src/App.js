import React from 'react'
import './App.css';
import BoardContainer from './BoardContainer'

function App() {
  const [board, setBoard] = React.useState(makeBoard())
  const [lvl, setLvl] = React.useState(3)
  const [userNumber, setUserNumber] = React.useState(1)
  const [win, setWin] = React.useState('')
  const [clickable, setClickable] = React.useState(false)
  const [clearingFunction, setClearingFnc] = React.useState()

  function makeBoard() {
    var arr = new Array(5)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(5)
    }
    let c = 0;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        arr[i][j] = {
          id: c++,
          value: '-',
          trueValue: '-',
          userSelectedValue : ''
        }
      }
    }
    return arr
  }

  function handleBoxClick(id) {
    if (clickable) {
      setBoard((prevBoard) => prevBoard.map(boxes => boxes.map(box => box.id === id
        ? { ...box, value: userNumber, userSelectedValue : userNumber } :
        box)))
      setUserNumber(prev => prev + 1)
    }
  }

  function randomUniquePairs() {
    let arr = []
    while (arr.length < lvl) {
      let first = Math.floor(Math.random() * 5)
      let second = Math.floor(Math.random() * 5)
      let toput = true
      arr.forEach(ob => {
        if (ob.a === first && ob.b === second) {
          toput = false
        }
      })
      if (toput) {
        arr.push({ a: first, b: second })
      }
    }
    return arr
  }

  function handleStartLvl() {
    handleRestartLevel()
    let randomed = randomUniquePairs()
    setBoard(prev => {
      for (let i = 0; i < lvl; i++) {
        prev[randomed[i].a][randomed[i].b] = {
          ...prev[randomed[i].a][randomed[i].b],
          value: i + 1,
          trueValue: i + 1
        };
      }
      return prev
    })
    //the next line is unnecessary step but react was not picking up the state without doing
    //this for reasons unknown

    setBoard(prev => prev.map(row => row.map(col => col)))
    setClearingFnc(setTimeout(() => {
      setBoard(prev => prev.map(row => row.map(col => {
        return {
          ...col,
          value: '-'
        }
      })))
      setClickable(true)
    }, 2500))
  }

  function makeContainer() {
    let arr = []
    for (let i = 0; i < board.length; i++) {
      arr.push(
        <div className="container" key={i}>
          <BoardContainer
          win={win}
            handleBoxClick={handleBoxClick}
            board={board}
            slicing={i}
          />
        </div>
      )
    }
    return arr
  }

  function handleChecks() {
    let check = true
    board.forEach(row => {
      row.forEach(col => {
        if (col.value !== col.trueValue) {
          check = false
        }
      })
    })
    if (!check) {
      setBoard(prevboard => prevboard.map(row => row.map(col => 
        { return { ...col, value: col.trueValue } 
      })))
    }
    check ? setWin('true') : setWin('false')
  }

  function handleRestartLevel() {
    //we need to clear timeout at every interaction because it being async calls the cb function
    // after 2500ms at all costs so sometimes we dont want that
    clearTimeout(clearingFunction)
    setBoard(makeBoard())
    setUserNumber(1)
    setWin('')
    setClickable(false)
  }

  function handleNextLevel() {
    clearTimeout(clearingFunction)
    setLvl(prev => prev + 1)
    setBoard(makeBoard())
    setUserNumber(1)
    setWin('')
    setClickable(false)
  }

  function handleRestartGame() {
    clearTimeout(clearingFunction)
    setLvl(3)
    setBoard(makeBoard())
    setUserNumber(1)
    setWin('')
    setClickable(false)
  }

  function winningText() {
    if (win === 'true') {
      return (
        <>
          <h3 style={{ marginLeft: "10px" }} >You won :)</h3>
          <div className="btn-lvl" onClick={handleNextLevel}>Next level</div>
        </>
      )
    }
    else if (win === 'false') {
      return (
        <>
          <h3 style={{ marginLeft: "10px" }}> You lost :(</h3>
          <div className="btn-lvl" onClick={handleRestartLevel}> Restart level</div>
        </>
      )
    }
    else {
      return (
        <div className="btn-lvl" onClick={handleRestartLevel}> Restart level</div>
      )
    }
  }

  return (
    <div className='mainPage'>
      {console.log(board)}

      <h1>Memory Game</h1>
      <div className='mainContainer'>
        <div className='lvlHeading'>
          <h3>Level {lvl - 2}</h3>
          {winningText()}
        </div>
        {
          makeContainer().map(boxes => boxes)
        }
        <div className='btnsection lvlHeading'>
          <div
            onClick={handleStartLvl}
            className='btn'>
            Start level</div>
          <div
            className='btn' onClick={handleChecks}>Check answer</div>
          <div
            className='btn' onClick={handleRestartGame}>Restart Game</div>
        </div>
      </div>

    </div>
  );
}

export default App;

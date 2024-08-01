/* eslint-disable react-refresh/only-export-components */
import PropTypes from "prop-types"
import { createContext, useContext, useState } from "react"

const MathContext = createContext()

export const MathProvider = ({ children }) => {
  //Variables for handling connection to backend
  const accessToken = localStorage.getItem("accessToken")
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000"
  const [loading, setLoading] = useState(false)

  //Object for math-game
  const [mathGame, setMathGame] = useState([
    {
      title: "Addera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
      levelScore: 20,
      subcategory: "addition",
    },
    {
      title: "Subtrahera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
      levelScore: 20,
      subcategory: "subtraction",
    },
    {
      title: "Multiplicera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
      levelScore: 20,
      subcategory: "multiplication",
    },
    {
      title: "Dividera",
      question: "",
      correctAnswer: null,
      level: 1,
      score: 0,
      levelScore: 20,
      subcategory: "division",
    },
  ])

  const [progress, setProgress] = useState({})

  //Handles animation on level-change
  const [celebrateLottie, setCelebrateLottie] = useState(false)

  //Generates different questions depending on the type of mathematical operation
  //ADDITION
  const generateAdditionQuestion = () => {
    let a = 0
    let b = 0

    //Setting different numbers depending on level
    if (mathGame[0].level === 1) {
      a = Math.floor(Math.random() * 20) + 1
      b = Math.floor(Math.random() * 20) + 1
    } else if (mathGame[0].level === 2) {
      a = Math.floor(Math.random() * 50) + 1
      b = Math.floor(Math.random() * 50) + 1
    } else {
      a = Math.floor(Math.random() * 100) + 1
      b = Math.floor(Math.random() * 100) + 1
    }

    //Using numbers to create question and answer
    const newGame = [...mathGame]
    newGame[0].question = `Vad är ${a}+${b}?`
    newGame[0].correctAnswer = a + b
    setMathGame(newGame)
  }

  //SUBTRACTION
  const generateSubtractionQuestion = () => {
    let a = 0
    let b = 0

    //Setting different numbers depending on level
    if (mathGame[1].level === 1) {
      a = Math.floor(Math.random() * 20) + 1
      b = Math.floor(Math.random() * 20) + 1
    } else if (mathGame[1].level === 2) {
      a = Math.floor(Math.random() * 50) + 1
      b = Math.floor(Math.random() * 50) + 1
    } else {
      a = Math.floor(Math.random() * 100) + 1
      b = Math.floor(Math.random() * 100) + 1
    }

    //Using numbers to create question and answer
    if (a >= b) {
      const newGame = [...mathGame]
      newGame[1].question = `Vad är ${a}-${b}?`
      newGame[1].correctAnswer = a - b
      setMathGame(newGame)
    } else {
      const newGame = [...mathGame]
      newGame[1].question = `Vad är ${b}-${a}?`
      newGame[1].correctAnswer = b - a
      setMathGame(newGame)
    }
  }

  //MULTIPLICATION
  const generateMultiplicationQuestion = () => {
    let a = 0
    let b = 0

    //Setting different numbers depending on level
    if (mathGame[2].level === 1) {
      a = Math.floor(Math.random() * 5) + 1
      b = Math.floor(Math.random() * 5) + 1
    } else if (mathGame[2].level === 2) {
      a = Math.floor(Math.random() * 5) + 1
      b = Math.floor(Math.random() * 11)
    } else {
      a = Math.floor(Math.random() * 10) + 1
      b = Math.floor(Math.random() * 11)
    }

    //Using numbers to create question and answer
    const newGame = [...mathGame]
    newGame[2].question = `Vad är ${a}*${b}?`
    newGame[2].correctAnswer = a * b
    setMathGame(newGame)
  }

  //DIVISION
  const generateDivisionQuestion = () => {
    let a = 0
    let b = 0

    //Setting different numbers depending on level
    if (mathGame[3].level === 1) {
      a = Math.floor(Math.random() * 5) + 1
      b = Math.floor(Math.random() * 5) + 1
    } else if (mathGame[3].level === 2) {
      a = Math.floor(Math.random() * 5) + 1
      b = Math.floor(Math.random() * 11)
    } else {
      a = Math.floor(Math.random() * 10) + 1
      b = Math.floor(Math.random() * 11)
    }

    //Using numbers to create question and answer
    const c = a * b
    const newGame = [...mathGame]
    newGame[3].question = `Vad är ${c}/${a}?`
    newGame[3].correctAnswer = c / a
    setMathGame(newGame)
  }

  //Decides which type of problem to generate based on prop from Math.jsx
  const generateQuestion = (type) => {
    //use next line for testing/demoing (only three questions before level-change)
    //if (mathGame[type].score >= 3) {
    if (mathGame[type].score >= mathGame[type].levelScore) {
      setCelebrateLottie(true)
      const newGame = [...mathGame]
      newGame[type].level = mathGame[type].level + 1
      newGame[type].score = 0
      setMathGame(newGame)
      setTimeout(() => setCelebrateLottie(false), 3000)
    }
    switch (type) {
      case 0:
        generateAdditionQuestion()
        break
      case 1:
        generateSubtractionQuestion()
        break
      case 2:
        generateMultiplicationQuestion()
        break
      case 3:
        generateDivisionQuestion()
        break
      default:
        generateAdditionQuestion()
    }
  }

  // Fetching progress data from db
  const fetchMathProgress = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${apiUrl}/progress`, {
        headers: {
          Authorization: accessToken,
        },
      })

      if (!response.ok) {
        console.log("Could not fetch")
        throw new Error("Failed to fetch progress")
      }

      const data = await response.json()
      setProgress(data.progress)

      //Använd loop för att jämföra varje steg, istället för att skriva så här mycket kod?
      const scoreOneMathAddition =
        data.progress.progress.math.addition.levels[0].score
      const scoreTwoMathAddition =
        data.progress.progress.math.addition.levels[1].score
      const scoreThreeMathAddition =
        data.progress.progress.math.addition.levels[2].score
      
      const scoreOneMathSubtraction =
        data.progress.progress.math.subtraction.levels[0].score
      const scoreTwoMathSubtraction =
        data.progress.progress.math.subtraction.levels[1].score
      const scoreThreeMathSubtraction =
        data.progress.progress.math.subtraction.levels[2].score

      const scoreOneMathMultiplication =
        data.progress.progress.math.multiplication.levels[0].score
      const scoreTwoMathMultiplication =
        data.progress.progress.math.multiplication.levels[1].score
      const scoreThreeMathMultiplication =
        data.progress.progress.math.multiplication.levels[2].score

      const scoreOneMathDivision =
        data.progress.progress.math.division.levels[0].score
      const scoreTwoMathDivision =
        data.progress.progress.math.division.levels[1].score
      const scoreThreeMathDivision =
        data.progress.progress.math.division.levels[2].score

      const levelScore = 20

      if (scoreOneMathAddition < levelScore) {
        const newGame = [...mathGame]
        newGame[0].level = 1
        newGame[0].score = scoreOneMathAddition
        setMathGame(newGame)
      } else if (scoreTwoMathAddition < levelScore) {
        const newGame = [...mathGame]
        newGame[0].level = 2
        newGame[0].score = scoreTwoMathAddition
        setMathGame(newGame)
      } else if (scoreThreeMathAddition < levelScore) {
        const newGame = [...mathGame]
        newGame[0].level = 3
        newGame[0].score = scoreThreeMathAddition
        setMathGame(newGame)
      } else {
        const newGame = [...mathGame]
        newGame[0].level = 3
        newGame[0].score = levelScore
        setMathGame(newGame)
      }

      if (scoreOneMathSubtraction < levelScore) {
        const newGame = [...mathGame]
        newGame[1].level = 1
        newGame[1].score = scoreOneMathSubtraction
        setMathGame(newGame)
      } else if (scoreTwoMathSubtraction < levelScore) {
        const newGame = [...mathGame]
        newGame[1].level = 2
        newGame[1].score = scoreTwoMathSubtraction
        setMathGame(newGame)
      } else if (scoreThreeMathSubtraction < levelScore) {
        const newGame = [...mathGame]
        newGame[1].level = 3
        newGame[1].score = scoreThreeMathSubtraction
        setMathGame(newGame)
      } else {
        const newGame = [...mathGame]
        newGame[1].level = 3
        newGame[1].score = levelScore
        setMathGame(newGame)
      }

      if (scoreOneMathMultiplication < levelScore) {
        const newGame = [...mathGame]
        newGame[2].level = 1
        newGame[2].score = scoreOneMathMultiplication
        setMathGame(newGame)
      } else if (scoreTwoMathMultiplication < levelScore) {
        const newGame = [...mathGame]
        newGame[2].level = 2
        newGame[2].score = scoreTwoMathMultiplication
        setMathGame(newGame)
      } else if (scoreThreeMathMultiplication < levelScore) {
        const newGame = [...mathGame]
        newGame[2].level = 3
        newGame[2].score = scoreThreeMathMultiplication
        setMathGame(newGame)
      } else {
        const newGame = [...mathGame]
        newGame[2].level = 3
        newGame[2].score = levelScore
        setMathGame(newGame)
      }

      if (scoreOneMathDivision < levelScore) {
        const newGame = [...mathGame]
        newGame[3].level = 1
        newGame[3].score = scoreOneMathDivision
        setMathGame(newGame)
      } else if (scoreTwoMathDivision < levelScore) {
        const newGame = [...mathGame]
        newGame[3].level = 2
        newGame[3].score = scoreTwoMathDivision
        setMathGame(newGame)
      } else if (scoreThreeMathDivision < levelScore) {
        const newGame = [...mathGame]
        newGame[3].level = 3
        newGame[3].score = scoreThreeMathDivision
        setMathGame(newGame)
      } else {
        const newGame = [...mathGame]
        newGame[3].level = 3
        newGame[3].score = levelScore
        setMathGame(newGame)
      }

      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <MathContext.Provider
      value={{
        mathGame,
        setMathGame,
        generateQuestion,
        celebrateLottie,
        fetchMathProgress,
        loading,
        progress
      }}
    >
      {children}
    </MathContext.Provider>
  )
}

export const useMath = () => useContext(MathContext)

MathProvider.propTypes = {
  children: PropTypes.any,
}

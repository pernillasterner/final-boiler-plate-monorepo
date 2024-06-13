import styled from "styled-components"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import Lottie from "lottie-react"
import { Link } from "react-router-dom"
import { useState, useRef } from "react"
import { useMath } from "../../contexts/MathContext"
import { MathQuestion } from "./MathQuestion"
import Celebrate from "../../assets/Celebrate.json"

export const Math = () => {
  const { mathGame, celebrateLottie } = useMath()
  const [gameTypeNumber, setGameTypeNumber] = useState()
  const focusRef = useRef(null)

  const handleChoice = (type) => {
    setGameTypeNumber(type)
  }

  if (gameTypeNumber) {
    return (
      <MathGameSite>
        <HeaderDiv>
          <TitleDiv>
            <BackButton onClick={() => setGameTypeNumber(null)}>
              <BackIcon />
            </BackButton>
            <Title>{mathGame[Number(gameTypeNumber)].title}</Title>
            {celebrateLottie && (
              <Lottie
                animationData={Celebrate}
                loop={false}
                autoplay
                style={{
                  width: 150,
                  height: 150,
                  position: "absolute",
                  left: 568,
                  top: -50,
                }}
              />
            )}
          </TitleDiv>
          <Progress>
            <Level>Nivå {mathGame[Number(gameTypeNumber)].level}</Level>
            <Score>
              ⭐{mathGame[Number(gameTypeNumber)].score}/
              {mathGame[Number(gameTypeNumber)].levelScore}
            </Score>
          </Progress>
        </HeaderDiv>
        <MathQuestion focusRef={focusRef} type={gameTypeNumber} />
      </MathGameSite>
    )
  } else {
    return (
      <MathGameSite>
        <HeaderDiv>
          <TitleDiv>
            <BackButton>
              <Link to="/spela">
                <BackIcon />
              </Link>
            </BackButton>
            <Title>VÄLJ SPEL</Title>
          </TitleDiv>
        </HeaderDiv>
        <Choices>
          <GameTypeButton
            value="0"
            onClick={(event) => handleChoice(event.target.value)}
          >
            <ButtonTextDiv>
              <ButtonText>Nivå {mathGame[0].level}</ButtonText>
              <ButtonTitle>Addition</ButtonTitle>
              <ButtonText>
                {mathGame[0].score}/{mathGame[0].levelScore}
              </ButtonText>
            </ButtonTextDiv>
            <ButtonSign>+</ButtonSign>
          </GameTypeButton>
          <GameTypeButton
            value="1"
            onClick={(event) => handleChoice(event.target.value)}
          >
            <ButtonTextDiv>
              <ButtonText>Nivå {mathGame[1].level}</ButtonText>
              <ButtonTitle>Subtraktion</ButtonTitle>
              <ButtonText>
                {mathGame[1].score}/{mathGame[1].levelScore}
              </ButtonText>
            </ButtonTextDiv>
            <ButtonSign>-</ButtonSign>
          </GameTypeButton>
          <GameTypeButton
            value="2"
            onClick={(event) => handleChoice(event.target.value)}
          >
            <ButtonTextDiv>
              <ButtonText>Nivå {mathGame[2].level}</ButtonText>
              <ButtonTitle>Multiplikation</ButtonTitle>
              <ButtonText>
                {mathGame[2].score}/{mathGame[2].levelScore}
              </ButtonText>
            </ButtonTextDiv>
            <ButtonSign>*</ButtonSign>
          </GameTypeButton>
          <GameTypeButton
            value="3"
            onClick={(event) => handleChoice(event.target.value)}
          >
            <ButtonTextDiv>
              <ButtonText>Nivå {mathGame[3].level}</ButtonText>
              <ButtonTitle>Division</ButtonTitle>
              <ButtonText>
                {mathGame[3].score}/{mathGame[3].levelScore}
              </ButtonText>
            </ButtonTextDiv>
            <ButtonSign>÷</ButtonSign>
          </GameTypeButton>
        </Choices>
      </MathGameSite>
    )
  }
}

const MathGameSite = styled.div`
  display: flex;
  flex-direction: column;
`

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 10px;
  width: 300px;
  gap: 10px;

  @media (min-width: 700px) {
    flex-direction: row;
    width: 600px;
    margin: 35px auto 25px;
    padding: 0 30px;
  }
`

const TitleDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  position: relative;
  right: 130px;

  @media (min-width: 700px) {
    width: 540px;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 40px;

  @media (min-width: 700px) {
    font-size: 45px;
  }
`

const BackButton = styled.button`
  background: none;
  border: none;
  height: 60px;
  padding: 0 20px;
`

const BackIcon = styled(IoArrowBackCircleOutline)`
  font-size: 40px;
  color: #000000;
  cursor: pointer;

  @media (min-width: 700px) {
    font-size: 60px;
  }
`
const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  gap: 10px;

  @media (min-width: 700px) {
    flex-direction: column;
    width: 60px;
  }
`

const Level = styled.h3`
  color: black;
`

const Score = styled.h3`
  color: black;
`

const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  margin: 10px auto;

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 580px;
  }
`

const GameTypeButton = styled.button`
  background-color: var(--ocean);
  color: white;
  width: 270px;
  height: 60px;
  margin: 10px auto;
  padding: 10px 0;
  z-index: 1;
  border-radius: 15px;
  border: none;
  font-size: 20px;
  padding: 15px;
  cursor: pointer;
  box-shadow: 4px 4px var(--oceanshadow);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: var(--oceanhover);
    box-shadow: 6px 6px var(--oceanshadow);
    transition: 0.2s ease;
  }

  &:disabled {
    cursor: default;
    border: none;

    &:hover {
      background-color: var(--ocean);
    }
  }

  @media (min-width: 700px) {
    width: 270px;
    height: 120px;
    padding: 10px 20px;
  }
`

const ButtonTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  width: 200px;
  height: 100px;
`

const ButtonTitle = styled.p`
  font-size: 30px;
`

const ButtonText = styled.p`
  font-size: 18px;
  margin: 0;
`

const ButtonSign = styled.p`
  font-size: 50px;
`

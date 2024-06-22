import styled from "styled-components"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import { Footer } from "../components/Footer"

export const NotFound = () => {
  return (
    <>
      <Site>
        <HeaderDiv>
          <TitleDiv>
            <BackButton>
              <Link to="/">
                <BackIcon />
              </Link>
            </BackButton>
            <Title>404, Not found!</Title>
          </TitleDiv>
        </HeaderDiv>
        <p>Ledsen, den här sidan verkar inte finnas...</p>
      </Site>
      <Footer />
    </>
  )
}

const Site = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
`

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
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
  align-items: center;
  position: relative;
  right: 20px;

  @media (min-width: 700px) {
    width: 540px;
    gap: 30px;
    position: relative;
    right: 130px;
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

const Title = styled.h1`
  margin: 0;
  font-size: 35px;

  @media (min-width: 700px) {
    font-size: 45px;
  }
`

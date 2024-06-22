import styled from "styled-components"
import { Link } from "react-router-dom"
import { FaCircleInfo } from "react-icons/fa6"

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterDiv>
        <CopyrightText>© Technigo Web Development Bootcamp 2024</CopyrightText>
        <Link to={`/om-oss`}>
          <About>
            <FaCircleInfo />
            Om oss
          </About>
        </Link>
      </FooterDiv>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  padding: 20px 30px;
  background-color: var(--daffodil);
  width: 100%;
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  margin: auto;
  justify-content: center;
  align-items: center;

  @media (min-width: 500px) {
    padding: 14px 20px;
  }

  @media (min-width: 1025px) {
    padding: 20px 30px;
    position: fixed;
  }
`

const FooterDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: space-between;
  align-items: center;
`

const CopyrightText = styled.p`
  font-size: 10px;

  @media (min-width: 500px) {
    font-size: 15px;
  }
`

const About = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  color: black;
  font-size: 15px;
  height: 25px;

  &:hover {
    color: var(--oceanhover);
  }

  @media (min-width: 1025px) {
    font-size: 17px;
  }
`

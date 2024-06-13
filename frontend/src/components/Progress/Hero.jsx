import styled from "styled-components";
import { useLogin } from "./../../contexts/UserContext";
import heroImgUrl from "/src/assets/ProgressHeader.jpg";

export const Hero = () => {
  const { user } = useLogin();

  const content = {
    heroTitle: `Hej ${user?.firstName} 👋`,
    intro:
      "Sidan där du kan förbättra dina kunskaper i olika skolämnen. Registrera dig för att spara dina framsteg i spelen.",
  };

  return (
    <HeroContainer>
      <HeroLeft>
        <HeroTitle>{content.heroTitle}</HeroTitle>
        <HeroP>
          Nedanför kan du se hur det har gått för dig i varje ämne, som matte,
          svenska och engelska.
        </HeroP>
        <HeroP>Ha kul och fortsätt lära dig nya saker varje dag! 🎓📚</HeroP>
      </HeroLeft>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 30px;
  min-height: 400px;
  background-image: url(${heroImgUrl});
  background-size: cover;
  height: auto;
`;

const HeroTitle = styled.h1`
  margin-bottom: 20px;
  text-align: center;

  @media (min-width: 700px) {
    font-size: 2.5rem;
  }
`;

const HeroP = styled.p`
  text-align: center;
  margin: 20px 0;
  @media (min-width: 700px) {
    font-size: 1.2rem;
  }
`;

const HeroLeft = styled.div`
  width: 50%;
`;

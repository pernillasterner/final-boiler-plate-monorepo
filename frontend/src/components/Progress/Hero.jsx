import styled from "styled-components";
import { useLogin } from "./../../contexts/UserContext";

export const Hero = () => {
  const { user } = useLogin();

  return (
    <HeroContainer>
      <HeroLeft>
        <HeroTitle>Välkommen {user?.firstName} 👋</HeroTitle>
        <p>
          När du spelar spel och gör uppgifter här, sparas dina framsteg så att
          du kan se hur mycket du har lärt dig och blivit bättre på.
        </p>
        <p>
          Nedanför kan du se hur det har gått för dig i varje ämne, som matte,
          svenska och engelska.
        </p>
        <p>Ha kul och fortsätt lära dig nya saker varje dag! 🎓📚</p>
      </HeroLeft>
      <HeroRight>
        <ProgressBox></ProgressBox>
      </HeroRight>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  display: flex;
  padding: 60px 30px;
  min-height: 400px;
`;

const HeroTitle = styled.h1`
  margin: 10px 0;
`;

const HeroLeft = styled.div`
  width: 50%;
`;

const HeroRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: #f1f1f1;
  border-radius: 30px;
`;

const ProgressBox = styled.div`
  padding: 30px;
  background-color: #f1f1f1;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

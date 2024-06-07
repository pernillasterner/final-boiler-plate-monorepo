import styled from "styled-components";
import { useLogin } from "./../../contexts/UserContext";
import { Hero } from "./Hero";

const user = {
  _id: "adf456456545",
  username: "pillan",
  password: "losenord321!",
  firstName: "Pernilla",
  lastName: "Svensson",
  age: "8",
  email: "mamma.svensson@example.com",
  accessToken: "943588945",
};

const progress = {
  math: {
    levels: [
      { level: 1, score: 5, totalScore: 20 },
      { level: 2, score: 7, totalScore: 20 },
    ],
  },
  swedish: {
    levels: [
      { level: 1, score: 5, totalScore: 20 },
      { level: 2, score: 7, totalScore: 20 },
      { level: 3, score: 16, totalScore: 20 },
    ],
  },
  english: {
    levels: [{ level: 1, score: 10, totalScore: 20 }],
  },
};

// Function that will calc totalscore for each subject
const calcSubjectResult = (subject) => {
  const totalScore = subject.levels.reduce(
    (acc, level) => acc + level.score,
    0
  );
  const totalMaxScore = subject.levels.reduce(
    (acc, level) => acc + level.totalScore,
    0
  );
  return (totalScore / totalMaxScore) * 100;
};

export const Progress = () => {
  const { user } = useLogin();
  const { math, swedish, english } = progress;

  return (
    <ProgressContainer>
      <Hero user={user} progress={progress} />

      <ProgressWrapper>
        <div className="progress__subject math">
          <ProgressTitle>matte</ProgressTitle>
          <ProgressBox>
            <ProgressCircel className="blue">
              <ProgressScore>
                <p>Nivå: {math.levels.length}</p>
                <p>{calcSubjectResult(math).toFixed(0)}%</p>
              </ProgressScore>
            </ProgressCircel>
          </ProgressBox>
        </div>
        <div className="progress__subject swedish">
          <ProgressTitle>svenska</ProgressTitle>
          <ProgressBox>
            <ProgressCircel className="orange">
              <ProgressScore>
                <p>Nivå: {swedish.levels.length}</p>
                <p>{calcSubjectResult(swedish).toFixed(0)}%</p>
              </ProgressScore>
            </ProgressCircel>
          </ProgressBox>
        </div>
        <div className="progress__subject english">
          <ProgressTitle>engelska</ProgressTitle>
          <ProgressBox>
            <ProgressCircel className="green">
              <ProgressScore>
                <p>Nivå: {english.levels.length}</p>
                <p>{calcSubjectResult(english).toFixed(0)}%</p>
              </ProgressScore>
            </ProgressCircel>
          </ProgressBox>
        </div>
      </ProgressWrapper>

      <LevelContainer>
        <h2>Matte</h2>
        <LevelWrapper>
          <LevelProgress>
            <p>Nivå: 1 - 10 / 20</p>
            Här ska finnas två bars, en som alltid är 100% och den andra ska
            ligga ovanpå och visa hur många % som är kvar
          </LevelProgress>
        </LevelWrapper>
      </LevelContainer>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  margin: 0 auto;
`;

const ProgressWrapper = styled.div`
  padding: 30px;
  display: flex;
  justify-content: space-around;
  background-color: #e5e5e5;
`;

const ProgressTitle = styled.h2`
  margin: 10px 0;
  text-align: center;
`;

const ProgressBox = styled.div`
  padding: 30px;
  background-color: #f1f1f1;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressCircel = styled.div`
  position: relative;
  border-radius: 100%;
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressScore = styled.div`
  color: white;
  font-size: 2rem;
  position: absolute;
  text-align: center;
`;

const LevelContainer = styled.div`
  padding: 30px;
  background-color: #f1f1f1;
`;

const LevelWrapper = styled.div`
  padding: 20px 0;
  background-color: lightgreen;
`;

const LevelProgress = styled.div`
  padding: 0 20px;
  background-color: yellow;
`;

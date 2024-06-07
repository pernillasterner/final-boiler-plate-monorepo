import styled from "styled-components";

export const LevelProgressBar = ({ progress }) => {
  return (
    <LevelContainer>
      <h2>Svenska</h2>
      <LevelWrapper>
        {progress.swedish.levels.map((level, index) => (
          <LevelProgress key={index}>
            <p>
              Nivå: {level.level} - {level.score} / {level.totalScore}
            </p>
            <ProgressBar>
              <ProgressForSubjects
                className="orange"
                style={{
                  width: `${(level.score / level.totalScore) * 100}%`,
                }}
              ></ProgressForSubjects>
            </ProgressBar>
          </LevelProgress>
        ))}
      </LevelWrapper>
    </LevelContainer>
  );
};

const LevelContainer = styled.div`
  padding: 30px;
  background-color: #f1f1f1;
`;

const LevelWrapper = styled.div`
  padding: 20px 0;
`;

const LevelProgress = styled.div`
  padding: 0 20px;
`;

const ProgressBar = styled.div`
  border-radius: 30px;
  margin: 5px 0;
  background-color: lightgray;
  height: 10px;
`;

const ProgressForSubjects = styled.div`
  height: 100%;
`;

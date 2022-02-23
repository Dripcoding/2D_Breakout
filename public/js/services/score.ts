// use localStorage as a source of truth for game scores

interface Score {
  mode: string;
  score: number;
  timestamp: string;
}

export const resetScoreBoard = (): void => {
  window.localStorage.clear();
  document.location.reload();
};

export const createScoreTimestamp = (): string => {
  const date = new Date();

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const createScore = (score: number, mode: string): Score => {
  const timestamp = createScoreTimestamp();
  const userScore: Score = {
    mode,
    score,
    timestamp
  };

  return userScore;
};

export const setScore = (userScore: Score): void => {
  localStorage.setItem(`${localStorage.length}`, JSON.stringify(userScore));
};

export const getScores = (): Score[] => {
  let scores: Score[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const score: Score = JSON.parse(localStorage.getItem(`${i}`) as any);
    scores.push(score);
  }

  return scores;
};

export const drawScoreBoardEntry = (): void => {
  const scores = getScores();

  const table = document.getElementsByTagName("tbody")[1];

  scores.forEach((entry, index) => {
    if (entry != null) {
      let tr = table?.insertRow();
      let attempts = tr.insertCell(0);
      let score = tr.insertCell(1);
      let mode = tr.insertCell(2);
      let timestamp = tr.insertCell(3);

      attempts.appendChild(document.createTextNode(`${index}`));
      score.appendChild(document.createTextNode(`${entry.score}`));
      mode.appendChild(document.createTextNode(`${entry.mode}`));
      timestamp.appendChild(document.createTextNode(`${entry.timestamp}`));
    }
  });
};

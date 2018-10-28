export const shuffle = choices => {
  for (let i = choices.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return choices;
};

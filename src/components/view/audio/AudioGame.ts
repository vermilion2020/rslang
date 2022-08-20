import AudioChallenge from './AudioChallenge';

const docPrint = (e: Event) => {
  const targetLi = e.target as HTMLLIElement;
  const setNr = targetLi.dataset.set;
  console.log('setNr: ', setNr);
  return setNr;
};

export default docPrint;

import { useSpring, animated } from "react-spring";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { wordDataSelector } from "../../Store/Dictionary/selectors";
import "./DictionaryContent.sass";

export const DictionaryContent = () => {
  const { wordData, error, loading } = useSelector(wordDataSelector);

  const animationStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });

  if (loading)
    return (
      <animated.div className={"Dictionary-no-content"} style={animationStyle}>
        <CircularProgress />
      </animated.div>
    );

  if (error)
    return (
      <animated.div className={"Dictionary-no-content"} style={animationStyle}>
        В нашем словаре такого слова не нашлось :(
      </animated.div>
    );

  if (wordData) {
    const { word } = wordData;
    const partOfSpeech = wordData?.meanings[0]?.partOfSpeech;
    const { definition, example } = wordData.meanings[0].definitions[0];
    return (
      <animated.div className={"Dictionary-content"} style={animationStyle}>
        <div>
          <h2>{word}</h2>
          <p>{partOfSpeech}</p>
        </div>

        <div className={"Dictionary-definition"}>
          <div>
            <h3>Значение: </h3>
            <p>{definition}</p>
          </div>
          <div>
            <h3>Пример: </h3>
            <p>{example ? example : `Примеров с ${word} не нашлось`}</p>
          </div>
        </div>
      </animated.div>
    );
  }

  return (
    <animated.div className={"Dictionary-no-content"} style={animationStyle}>
      <div>Введите слово и нажмите Enter</div>
    </animated.div>
  );
};

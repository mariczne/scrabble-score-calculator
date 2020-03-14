import { sortArrayByLengthDescending, findIndexOfSubarray } from "./array";
import { checkIsLanguageDefinedInScoretable } from "./language";

export function isLanguageWithMultigraphs({ scoreTable, languageCode }) {
  checkIsLanguageDefinedInScoretable({scoreTable, languageCode});
  return scoreTable[languageCode].hasOwnProperty("multigraphs");
}

export function getMultigraphsInLanguage({ scoreTable, languageCode }) {
  if (isLanguageWithMultigraphs({ scoreTable, languageCode })) {
    return [...scoreTable[languageCode].multigraphs];
  }
  return [];
}

export function processMultigraphs(letters, language) {
  let multigraphs = getMultigraphsInLanguage(language);
  multigraphs = sortArrayByLengthDescending(multigraphs);

  let lettersProcessed = [...letters];

  lettersProcessed.forEach(() => {
    multigraphs.forEach(multigraph => {
      const multigraphIndexAt = findIndexOfSubarray(
        lettersProcessed,
        multigraph
      );
      const isMultigraphFound = multigraphIndexAt !== -1;
      if (isMultigraphFound) {
        lettersProcessed.splice(
          multigraphIndexAt,
          multigraph.length,
          multigraph.join("")
        );
      }
    });
  });

  return lettersProcessed;
}

function createTokenizer(text) {
  const words = text.split(/\W+/);
  const vocab = { "<UNK>": 0, "<PAD>": 1 };

  const usedTokens = new Set(Object.values(vocab));

  words.forEach((word) => {
    if (word && !vocab[word]) {
      let randomToken;

      do {
        randomToken = Math.floor(Math.random() * 9998) + 2;
      } while (usedTokens.has(randomToken));

      vocab[word] = randomToken;

      usedTokens.add(randomToken);
    }
  });

  return vocab;
}

function decode(numbers, vocab) {
  const reversedVocab = {};
  for (const word in vocab) {
    reversedVocab[vocab[word]] = word;
  }
  return numbers.map((number) => reversedVocab[number] || "<UNK>").join(" ");
}

const inputText = document.getElementById("inputText");
const encodeBtn = document.getElementById("encodeBtn");
const decodeBtn = document.getElementById("decodeBtn");
const outputText = document.getElementById("outputText");

let lastTokenizer = {};

encodeBtn.addEventListener("click", () => {
  const text = inputText.value;

  lastTokenizer = createTokenizer(text);
  const encoded = text
    .split(/\W+/)
    .filter((word) => word)
    .map((word) => lastTokenizer[word] || 0);
  outputText.value = JSON.stringify(encoded, null, 2);
});

decodeBtn.addEventListener("click", () => {
  if (outputText.value === "") {
    alert("Please encode some text first!");
    return;
  }
  try {
    const encoded = JSON.parse(outputText.value);

    outputText.value = decode(encoded, lastTokenizer);
  } catch (e) {
    alert("Invalid format in the output box. Please encode again.");
  }
});

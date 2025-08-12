function createTokenizer(text) {
  const words = text.split(/\W+/);
  const vocab = { "<UNK>": 0, "<PAD>": 1 };
  let index = 2;

  words.forEach((word) => {
    if (!vocab[word]) {
      vocab[word] = index;
      index++;
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

encodeBtn.addEventListener("click", () => {
  const text = inputText.value;
  const tokenizer = createTokenizer(text);
  const encoded = text.split(/\W+/).map((word) => tokenizer[word] || 0);
  outputText.value = JSON.stringify(encoded, null, 2);
});

decodeBtn.addEventListener("click", () => {
  const encoded = JSON.parse(outputText.value);
  const tokenizer = createTokenizer(inputText.value);
  outputText.value = decode(encoded, tokenizer);
});

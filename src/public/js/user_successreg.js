let que = [
  "I feel overwhelmingly sad at times",
  "Have you noticed a decrease in your ability to concentrate or make decisions?",
  "My sleep patterns have been really disrupted",
  "How often do you find yourself withdrawing from social activities or avoiding interaction with others?",
  "How often do you find yourself withdrawing from social activities or avoiding interaction with others?I feel guilty about something most of the time.",
];

let count = 0;
let to_update = document.querySelector("#question");
let to_disable = document.querySelector("#questions");
// let que_cnt = document.querySelector("#question_number");
let btns = document.querySelectorAll("a");
// let para = `${que[0]}`;
let para = "";
let content = document.querySelector(".content");
let poss,
  neg,
  neu = 0;

// let start=document.querySelector("#taketest")
// console.log(start);
// start.addEventListener("click",()=>{
//   start.style.display="none"
//   content.style.display="flex"
// })
for (let elem of btns) {
  // console.log(elem);
  elem.addEventListener("click", () => {
    to_update.innerText = que[count];
    para += que[count] + elem.innerText;
    // console.log(elem.innerText);
    // que_cnt.innerHTML="Question "+(count+2)
    count++;
    if (count == que.length) {
      to_disable.style.display = "none";
      console.log(para);

      query({
        inputs: `${para}`,
      }).then((response) => {
        console.log(JSON.stringify(response));
        neg = JSON.stringify(response[0][0]["score"] * 100);
        neu = JSON.stringify(response[0][1]["score"] * 100);
        poss = JSON.stringify(response[0][2]["score"] * 100);
        pbar.style.display = "flex";
        const posss = document.querySelector("#poss");
        posss.innerHTML = poss;
        const negg = document.querySelector("#neg");
        negg.innerText = neg;
        const neut = document.querySelector("#neu");
        neut.innerText = neu;
      });
    }
  });
}
async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

const pbar = document.querySelector(".pbar");
pbar.style.display = "none";

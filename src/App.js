import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// const axios = require('axios').default

function App() {
  const [option, setOption] = useState([]);
  const [to, setTO] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = () => {
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios
      .post(
        "https://libretranslate.de/translate",params,
        {
          q: input,
          source: from,
          target: to,
          api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        },
        {
          headers: {
            accept: "application/json",
            "Content Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOutput(res.data.translatedText)
      });
  };

  useEffect(() => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        console.log(res.data);
        setOption(res.data);
      });
  }, []);
  return (
    <div className="App">
      <div>
        From ({from}):
        <select onChange={(e) => setFrom(e.target.value)}>
          {option.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        To ({to}):
        <select onChange={(e) => setTO(e.target.value)}>
          {option.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        <div>
          <textarea
            name=""
            id=""
            cols="80"
            rows="15"
            onInput={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div>
          <textarea name="" id="" cols="80" rows="15" value={output}></textarea>
        </div>
        <div>
          <button onClick={e=>translate()}>Translate</button>
        </div>
      </div>
    </div>
  );
}

export default App;

import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { useState } from 'react';
import './App.css';




const originSuggestions = [
  {
    name: "about"
  },
  {
    name: "above"
  },
  {
    name: "app"
  },
  {
    name: "apple"
  },
  {
    name: "appreciate"
  },
  {
    name: "bad"
  },
  {
    name: "ball"
  },
  {
    name: "balloon"
  },
  {
    name: "bell"
  },
  {
    name: "cat"
  },

];

function App() {
  const [query, setQuery] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [suggestions, setSuggestions] = useState(originSuggestions);

  const onChangeText = (event, { newValue }) => {
    setQuery(newValue);
  };

  const onClickSubmit = () => {
    axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: "DLCVuTK6KZExOS7JoMq82bi5MaI6EbWO",
        q: query
      }
    })
      .then(function (response) {
        // handle success
        let res = response.data;
        if (res && res.data && res.data.length > 0) {
          setImageSource(res.data[0].images.original.url);
        } else {
          setImageSource("");
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  // auto complate
  const getSuggestionValue = suggestion => suggestion.name;

  const renderSuggestion = suggestion => (
    <span>{suggestion.name}</span>
  );

  const getSuggestions = ({ value }) => {
    console.log("[APP::getSuggestions] value=", value);
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : originSuggestions.filter(value =>
      value.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const inputProps = {
    placeholder: 'type any string to find the gif',
    value: query,
    onChange: onChangeText
  };

  const onSuggestionsFetchRequested = (value) => {
    console.log("[APP::onSuggestionsFetchRequested] value=", value);
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <div className="rh-body">
      <header className="rh-header">
        Rhumbix Programming Test
      </header>
      <div className="rh-container">
        {/* <input onChange={onChangeText} /> */}
        <div className="rh-auto-content">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <button onClick={onClickSubmit}>Go</button>
      </div>
      <div className="rh-gif-content">
        {imageSource === "" && <div className="rh-not-found">Not Found</div>}
        {imageSource !== "" && <img src={imageSource} alt="RH_GIF" width={250} height={250} />}
      </div>
    </div>
  );
}

export default App;

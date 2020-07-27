import React from 'react';
import express from "express";
import path from "path";
import regeneratorRuntime from "regenerator-runtime";

import {getDataFromTree, renderToStringWithData} from "@apollo/react-ssr";

import ReactApp from '../client/App';

import getApolloClient from '../client/ApolloClient';

const app = express();

app.use(express.static(path.join(__dirname, "../client")));

const renderReactApp = async (req, res) => {
  try {
    const ApolloClient = getApolloClient();
    await ApolloClient.resetStore();
    await getDataFromTree(ReactApp);
    const RENDERED_REACT_APP = await renderToStringWithData(<ReactApp url={req.url} context={{}} />);
    const __INITIAL_STATE__ = ApolloClient.extract();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>app-1-react</title>
</head>
<body>
<div id="root">${RENDERED_REACT_APP}</div>
<script src="/main.js" charset="utf-8" ></script>
<script>
      window.__INITIAL_STATE__=${JSON.stringify(
      __INITIAL_STATE__
    ).replace(/</g, "\\\u003c")}
</script>
</body>
</html>
    `;
    res.send(html);
  } catch (e) {
    console.log(e);
    res.send('something went wrong');
  }
};

app.get("/", renderReactApp);
app.get("/rick", renderReactApp);
app.get("/morty", renderReactApp);
app.get("/earth", renderReactApp);

app.listen(3004, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Listening at http://localhost:3004/`);
});

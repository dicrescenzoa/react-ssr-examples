import React from 'react';
import express from "express";
import path from "path";
import regeneratorRuntime from "regenerator-runtime";

import { renderToString } from 'react-dom/server';

import ReactApp from '../client/App';

const app = express();

app.use(express.static(path.join(__dirname, "../client")));

const renderReactApp = async (req, res) => {
  try {
    const RENDERED_REACT_APP = await renderToString(<ReactApp />);

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

app.listen(3001, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Listening at http://localhost:3001/`);
});

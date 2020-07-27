import App from "./App";
import React from "react";
import { hydrate, render } from "react-dom";

const root = document.getElementById("root");
const renderMethod = module.hot ? render : hydrate;
renderMethod(<App />, root);

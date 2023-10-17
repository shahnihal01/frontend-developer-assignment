import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { RecipientsDataProvider } from '../src/components/RecipientsDataProvider';
import recipientsData from '../src/assets/recipientsData.json';

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <RecipientsDataProvider initialData={recipientsData}>
      <App />
    </RecipientsDataProvider>,
  </React.StrictMode>
);

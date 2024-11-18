import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./services/store.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/Navigation/NavBar.tsx";
import Home from "./pages/Home.tsx";
import Evidence from "./pages/Evidence/index.tsx";
import EvidenceBooks from "./pages/EvidenceBook/index.tsx"
import EmailRecordsPage from "./pages/EmailRecords.tsx";
import TextRecordsPage from "./pages/TextRecords.tsx";
// import OpenAIComponent from "./pages/OpenAi/index.tsx";

// Define the type for the custom theme function
export const getTheme = (): ReturnType<typeof createTheme> => createTheme();

const RoutesIndex: React.FC = () => {
  return (
    <Provider store={store}>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      <ThemeProvider theme={getTheme()}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/evidence" element={<Evidence />} /> */}
            <Route path="/evidence_books" element={<EvidenceBooks />} />
            <Route path="/evidence_books/:id" element={<Evidence />} />
            <Route path="/email_records" element={<EmailRecordsPage />} />
            <Route path="/text_records" element={<TextRecordsPage />} />
            {/* <Route path="/open_ai" element={<OpenAIComponent />} /> */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
      {/* </LocalizationProvider> */}
    </Provider>
  );
};

export default RoutesIndex;

import { FaQuestionCircle } from "react-icons/fa"
import { Routes, Route, Link, useNavigate } from "react-router-dom"

import "./App.css"
import FeedbackProvider from "./context/FeedbackContext"
import Header from "./components/header/Header"
import RatingSelect from "./components/rating-select/RatingSelect"
import RatingReview from "./components/rating-review/RatingReview"
import FeedbackList from "./components/feedbackList/FeedbackList"
import AboutPage from "./pages/about-page/AboutPage"

const App = () => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <FeedbackProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <RatingSelect
                // messages={[
                //   "star 0.5",
                //   "star 1",
                //   "star 1.5",
                //   "star 2",
                //   "star 2.5",
                //   "star 3",
                //   "star 3.5",
                //   "star 4",
                //   "star 4.5",
                //   "star 5",
                // ]}
                />
                <RatingReview />
                <FeedbackList />
                <div
                  style={{
                    position: "fixed",
                    right: "1rem",
                    bottom: "1rem",
                    cursor: "pointer",
                  }}
                >
                  <FaQuestionCircle
                    title="about this app"
                    onClick={() => {
                      navigate("/about")
                    }}
                  />
                </div>
              </>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="*"
            element={
              <>
                Page not found. <Link to="/"> Go to home</Link>
              </>
            }
          />
        </Routes>
      </FeedbackProvider>
    </div>
  )
}
export default App

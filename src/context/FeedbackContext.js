import { useContext, createContext } from "react"

const FeedbackContext = createContext()

const FeedbackProvider = ({ children }) => {
  const handleSubmit = (review) => {
    console.log(review)
  }

  const value = { handleSubmit }

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  )
}

export const useFeedback = () => {
  const context = useContext(FeedbackContext)

  if (context === "undefined") {
    throw new Error("useFeedback must be used within FeedbackProvider")
  }
  return context
}

export default FeedbackProvider

import { useContext, createContext, useEffect, useState } from "react"

const FeedbackContext = createContext()

const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const f = async () => {
      setFeedback(await fetchFeedback())
    }

    setTimeout(() => {
      f()
      setIsLoading(false)
    }, 3000)
  }, [])

  const fetchFeedback = async () => {
    const res = await fetch("/feedback?_sort=id&_order=desc")
    const data = res.json()

    return data
  }

  const handleSubmit = (review) => {
    console.log(review)
  }

  const value = { handleSubmit, feedback, isLoading }

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

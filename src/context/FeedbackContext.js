import { useContext, createContext, useEffect, useState } from "react"

const FeedbackContext = createContext()

const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [edit, setEdit] = useState({ item: null, editMode: false })

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

  const handleSubmit = async (review) => {
    const res = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
    const data = await res.json()

    setFeedback([data, ...feedback])
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback")) return

    const res = await fetch(`/feedback/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const handleUpdate = async (updItem) => {
    const res = await fetch(`/feedback/${updItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    })

    if (res.ok) {
      const data = await res.json()
      setFeedback(feedback.map((item) => (data.id === item.id ? data : item)))
      setEdit({ item: null, editMode: false })
    }
  }

  const value = {
    handleSubmit,
    feedback,
    isLoading,
    select: setRating,
    selectedRating: rating,
    handleDelete,
    handleUpdate,
    edit,
    setEdit,
  }

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

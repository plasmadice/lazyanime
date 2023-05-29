'use client'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <code>{error.message}</code>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

export default Error

"use client"
import React, { useState } from "react"
import parse from "html-react-parser"

type Props = {
  description: string | null
  className?: string
}

/**
 * Split a long description into a short description and a long description with a "More" button.
 */
export const DetailDescription = ({ description, className }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  let shortDescription = ""

  // Adds shortDescription if needed
  if (
    description?.split("<br>")?.length &&
    description?.split("<br>")?.length > 4
  ) {

    let splitDescription = description?.split("<br>")
    shortDescription = splitDescription.slice(0, 4).join("<br>").trim()

    // Removes last <br> if it is the last character to allow inline + More
    while (
      shortDescription.lastIndexOf("<br>") ===
      shortDescription.length - 4
    ) {
      shortDescription = shortDescription
        .slice(0, shortDescription.length - 4)
        .trim()
    }

    shortDescription += "..."
  }

  const handleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  if (!description) {
    description = "No description available."
  }

  return (
    <div className={`${className ? ` ${className}` : ""}`}>
      <p className="">
        {!isExpanded && shortDescription
          ? parse(shortDescription as string)
          : parse(description as string)}
        <span
          onClick={handleExpand}
          className="text-white pl-2 text-xl cursor-pointer !inline-block select-none"
        >
          {/* If there is no short description -> Create text depending on isExpanded */}
          {!shortDescription ? "" : isExpanded ? "...Less" : "More"}
        </span>
      </p>
      <span className="p-0 col-auto row-auto w-fit min-h-fit"></span>
    </div>
  )
}

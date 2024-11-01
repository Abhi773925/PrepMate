"use client"

import { useEffect, useRef, useState } from "react"
import { FaUserCircle } from "react-icons/fa"

// Sample alumni data
const successStories = [
  {
    name: "Rohan Mehta",
    role: "Cleared UPSC Prelims",
    institution: "PrepMate Coaching",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Shivani Patel",
    role: "SSC CGL Rank Holder",
    institution: "Self-Study with PrepMate",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Aarav Singh",
    role: "RRB NTPC Top Scorer",
    institution: "PrepMate Classes",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Priya Gupta",
    role: "Bank PO Finalist",
    institution: "PrepMate Community",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Vikram Shah",
    role: "Cleared State PSC",
    institution: "PrepMate Online",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sneha Verma",
    role: "Top Scorer in CDS",
    institution: "PrepMate Mentorship",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function SuccessStories() {
  const column1Ref = useRef(null)
  const column2Ref = useRef(null)
  const column3Ref = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const column1 = column1Ref.current
    const column2 = column2Ref.current
    const column3 = column3Ref.current
    if (!column1 || !column2 || !column3) return

    let animationFrameId

    const scroll = () => {
      if (!isPaused) {
        column1.scrollTop -= 1
        column2.scrollTop += 1
        column3.scrollTop -= 1

        if (column1.scrollTop <= 0) {
          column1.scrollTop = column1.scrollHeight / 2
        }
        if (column2.scrollTop >= column2.scrollHeight / 2) {
          column2.scrollTop = 0
        }
        if (column3.scrollTop <= 0) {
          column3.scrollTop = column3.scrollHeight / 2
        }
      }
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isPaused])

  const StoryCard = ({ person }) => (
    <div
      className="relative overflow-hidden rounded-lg border border-orange-500 bg-[#0d0c0a]/60 p-4 shadow-md pb-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col items-center text-center">
        {person.image ? (
          <img src={person.image} alt={person.name} className="mb-3 h-16 w-16 rounded-full" />
        ) : (
          <FaUserCircle className="mb-3 h-16 w-16 text-[#fff9f8]" />
        )}
        <h3 className="text-base font-semibold text-[#fff9f8]">{person.name}</h3>
        <p className="text-xs text-[#fff9f8]/80">{person.institution}</p>
        <p className="text-xs text-[#fff9f8]/60">{person.role}</p>
      </div>
    </div>
  )

  return (
    <div className=" bg-[#0d0c0a] p-6 text-[#fff9f8] ">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Story Cards Column */}
        <div className="relative h-[400px] overflow-hidden ">
          <div className="grid grid-cols-3 gap-4 h-[calc(100vh-3rem)]">
            {/* Column 1 - Upward Scrolling */}
            <div ref={column1Ref} className="overflow-hidden">
              <div className="space-y-6">
                {[...successStories, ...successStories].map((person, index) => (
                  <StoryCard key={`col1-${index}`} person={person} />
                ))}
              </div>
            </div>

            {/* Column 2 - Downward Scrolling */}
            <div ref={column2Ref} className="overflow-hidden">
              <div className="space-y-6">
                {[...successStories, ...successStories].map((person, index) => (
                  <StoryCard key={`col2-${index}`} person={person} />
                ))}
              </div>
            </div>

            {/* Column 3 - Upward Scrolling */}
            <div ref={column3Ref} className="overflow-hidden">
              <div className="space-y-6">
                {[...successStories, ...successStories].map((person, index) => (
                  <StoryCard key={`col3-${index}`} person={person} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Static Content Section */}
        <div className="sticky top-6 space-y-4 h-fit flex flex-col justify-center">
          <p className="text-xl font-semibold text-orange-500">PrepMate Success Stories</p>
          <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
            Real Results from PrepMate Students
          </h1>
          <p className="text-lg text-[#fff9f8]/80">
            Meet the individuals who achieved their dreams through PrepMate. These are real success stories, from acing competitive exams to reaching their career goals.
          </p>
        </div>
      </div>
    </div>
  )
}

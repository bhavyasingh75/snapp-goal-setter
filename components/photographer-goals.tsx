"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Goal {
  id: number
  title: string
  completed: boolean
}

const motivationalMessages = [
  "Great shot! You're developing your skills!",
  "Picture perfect progress!",
  "You've captured another milestone!",
  "Your portfolio of achievements is growing!",
  "Fantastic focus on your goals!",
]

export function PhotographerGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState("")

  // Add this line to calculate the total number of goals
  const totalGoals = goals.length

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), title: newGoal, completed: false }])
      setNewGoal("")
      setShowForm(false)
    }
  }

  const completeGoal = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: true } : goal
    ))
    const newMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    setMessage(newMessage)
  }

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#f5e8d3] p-8 flex flex-col items-center font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Space Grotesk', sans-serif;
          background-color: #f5e8d3;
        }
      `}</style>
      <h1 className="text-4xl font-bold mb-8 text-[#5c4033]">Photographer's Goal Snapshots</h1>
      
      {/* Add this section to display the total number of goals */}
      <div className="mb-4 p-4 bg-[#e6d2b5] text-[#5c4033] rounded-md text-xl font-semibold">
        Total Goals: {totalGoals}
      </div>
      
      {message && (
        <div className="mb-4 p-4 bg-[#e6d2b5] text-[#5c4033] rounded-md">
          {message}
        </div>
      )}
      
      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-6">
        {goals.filter(goal => !goal.completed).map(goal => (
          <GoalSnapshot key={goal.id} goal={goal} onComplete={completeGoal} onDelete={deleteGoal} />
        ))}
        
        <Button 
          onClick={() => setShowForm(true)} 
          className="h-64 w-56 bg-[#e6d2b5] hover:bg-[#d9c4a5] text-[#5c4033] border-4 border-[#c7b491]"
        >
          <Plus size={48} />
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-8 w-80 bg-[#e6d2b5] border-4 border-[#c7b491]">
              <CardHeader>
                <CardTitle className="text-[#5c4033]">New Goal Snapshot</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="newGoal" className="text-[#5c4033]">Goal Title</Label>
                <Input 
                  id="newGoal"
                  value={newGoal} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGoal(e.target.value)}
                  className="bg-[#faf3e3] text-[#5c4033]"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={addGoal} className="bg-[#a67b5b] hover:bg-[#8c6142] text-white">Add Goal</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="text-[#5c4033]">Cancel</Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <CompletedGoals goals={goals.filter(goal => goal.completed)} />
    </div>
  )
}

function GoalSnapshot({ goal, onComplete, onDelete }: { goal: Goal, onComplete: (id: number) => void, onDelete: (id: number) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-64 w-56 bg-[#faf3e3] p-4 shadow-lg flex flex-col justify-between"
      style={{ 
        transform: `rotate(${Math.random() * 6 - 3}deg)`,
        boxShadow: '0 4px 6px rgba(92, 64, 51, 0.1), 0 1px 3px rgba(92, 64, 51, 0.08)',
        border: '1px solid #d1bc98',
      }}
    >
      <Button 
        onClick={() => onDelete(goal.id)} 
        variant="ghost" 
        className="absolute top-2 right-2 h-8 w-8 p-0 text-[#5c4033]"
      >
        <X size={16} />
      </Button>
      <div className="flex-1 flex items-center justify-center p-4 text-center">
        <p className="text-lg font-semibold text-[#5c4033] break-words">{goal.title}</p>
      </div>
      <Button 
        onClick={() => onComplete(goal.id)} 
        className="w-full bg-[#a67b5b] hover:bg-[#8c6142] text-white"
      >
        Complete
      </Button>
    </motion.div>
  )
}

function CompletedGoals({ goals }: { goals: Goal[] }) {
  return (
    <Card className="mt-12 w-full max-w-4xl bg-[#e6d2b5] border-4 border-[#c7b491]">
      <CardHeader>
        <CardTitle className="text-2xl text-[#5c4033]">Developed Snapshots</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <div className="flex flex-wrap gap-4 p-4">
            {goals.map(goal => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-32 w-32 bg-[#faf3e3] p-2 shadow-md flex items-center justify-center text-center"
                style={{ 
                  transform: `rotate(${Math.random() * 6 - 3}deg)`,
                  boxShadow: '0 2px 4px rgba(92, 64, 51, 0.1), 0 1px 2px rgba(92, 64, 51, 0.08)',
                  border: '1px solid #d1bc98',
                }}
              >
                <p className="text-sm font-medium text-[#5c4033] break-words">{goal.title}</p>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

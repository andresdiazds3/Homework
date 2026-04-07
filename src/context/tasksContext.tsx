import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { serverTimestamp, type Timestamp } from 'firebase/firestore'
import { AuthContext } from './authContext'
import { useCollection } from '../hooks/useCollection'

export type TaskItem = {
  id: string
  title: string
  description: string
  done: boolean
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

type TaskPayload = {
  title: string
  description: string
}

type TasksContextValue = {
  tasks: TaskItem[]
  loading: boolean
  error: string | null
  getAllTasks: () => Promise<void>
  createTask: (payload: TaskPayload) => Promise<void>
  editTask: (id: string, payload: TaskPayload) => Promise<void>
  removeTask: (id: string) => Promise<void>
  toggleTaskDone: (id: string, done: boolean) => Promise<void>
}

export const TasksContext = createContext<TasksContextValue | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
  const auth = useContext(AuthContext)
  const uid = auth?.user?.uid ?? null
  const { results, isPending, error, getAll, add, update, remove } = useCollection('tasks')

  useEffect(() => {
    if (uid) {
      void getAll([['userId', '==', uid]])
    }
  }, [uid])

  const getAllTasks = async () => {
    if (!uid) {
      return
    }

    await getAll([['userId', '==', uid]])
  }

  const createTask = async ({ title, description }: TaskPayload) => {
    await add({
      userId: uid,
      title,
      description,
      done: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    await getAllTasks()
  }

  const editTask = async (id: string, payload: TaskPayload) => {
    await update(id, {
      ...payload,
      updatedAt: serverTimestamp(),
    })
    await getAllTasks()
  }

  const removeTask = async (id: string) => {
    await remove(id)
    await getAllTasks()
  }

  const toggleTaskDone = async (id: string, done: boolean) => {
    await update(id, {
      done: !done,
      updatedAt: serverTimestamp(),
    })
    await getAllTasks()
  }

  return (
    <TasksContext.Provider
      value={{
        tasks: (results as TaskItem[]) ?? [],
        loading: isPending,
        error,
        getAllTasks,
        createTask,
        editTask,
        removeTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

import { createContext, type ReactNode } from 'react'
import type { NodeType } from '../classes/NaryNode'
import type { NaryTree } from '../classes/NaryTree'
import { useTreeCollection } from '../hooks/useTreeCollection'

type CreateNodePayload = {
  parentId: string
  name: string
  type: NodeType
}

type TreeContextValue = {
  tree: NaryTree | null
  loading: boolean
  error: string | null
  createNode: (payload: CreateNodePayload) => Promise<void>
  removeNode: (nodeId: string) => Promise<void>
  reloadTree: () => Promise<void>
}

export const TreeContext = createContext<TreeContextValue | undefined>(undefined)

export function TreeProvider({ children }: { children: ReactNode }) {
  const { tree, loading, error, createNode, removeNode, reloadTree } = useTreeCollection()

  return (
    <TreeContext.Provider
      value={{
        tree,
        loading,
        error,
        createNode,
        removeNode,
        reloadTree,
      }}
    >
      {children}
    </TreeContext.Provider>
  )
}
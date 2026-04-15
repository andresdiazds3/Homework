import { useContext, useEffect, useMemo, useState } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import { AuthContext } from '../context/authContext'
import { NaryNode, type NodeType, type NaryNodeData } from '../classes/NaryNode'
import { NaryTree } from '../classes/NaryTree'
import { useCollection } from './useCollection'

type CreateNodePayload = {
  parentId: string
  name: string
  type: NodeType
}

type TreeDocument = {
  userId: string
  ownerEmail: string
  root: NaryNodeData
}

const ROOT_ID = 'root'

const findParentNode = (currentNode: NaryNode, childId: string): NaryNode | null => {
  for (const child of currentNode.children) {
    if (child.id === childId) {
      return currentNode
    }

    const parent = findParentNode(child, childId)
    if (parent) {
      return parent
    }
  }

  return null
}

const getTreeErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return 'No se pudo completar la operacion del arbol.'
}

//Inicialización de contexto de Auth y de Hook UseCollection
export function useTreeCollection() {
  const auth = useContext(AuthContext)
  const userId = auth?.user?.uid ?? null
  const userEmail = auth?.user?.email ?? null
  const [tree, setTree] = useState<NaryTree | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    isPending,
    error: collectionError,
    getById,
    add,
  } = useCollection('trees')

  const loading = isPending

  
  const loadOrCreateTree = async () => {
    if (!userId || !userEmail) {
      setTree(null)
      setError(null)
      return
    }

    setError(null)

    // Si existe arbol a nombre del id de un usuario sigue el flujo, sino, crea la carpeta mi unidad
    try {
      const existingTree = (await getById(userId)) as TreeDocument | null

      if (!existingTree) {
        const rootNode = new NaryNode({
          id: ROOT_ID,
          name: 'Mi unidad',
          type: 'folder',
          createdByEmail: userEmail,
        })

        await add(
          {
            userId,
            ownerEmail: userEmail,
            root: rootNode.toData(),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
          userId,
        )

        setTree(new NaryTree({ root: rootNode }))
        return
      }

      setTree(NaryTree.fromDataRoot(existingTree.root))
    } catch (treeError) {
      setError(getTreeErrorMessage(treeError))
    }
  }

  useEffect(() => {
    void loadOrCreateTree()
  }, [userId, userEmail])

  // Crea un nuevo nodo, para alguna de las carpetas, con validación del archivo
  const createNode = async ({ parentId, name, type }: CreateNodePayload) => {
    if (!userId || !userEmail) {
      throw new Error('Debes iniciar sesion para crear nodos.')
    }

    if (!tree) {
      throw new Error('El arbol aun no esta cargado.')
    }

    const trimmedName = name.trim()
    if (!trimmedName) {
      throw new Error('El nombre es obligatorio.')
    }

    const nextTree = tree.clone()
    const parentNode = nextTree.findById(parentId)

    if (!parentNode) {
      throw new Error('No se encontro la carpeta padre seleccionada.')
    }

    if (parentNode.type !== 'folder') {
      throw new Error('Solo las carpetas pueden contener elementos hijos.')
    }

    const nextNode = new NaryNode({
      id: crypto.randomUUID(),
      name: trimmedName,
      type,
      createdByEmail: userEmail,
    })

    parentNode.addChild(nextNode)

    try {
      await add(
        {
          userId,
          ownerEmail: userEmail,
          root: nextTree.toDataRoot(),
          updatedAt: serverTimestamp(),
        },
        userId,
      )

      setTree(nextTree)
      setError(null)
    } catch (treeError) {
      const message = getTreeErrorMessage(treeError)
      setError(message)
      throw new Error(message)
    }
  }


  //Remueve un nodo, solo si no tiene hijos, lo que hace es clonar el arbol nuevo
  const removeNode = async (nodeId: string) => {
    if (!userId || !userEmail) {
      throw new Error('Debes iniciar sesion para eliminar nodos.')
    }

    if (!tree) {
      throw new Error('El arbol aun no esta cargado.')
    }

    if (nodeId === ROOT_ID) {
      throw new Error('No puedes eliminar la carpeta raiz.')
    }

    const nextTree = tree.clone()
    const targetNode = nextTree.findById(nodeId)

    if (!targetNode) {
      throw new Error('No se encontro el nodo a eliminar.')
    }

    if (targetNode.children.length > 0) {
      throw new Error('No puedes eliminar una carpeta que tiene hijos.')
    }

    const parentNode = findParentNode(nextTree.root, nodeId)

    if (!parentNode) {
      throw new Error('No se encontro el padre del nodo.')
    }

    parentNode.children = parentNode.children.filter((child) => child.id !== nodeId)

    try {
      await add(
        {
          userId,
          ownerEmail: userEmail,
          root: nextTree.toDataRoot(),
          updatedAt: serverTimestamp(),
        },
        userId,
      )

      setTree(nextTree)
      setError(null)
    } catch (treeError) {
      const message = getTreeErrorMessage(treeError)
      setError(message)
      throw new Error(message)
    }
  }

  return useMemo(
    () => ({
      tree,
      loading,
      error: error ?? collectionError,
      createNode,
      removeNode,
      reloadTree: loadOrCreateTree,
    }),
    [tree, loading, error, collectionError],
  )
}

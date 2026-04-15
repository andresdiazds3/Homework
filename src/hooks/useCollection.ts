import { useState } from 'react'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase/config'

type UseCollectionResult = {
  isPending: boolean
  error: string | null
  getById: (id: string) => Promise<DocumentData | null>
  add: (data: DocumentData, id?: string) => Promise<string>
}

const getCollectionErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Ocurrio un error inesperado al consultar la coleccion.'
}

export function useCollection(collectionName: string): UseCollectionResult {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  //Petición a firebase para encontrar un elemento de una coleccion mediante el ID
  const getById = async (id: string): Promise<DocumentData | null> => {
    setIsPending(true)
    setError(null)

    try {
      const snapshot = await getDoc(doc(db, collectionName, id))
      if (!snapshot.exists()) {
        return null
      }

      return snapshot.data()
    } catch (collectionError) {
      setError(getCollectionErrorMessage(collectionError))
      throw collectionError
    } finally {
      setIsPending(false)
    }
  }

  // Metodo de petición a firebase para añadir a una colleccion, usando su ID, nombre de coleccion y datos
  const add = async (data: DocumentData, id?: string): Promise<string> => {
    setIsPending(true)
    setError(null)

    try {
      if (id) {
        await setDoc(doc(db, collectionName, id), data, { merge: true })
        return id
      }

      const created = await addDoc(collection(db, collectionName), data)
      return created.id
    } catch (collectionError) {
      setError(getCollectionErrorMessage(collectionError))
      throw collectionError
    } finally {
      setIsPending(false)
    }
  }

  return {
    isPending,
    error,
    getById,
    add,
  }
}

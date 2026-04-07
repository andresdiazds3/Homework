import { useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  type WhereFilterOp,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase/config'

type QueryFilter = [string, WhereFilterOp, unknown]

export function useCollection(collectionPath: string) {
  const [results, setResults] = useState<DocumentData[]>([])
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detail, setDetail] = useState<DocumentData | null>(null)

  const getAll = async (filters: QueryFilter[] = []) => {
    if (!collectionPath) {
      setResults([])
      return
    }

    setIsPending(true)
    setError(null)

    try {
      const collectionRef = collection(db, collectionPath)
      const constraints = filters.map(([field, op, value]) => where(field, op, value))
      const q = constraints.length > 0 ? query(collectionRef, ...constraints) : query(collectionRef)
      const snapshot = await getDocs(q)

      const docs = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }))
      setResults(docs)
    } catch (firebaseError) {
      if (firebaseError instanceof Error) {
        setError(firebaseError.message)
      } else {
        setError('Error loading collection.')
      }
    } finally {
      setIsPending(false)
    }
  }

  const getById = async (id: string) => {
    if (!collectionPath) {
      setDetail(null)
      return
    }

    setIsPending(true)
    setError(null)

    try {
      const snapshot = await getDoc(doc(db, collectionPath, id))
      setDetail(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null)
    } catch (firebaseError) {
      if (firebaseError instanceof Error) {
        setError(firebaseError.message)
      } else {
        setError('Error loading document.')
      }
    } finally {
      setIsPending(false)
    }
  }

  const add = async (payload: DocumentData) => {
    if (!collectionPath) {
      throw new Error('No collection path defined.')
    }

    try {
      setError(null)
      await addDoc(collection(db, collectionPath), payload)
    } catch (firebaseError) {
      if (firebaseError instanceof Error) {
        setError(firebaseError.message)
      } else {
        setError('Error adding document.')
      }
      throw firebaseError
    }
  }

  const update = async (id: string, payload: DocumentData) => {
    if (!collectionPath) {
      throw new Error('No collection path defined.')
    }

    try {
      setError(null)
      await updateDoc(doc(db, collectionPath, id), payload)
    } catch (firebaseError) {
      if (firebaseError instanceof Error) {
        setError(firebaseError.message)
      } else {
        setError('Error updating document.')
      }
      throw firebaseError
    }
  }

  const remove = async (id: string) => {
    if (!collectionPath) {
      throw new Error('No collection path defined.')
    }

    try {
      setError(null)
      await deleteDoc(doc(db, collectionPath, id))
    } catch (firebaseError) {
      if (firebaseError instanceof Error) {
        setError(firebaseError.message)
      } else {
        setError('Error deleting document.')
      }
      throw firebaseError
    }
  }

  return {
    results,
    isPending,
    error,
    detail,
    getAll,
    getById,
    add,
    update,
    remove,
  }
}

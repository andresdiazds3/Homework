import { useMemo, useState, type FormEvent } from 'react'
import type { NaryNode, NodeType } from '../../classes/NaryNode'
import { TreeNotice } from './TreeNotice'

type FolderOption = {
  id: string
  label: string
}

type CreateNodeFormProps = {
  rootNode: NaryNode | null
  loading: boolean
  contextError: string | null
  onCreate: (payload: { parentId: string; name: string; type: NodeType }) => Promise<void>
}

const buildFolderOptions = (node: NaryNode, depth = 0): FolderOption[] => {
  const currentOption: FolderOption[] =
    node.type === 'folder' ? [{ id: node.id, label: `${'  '.repeat(depth)}${node.name}` }] : []

  const childrenOptions = node.children.flatMap((child) => buildFolderOptions(child, depth + 1))

  return [...currentOption, ...childrenOptions]
}

export function CreateNodeForm({ rootNode, loading, contextError, onCreate }: CreateNodeFormProps) {
  const [name, setName] = useState('')
  const [parentId, setParentId] = useState('root')
  const [type, setType] = useState<NodeType>('folder')
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const folderOptions = useMemo(() => {
    if (!rootNode) {
      return []
    }

    return buildFolderOptions(rootNode)
  }, [rootNode])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      setFormError(null)
      setIsSubmitting(true)
      await onCreate({ parentId, name, type })
      setName('')
      setType('folder')
    } catch (submitError) {
      if (submitError instanceof Error) {
        setFormError(submitError.message)
      } else {
        setFormError('No se pudo crear el nodo.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="tree-app__form" onSubmit={handleSubmit}>
      <label>
        Nombre
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ej. documentos"
          disabled={isSubmitting || loading}
        />
      </label>

      <label>
        Tipo
        <select
          value={type}
          onChange={(event) => setType(event.target.value as NodeType)}
          disabled={isSubmitting || loading}
        >
          <option value="folder">Carpeta</option>
          <option value="file">Archivo</option>
        </select>
      </label>

      <label>
        Carpeta padre
        <select
          value={parentId}
          onChange={(event) => setParentId(event.target.value)}
          disabled={isSubmitting || loading || folderOptions.length === 0}
        >
          {folderOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      {formError && <TreeNotice kind="error" message={formError} />}
      {contextError && <TreeNotice kind="error" message={contextError} />}

      <button className="tree-app__primary-btn" type="submit" disabled={isSubmitting || loading}>
        {isSubmitting ? 'Guardando...' : 'Crear nodo'}
      </button>
    </form>
  )
}

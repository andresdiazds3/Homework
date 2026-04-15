import { useState } from 'react'
import { FaRegFolder, FaRegFileAlt, FaTrashAlt } from 'react-icons/fa'
import type { NaryNode } from '../../classes/NaryNode'
import { TreeNotice } from './TreeNotice'

type TreeNodeViewProps = {
  node: NaryNode
  loading: boolean
  onDeleteNode: (nodeId: string) => Promise<void>
}

const ROOT_ID = 'root'

export function TreeNodeView({ node, loading, onDeleteNode }: TreeNodeViewProps) {
  const canDelete = node.id !== ROOT_ID
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!canDelete || loading) {
      return
    }

    try {
      setDeleteError(null)
      await onDeleteNode(node.id)
    } catch (deleteNodeError) {
      if (deleteNodeError instanceof Error) {
        setDeleteError(deleteNodeError.message)
      } else {
        setDeleteError('No se pudo eliminar el nodo.')
      }
    }
  }

  return (
    <li className="tree-app__node-item">
      <div className="tree-app__node-row">
        <span className="tree-app__node-icon" aria-hidden="true" title={node.type === 'folder' ? 'Carpeta' : 'Archivo'}>
          {node.type === 'folder' ? <FaRegFolder /> : <FaRegFileAlt />}
        </span>
        <div>
          <p className="tree-app__node-name">{node.name}</p>
          <p className="tree-app__node-meta">
            tipo: {node.type} | creado por: {node.createdByEmail}
          </p>
        </div>

        {canDelete && (
          <button
            className="tree-app__danger-btn"
            type="button"
            onClick={() => void handleDelete()}
            disabled={loading}
            aria-label={`Eliminar ${node.name}`}
            title={`Eliminar ${node.name}`}
          >
            <FaTrashAlt aria-hidden="true" />
            <span>Eliminar</span>
          </button>
        )}
      </div>

      {deleteError && <TreeNotice kind="error" message={deleteError} />}

      {node.children.length > 0 && (
        <ul className="tree-app__node-list">
          {node.children.map((child) => (
            <TreeNodeView key={child.id} node={child} loading={loading} onDeleteNode={onDeleteNode} />
          ))}
        </ul>
      )}
    </li>
  )
}

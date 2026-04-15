import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { TreeContext } from '../context/treeContext'
import { CreateNodeForm } from '../components/tree/CreateNodeForm'
import { TreeNodeView } from '../components/tree/TreeNodeView'
import { TreeNotice } from '../components/tree/TreeNotice'

export function TreeManager() {
  const auth = useContext(AuthContext)
  const treeContext = useContext(TreeContext)
  const tree = treeContext?.tree ?? null

  const handleLogout = async () => {
    await auth?.logout()
  }

  return (
    <main className="tree-app__layout">
      <header className="tree-app__header">
        <div>
          <p className="tree-app__eyebrow">Arbol n-ario persistente</p>
          <h1>Gestor de carpetas y archivos</h1>
          <p className="tree-app__user">Usuario: {auth?.user?.email}</p>
        </div>

        <button className="tree-app__logout-btn" onClick={() => void handleLogout()} type="button">
          Cerrar sesion
        </button>
      </header>

      <section className="tree-app__panel">
        <h2>Crear nodo</h2>
        {treeContext && (
          <CreateNodeForm
            rootNode={tree?.root ?? null}
            loading={treeContext.loading}
            contextError={treeContext.error}
            onCreate={treeContext.createNode}
          />
        )}
      </section>

      <section className="tree-app__panel">
        <h2>Estructura actual</h2>
        {treeContext?.loading && <p>Cargando arbol...</p>}
        {!treeContext?.loading && treeContext?.error && <TreeNotice kind="error" message={treeContext.error} />}
        {!treeContext?.loading && treeContext && tree && (
          <ul className="tree-app__node-list">
            <TreeNodeView node={tree.root} loading={treeContext.loading} onDeleteNode={treeContext.removeNode} />
          </ul>
        )}
      </section>
    </main>
  )
}
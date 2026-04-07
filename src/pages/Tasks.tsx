import { useContext, useMemo, useState, type FormEvent } from 'react'
import { TasksContext } from '../context/tasksContext'

type EditingState = {
  id: string
  title: string
  description: string
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected task action error.'
}

export function Tasks() {
  const tasksContext = useContext(TasksContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editing, setEditing] = useState<EditingState | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const totalDone = useMemo(() => {
    return tasksContext?.tasks.filter((task) => task.done).length ?? 0
  }, [tasksContext?.tasks])

  if (!tasksContext) {
    return null
  }

  const handleCreateTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) {
      setActionError('El titulo es obligatorio.')
      return
    }

    try {
      setActionError(null)
      await tasksContext.createTask({ title: title.trim(), description: description.trim() })
      setTitle('')
      setDescription('')
    } catch (error) {
      setActionError(getErrorMessage(error))
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setActionError(null)
      await tasksContext.removeTask(id)
    } catch (error) {
      setActionError(getErrorMessage(error))
    }
  }

  const handleToggleDone = async (id: string, done: boolean) => {
    try {
      setActionError(null)
      await tasksContext.toggleTaskDone(id, done)
    } catch (error) {
      setActionError(getErrorMessage(error))
    }
  }

  const handleStartEdit = (id: string, currentTitle: string, currentDescription: string) => {
    setEditing({ id, title: currentTitle, description: currentDescription })
  }

  const handleSaveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!editing || !editing.title.trim()) {
      setActionError('El titulo editado no puede estar vacio.')
      return
    }

    try {
      setActionError(null)
      await tasksContext.editTask(editing.id, {
        title: editing.title.trim(),
        description: editing.description.trim(),
      })
      setEditing(null)
    } catch (error) {
      setActionError(getErrorMessage(error))
    }
  }

  return (
    <main className="task-page container py-4 py-md-5">
      <section className="task-header p-4 p-md-5 mb-4">
        <h1 className="mb-2">Task App</h1>
        <p className="mb-0">Crea, edita, elimina y marca tareas completadas en Firestore.</p>
      </section>

      <section className="task-panel p-4 mb-4">
        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-3">
          <h2 className="h5 mb-0">Nueva tarea</h2>
          <span className="task-counter">{totalDone}/{tasksContext.tasks.length} hechas</span>
        </div>

        <form className="d-grid gap-3" onSubmit={handleCreateTask}>
          <input
            className="form-control task-field"
            placeholder="Titulo"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className="form-control task-field"
            placeholder="Descripcion (opcional)"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button className="btn task-btn" type="submit">Crear tarea</button>
        </form>

        {actionError && <p className="task-error mb-0 mt-3">{actionError}</p>}
        {tasksContext.error && !actionError && <p className="task-error mb-0 mt-3">{tasksContext.error}</p>}
      </section>

      <section className="task-panel p-4">
        <h2 className="h5 mb-3">Lista de tareas</h2>

        {tasksContext.loading && <p className="mb-0">Cargando tareas...</p>}

        {!tasksContext.loading && tasksContext.tasks.length === 0 && (
          <p className="mb-0">No hay tareas todavía. Crea la primera.</p>
        )}

        <div className="d-grid gap-3">
          {tasksContext.tasks.map((task) => (
            <article className={`task-item p-3 ${task.done ? 'task-item--done' : ''}`} key={task.id}>
              {editing?.id === task.id ? (
                <form className="d-grid gap-2" onSubmit={handleSaveEdit}>
                  <input
                    className="form-control task-field"
                    value={editing.title}
                    onChange={(event) => setEditing({ ...editing, title: event.target.value })}
                  />
                  <textarea
                    className="form-control task-field"
                    rows={2}
                    value={editing.description}
                    onChange={(event) => setEditing({ ...editing, description: event.target.value })}
                  />

                  <div className="d-flex gap-2">
                    <button className="btn btn-sm task-btn" type="submit">Guardar</button>
                    <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => setEditing(null)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="d-flex flex-wrap gap-2 justify-content-between align-items-start">
                    <div>
                      <h3 className="h6 mb-1">{task.title}</h3>
                      <p className="mb-0 task-item__description">{task.description || 'Sin descripcion'}</p>
                    </div>

                    <span className={`badge rounded-pill ${task.done ? 'text-bg-success' : 'text-bg-warning'}`}>
                      {task.done ? 'Done' : 'Pending'}
                    </span>
                  </div>

                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-outline-success"
                      type="button"
                      onClick={() => handleToggleDone(task.id, task.done)}
                    >
                      {task.done ? 'Marcar pendiente' : 'Marcar hecha'}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      type="button"
                      onClick={() => handleStartEdit(task.id, task.title, task.description)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                      onClick={() => handleDelete(task.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

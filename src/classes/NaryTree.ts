import { NaryNode, type NaryNodeData } from './NaryNode'

type NaryTreeProps = {
  root: NaryNode
}

export class NaryTree {
  root: NaryNode

  constructor({ root }: NaryTreeProps) {
    this.root = root
  }

  findById(id: string, current: NaryNode = this.root): NaryNode | null {
    if (current.id === id) {
      return current
    }

    for (const child of current.children) {
      const found = this.findById(id, child)
      if (found) {
        return found
      }
    }

    return null
  }

  toDataRoot(): NaryNodeData {
    return this.root.toData()
  }

  static fromDataRoot(root: NaryNodeData): NaryTree {
    return new NaryTree({ root: NaryNode.fromData(root) })
  }

  clone(): NaryTree {
    return NaryTree.fromDataRoot(this.toDataRoot())
  }
}
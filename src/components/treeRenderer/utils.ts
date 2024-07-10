export type TTreeNode<T> = T & {
  id: number;
  parentId: number | null;
  childNodes: TTreeNode<T>[];
}

export const convertArrayToTree = <T extends { id: number; parentId: number | null }>(arr: T[]): Array<TTreeNode<T>> => {
  const result = [];
  const nodeMap: Record<number, TTreeNode<T>> = {};

  arr.forEach(item => {
    const node: TTreeNode<T> = { ...item, childNodes: [] };
    nodeMap[node.id] = node;
  });

  for (const id in nodeMap) {
    const node = nodeMap[id];
    if (node.parentId === null || !nodeMap[node.parentId]) {
      result.push(node);
    } else {
      nodeMap[node.parentId].childNodes.push(node);
    }
  }

  return result;
};
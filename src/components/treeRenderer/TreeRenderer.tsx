import { FunctionComponent } from 'react';
import styles from './treeRender.module.css';
import { NodeRender } from './NodeRenderer';
import { convertArrayToTree } from './utils';

interface INode {
  id: number;
  parentId: number | null;
}

interface IProps<T extends INode> {
  nodes: T[];
  renderComponent: FunctionComponent<T>;
}

export const TreeRenderer = <T extends INode>({ nodes, renderComponent }: IProps<T>) => {
  const trees = convertArrayToTree(nodes);

  return (
    <div className={`${styles.list} ${styles.topList}`}>
      {trees.map(node => (
        <NodeRender key={node.id} node={node} renderComponent={renderComponent} />
      ))}
    </div>
  );
};
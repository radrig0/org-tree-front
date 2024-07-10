import styles from './treeRender.module.css';
import { FunctionComponent } from 'react';
import type { TTreeNode } from './utils';

interface IProps<T> {
  node: TTreeNode<T>;
  renderComponent: FunctionComponent<T>;
}

export const NodeRender = <T, >({ node, renderComponent: RenderComponent }: IProps<T>) => {
  return <div className={styles.node}>
    <div className={styles.nodePath} />
    <RenderComponent {...node} />
    {node.childNodes.length > 0 ? (
      <div className={styles.list}>
        {node.childNodes.map(child => {
          return <NodeRender key={child.id} node={child} renderComponent={RenderComponent} />;
        })}
      </div>
    ) : (
      <></>
    )}
  </div>;
};
import { parse as cssWhat, Selector } from 'css-what';
import type Mithril from 'mithril';

type VdomChildren = Mithril.Vnode<Record<string, unknown>> | Mithril.Vnode<Record<string, unknown>>[];

type ManipulationFunction = (vnode: Mithril.Vnode<Record<string, unknown>>) => void;

/**
 * Removes the first child in a tree of VDOM nodes which matches the given selector.
 *
 * @param vdom a VDOM tree
 * @param selector CSS selector of the child to remove
 * @returns `true` a child was found and removed, otherwise `false`
 */
export function findAndRemoveFirstVdomChild(vdom: VdomChildren, selector: string): boolean {
  const node = findFirstVdomChild(vdom, selector);

  if (node === undefined) return false;

  // Set to empty fragment
  node.tag = '[';
  node.attrs = { removedViaVdomUtils: true };
  node.children = [];

  return true;
}

/**
 * Finds the first child in a tree of VDOM nodes which matches the given selector.
 *
 * This node can then be manipulated, if desired, with the `manipulationFunc` param.
 *
 * @example
 * <caption>Adding a new child to a discussion list item title</caption>
 *
 * ```
 * extend(DiscussionListItem.prototype, 'view', function (vnode) {
 *   findFirstVdomChild(vnode, '.DiscussionListItem-title', (vnode) => {
 *     const children = [];
 *
 *     // Ensure the node is an array of children
 *     if (vnode.text) {
 *       children.push({ tag: '#', children: `${vnode.text}` } as Mithril.Vnode);
 *       delete vnode.text;
 *     }
 *
 *     if (Array.isArray(vnode.children)) {
 *       children.push(...vnode.children);
 *     }
 *
 *     // Add our own custom child
 *     children.push(<span>!!!</span>);
 *
 *     // Assign the new array of children to the node
 *     vnode.children = children;
 *   });
 * });
 * ```
 *
 * @param vdom a VDOM tree
 * @param selector CSS selector of the child to find or manipulate
 * @param manipulationFunc
 * @returns The child that was found, or `undefined` if no child was found
 */
export function findFirstVdomChild(
  vdom: VdomChildren,
  selector: string,
  manipulationFunc?: ManipulationFunction
): Mithril.Vnode<Record<string, unknown>> | undefined {
  const parsedSelector = cssWhat(selector);

  return searchChildren(vdom, parsedSelector, manipulationFunc);
}

function searchChildren(
  vdom: (Mithril.Child | Mithril.Children)[] | (Mithril.Child | Mithril.Children),
  selectors: Selector[][],
  manipulationFunc?: ManipulationFunction
): Mithril.Vnode<Record<string, unknown>> | undefined {
  let nodes: (Mithril.Child | Mithril.Children)[];

  if (!Array.isArray(vdom)) {
    nodes = [vdom];
  } else {
    nodes = vdom;
  }

  let found: Mithril.Vnode<Record<string, unknown>, {}> | undefined = undefined;

  nodes.some((node): boolean => {
    if (typeof node === 'boolean' || typeof node === 'number' || typeof node === 'string' || node === null || node === undefined) return false;

    if (Array.isArray(node)) {
      let result = searchChildren(node, selectors, manipulationFunc);

      if (result) {
        found = result;
        return true;
      }

      return false;
    }

    if (doesChildMatchSelectors(node, selectors)) {
      found = node;
      return true;
    }

    if (Array.isArray(node.children)) {
      let result = searchChildren(node.children, selectors);

      if (result) {
        found = result;
        return true;
      }

      return false;
    }

    return false;
  });

  if (manipulationFunc && found) manipulationFunc(found);

  return found;
}

function doesChildMatchSelectors(child: Mithril.Vnode<Record<string, any>>, selectors: Selector[][]): boolean {
  return selectors.some((selector) => {
    return selector.every((criterion): boolean => {
      switch (criterion.type) {
        case 'tag':
          return child.tag === criterion.name;

        case 'attribute':
          if (!child.attrs) return false;

          if (criterion.name === 'class') criterion.name = 'className';

          let attr = child.attrs[criterion.name];

          if (criterion.name === 'className' && typeof attr === 'string') {
            attr = attr.trim();
          }

          if (criterion.ignoreCase && typeof attr === 'string') {
            attr = attr.toLowerCase();
            criterion.value = criterion.value.toLowerCase();
          }

          switch (criterion.action) {
            case 'exists':
              return child.attrs.hasOwnProperty(criterion.name);
            case 'equals':
              return attr === criterion.value;
            case 'start':
              return attr?.startsWith?.(criterion.value) || false;
            case 'end':
              return attr?.endsWith?.(criterion.value) || false;
            case 'element':
              return (attr as string)?.split?.(' ')?.includes?.(criterion.value) || false;
          }
      }

      return false;
    });
  });
}

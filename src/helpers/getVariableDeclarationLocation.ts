import { ASTNode, ASTNodeType } from '../../types';
import getInstancesLocations from './getInstancesLocations';

export default function getVariableDeclarationLocation(
  AST: ASTNode[],
  name: string,
  location: string[] = [],
  outindex: number = 0,
): string[] {
  if (outindex > 0) {
    location.push('children');
  }
  let found: boolean = false;
  let index: number = 0;
  while (!found) {
    const n = AST[index];
    if (n.type === ASTNodeType.Assignment && n.name === name) {
      location.push(index.toString());
      location = ["children", ...location]
      found = true
    } else if ('children' in n) {
      let tempLocation: string[] = [...location];
      tempLocation.push(index.toString());
      getVariableDeclarationLocation(
        n.children,
        name,
        tempLocation,
        1 + outindex,
      );
    }
    index++;
  }

  return location;
}

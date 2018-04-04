export const HANDLE_CLICK = 'HANDLE_CLICK';

/***
On click of the Back or Next Button dispatch action
***/
export function handleClick(e, list, pos) {
  return { type: HANDLE_CLICK, name: e, length: list.length, list: list, pos: pos }
}

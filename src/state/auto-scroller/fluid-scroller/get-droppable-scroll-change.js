// @flow
import type { Position, Rect } from 'css-box-model';
import type { Scrollable, DroppableDimension } from '../../../types';
import getScroll from './get-scroll';
import { canScrollDroppable } from '../can-scroll';

type Args = {|
  droppable: DroppableDimension,
  subject: Rect,
  center: Position,
  centerIntitial: Position,
  dragStartTime: number,
  shouldUseTimeDampening: boolean,
|};

export default ({
  droppable,
  subject,
  center,
  centerIntitial,
  dragStartTime,
  shouldUseTimeDampening,
}: Args): ?Position => {
  // We know this has a closestScrollable
  const frame: ?Scrollable = droppable.frame;

  // this should never happen - just being safe
  if (!frame) {
    return null;
  }

  const scroll: ?Position = getScroll({
    dragStartTime,
    container: frame.pageMarginBox,
    subject,
    center,
    centerIntitial,
    shouldUseTimeDampening,
  });

  return scroll && canScrollDroppable(droppable, scroll) ? scroll : null;
};

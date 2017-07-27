import { isDevelopment, toError } from "../utils";
import validateAction from "./validation";

import remove from "./remove";
import require from "./require";
import replaceUi from "./replaceUi";
import appendClass from "./appendClass";

const DEFAULT_ACTIONS = { remove, require, replaceUi, appendClass };

export default function toAction(
  { event: { type, params } = {} },
  schema,
  uiSchema,
  extraActions
) {
  let action =
    extraActions && extraActions[type]
      ? extraActions[type]
      : DEFAULT_ACTIONS[type];
  if (action === undefined) {
    toError(`Rule contains invalid action "${type}"`);
  }
  if (isDevelopment()) {
    validateAction(action, params, schema, uiSchema);
  }
  return action;
}

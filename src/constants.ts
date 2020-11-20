export const BYTE_COUNT = 16;

// prettier-ignore
export const EMPTY_BYTES = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
export const EMPTY_VALUE = "00000000-0000-0000-0000-000000000000";
export const STR_VAL_LEN = EMPTY_VALUE.length;

export const FORMATTER = /([a-f0-9]{8})[-_ ]?([a-f0-9]{4})[-_ ]?([a-f0-9]{4})[-_ ]?([a-f0-9]{4})[-_ ]?([a-f0-9]{12})/i;

export const ERR_RND_OFF =
  "[ERROR] [Guid] It seems like that new GUID generation with " +
  "unsafe random values is disabled. To generate new GUIDs either " +
  "access to the node or web crypto APIs is needed (or they need to " +
  "be polyfilled), or to use Math.random as an unrecommended random " +
  "source a call to Guid.V4.allowUnsafeRandomGeneration() is required.";

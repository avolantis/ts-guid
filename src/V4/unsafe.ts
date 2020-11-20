let unsafeRnd = false;
let unsafeValid = false;

export function isMathRandomAllowed(): boolean {
  return unsafeRnd;
}

export function isUnsafeValid(): boolean {
  return unsafeValid;
}

export function allowUnsafeRandomGeneration(): void {
  unsafeRnd = true;
}

export function allowUnsafeGuidValidation(): void {
  unsafeValid = true;
}

export function arrayToFormData(theKey: string, formData: FormData, array: any[]) {
  for (const value of array) {
    formData.append(theKey, value);
  }
}
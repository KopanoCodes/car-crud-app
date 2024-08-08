export const car = [];

export function countNissansFromCk() {
  return car.filter(c => c.make === 'Nissan' && c.reg_number.startsWith('CK')).length;
}
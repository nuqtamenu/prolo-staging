export function getLinkExpiryDate(hoursAhead: number = 2): string {
  const now: Date = new Date();
  now.setHours(now.getHours() + hoursAhead + 3); // Adjusting for UTC +3 (Saudi Time)
  return now.toISOString();
}

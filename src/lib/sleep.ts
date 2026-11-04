// todo: remove this file
export const sleep = async (time = 5000) => {
  await new Promise((r) => setTimeout(r, time))
}

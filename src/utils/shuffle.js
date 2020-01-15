export function shuffle(array) {
  const list = [...array];

  let counter = list.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter -= 1;

    // And swap the last element with it
    const temp = list[counter];
    list[counter] = list[index];
    list[index] = temp;
  }

  return list;
}

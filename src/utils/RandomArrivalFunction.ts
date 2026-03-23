function randomArrivalTime() {
  const start = new Date();
  start.setHours(0,0,0,0);

  const end = new Date();
  end.setHours(23,59,59,999);

  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());

  return new Date(randomTime);
}

export default randomArrivalTime
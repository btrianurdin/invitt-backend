const Random = {
  filename: () => {
    return (new Date()).getTime() + "-inviit" + Math.floor(Math.random() * 9999);
  }
}

export default Random;
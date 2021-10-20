const Random = {
  filename: () => {
    return (new Date()).getTime() + "-inviit" + Math.floor(Math.random() * 9999);
  },
  length: (length: number) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

export default Random;
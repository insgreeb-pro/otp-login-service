const emailValidation = (email) => {
  const format = /^\w+([\.]?\w+)*@mail\.ugm\.ac\.id$/
  try {
    if (email && email.match(format)) return true
    return false
  } catch (e) {
    return false
  }
}

module.exports = emailValidation

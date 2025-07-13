self.addEventListener("push", e => {
  const data = e.data.json()
  self.registration.showNotification(data.title, {
      body: data.body,
      image: data.image,
      icon: data.icon,
      requireInteraction: true
  })
})
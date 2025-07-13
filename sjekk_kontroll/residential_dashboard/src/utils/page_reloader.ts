const reload = (duration: number = 2) => {
    setTimeout(() => location.reload(), duration * 1000);
}

export default reload
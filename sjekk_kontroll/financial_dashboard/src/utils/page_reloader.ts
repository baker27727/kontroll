/**
 * 
 * @param duration number of seconds to wait before refreshing
 * @description reloads page
 * @returns {boolean}
 */

const reload = (duration: number = 2) => {
    setTimeout(() => location.reload(), duration * 1000);
}

export default reload
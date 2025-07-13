import { backgroundColor } from '../configs/colors'

const Wrapper = ({ children }) => {
  return (
    <div style={{
        background: backgroundColor,
        minHeight: '100vh',
        width: '100vw'
    }}>
        {children}
    </div>
  )
}

export default Wrapper
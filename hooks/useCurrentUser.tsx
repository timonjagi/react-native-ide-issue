import { useSelector } from 'react-redux'

// @ts-ignore
const useCurrentUser = () => useSelector(state => state.auth.user)

export default useCurrentUser

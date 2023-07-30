import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  id: string,
  email: string,
  password: string,
  role: string
}

export const userSlice = createSlice({
  name: 'user', 
  initialState: {
   user: {
    id: 'Empty',
    email: 'Empty',
    password: 'Empty',
    role: 'Empty'
   } 
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user.id += action.payload
      state.user.email += action.payload
      state.user.password += action.payload
      state.user.role += action.payload
    },
  }, 
}) 

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer
import {User} from './model/User'
export const ADD_USER = "user/Add_User";


export interface UserAction {
    type: string;
    payload: User;
}

export const userReducer = (
        state: User|null =  null ,
        action: UserAction): User | null => {
            switch (action.type) {
                case ADD_USER:
                    return action.payload;
                default:
                    return state;
            }
        }
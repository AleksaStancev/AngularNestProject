import { TripState } from './trip/trip.reducer';
import { UserLoginState } from './user/user.reducer';

export interface AppState {
  userLogin: UserLoginState;
  tripState: TripState;
}

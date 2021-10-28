import { Bucketlist } from './bucketlist.model';
import { TripPhase } from './trip-phase.model';

export interface Trip extends Bucketlist {
  fetched: boolean;
  tripPhase: TripPhase;
}
